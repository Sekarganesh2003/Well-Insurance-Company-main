
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { 
  Claim, 
  ClaimStatus, 
  ClaimComment,
  FraudFlag,
  mockClaims, 
  getUserClaims, 
  getHospitalClaims, 
  getAllClaims, 
  getClaimById 
} from '@/lib/mockData';
import { useAuth } from './useAuth';
import { processDocumentOcr, performFraudCheck, verifyPolicyCompliance } from '@/lib/mockOcr';

interface ClaimsContextType {
  claims: Claim[];
  loadClaims: () => void;
  getClaimDetails: (claimId: string) => Claim | undefined;
  uploadClaim: (formData: FormData) => Promise<Claim>;
  updateClaimStatus: (claimId: string, status: ClaimStatus) => void;
  addComment: (claimId: string, text: string) => void;
  processingClaim: boolean;
  autoProcessClaim: (claim: Claim) => Promise<ClaimStatus>;
}

const ClaimsContext = createContext<ClaimsContextType | undefined>(undefined);

export const ClaimsProvider = ({ children }: { children: ReactNode }) => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [processingClaim, setProcessingClaim] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadClaims();
    }
  }, [user]);

  const loadClaims = () => {
    if (!user) return;

    let userClaims: Claim[] = [];
    
    if (user.role === 'patient') {
      userClaims = getUserClaims(user.id);
    } else if (user.role === 'hospital') {
      userClaims = getHospitalClaims(user.id);
    } else if (user.role === 'admin') {
      userClaims = getAllClaims();
    }

    setClaims(userClaims);
  };

  const getClaimDetails = (claimId: string) => {
    return getClaimById(claimId);
  };

  // New function to automatically process claims
  const autoProcessClaim = async (claim: Claim): Promise<ClaimStatus> => {
    // Decision logic based on fraud flags and policy verification
    let recommendedStatus: ClaimStatus = 'pending';
    
    // If there are high severity fraud flags, recommend rejection
    const hasSeriousFraudFlags = claim.fraudFlags?.some(flag => flag.severity === 'high');
    
    // Policy verification issues
    const hasPolicyIssues = claim.policyVerification && (
      !claim.policyVerification.isPolicyCurrent || 
      !claim.policyVerification.isTreatmentCovered ||
      !claim.policyVerification.isWithinClaimLimit
    );
    
    // Check if claim amount is very high (over 5000)
    const isHighAmount = claim.claimAmount > 5000;
    
    // Make decision
    if (hasSeriousFraudFlags || (hasPolicyIssues && isHighAmount)) {
      recommendedStatus = 'rejected';
    } else if (hasPolicyIssues || isHighAmount || (claim.fraudFlags && claim.fraudFlags.length > 0)) {
      recommendedStatus = 'under_review'; // Hold for review
    } else if (!hasPolicyIssues && !claim.fraudFlags?.length) {
      recommendedStatus = 'approved'; // Auto-approve clean claims
    }
    
    // Add system comment about auto-processing
    const autoProcessComment: ClaimComment = {
      id: `CM${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
      userId: 'system',
      userName: 'Auto-Processing System',
      userRole: 'admin',
      text: `Claim automatically processed. Recommended status: ${recommendedStatus.replace('_', ' ')}.`,
      timestamp: new Date().toISOString()
    };
    
    // Find the claim and update it with the comment
    const claimIndex = mockClaims.findIndex(c => c.id === claim.id);
    if (claimIndex !== -1) {
      mockClaims[claimIndex].comments.push(autoProcessComment);
      
      // Only auto-update status if it's a fresh claim
      if (mockClaims[claimIndex].status === 'pending') {
        mockClaims[claimIndex].status = recommendedStatus;
        mockClaims[claimIndex].updatedDate = new Date().toISOString();
      }
    }
    
    // Update local state
    setClaims(prev => prev.map(c => 
      c.id === claim.id 
        ? { 
            ...c, 
            status: c.status === 'pending' ? recommendedStatus : c.status,
            comments: [...c.comments, autoProcessComment],
            updatedDate: new Date().toISOString() 
          } 
        : c
    ));
    
    return recommendedStatus;
  };

  const uploadClaim = async (formData: FormData): Promise<Claim> => {
    if (!user) {
      throw new Error('User is not authenticated');
    }

    setProcessingClaim(true);
    
    try {
      const file = formData.get('document') as File;
      
      // Process OCR on the document
      const extractedData = await processDocumentOcr(file);
      
      // Perform fraud check
      const fraudCheckResult = await performFraudCheck(extractedData);
      
      // Verify policy compliance
      const patientId = formData.get('patientId') as string || user.id;
      const policyResult = await verifyPolicyCompliance(
        patientId,
        extractedData.diagnosis || '',
        extractedData.claimAmount || 0
      );
      
      // Create new claim with extracted and verified data
      const newClaim: Claim = {
        id: `C${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
        patientId: patientId,
        patientName: extractedData.patientName || formData.get('patientName') as string,
        hospitalId: user.role === 'hospital' ? user.id : undefined,
        hospitalName: extractedData.hospitalName || user.hospitalName || 'Unknown Hospital',
        diagnosisCode: extractedData.diagnosisCode || '',
        diagnosis: extractedData.diagnosis || formData.get('diagnosis') as string,
        treatmentDetails: extractedData.treatmentDetails || formData.get('treatmentDetails') as string,
        documentUrls: ['/placeholder.svg'], // In a real app, this would be the uploaded file URL
        claimAmount: extractedData.claimAmount || parseFloat((formData.get('claimAmount') as string) || '0'),
        status: 'pending',
        submittedDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        comments: [],
        extractedData: Object.entries(extractedData)
          .filter(([key]) => key !== 'confidence')
          .reduce((obj, [key, value]) => {
            obj[key] = value?.toString() || '';
            return obj;
          }, {} as Record<string, string>),
        fraudFlags: fraudCheckResult.fraudFlags as FraudFlag[],
        policyVerification: {
          isPolicyCurrent: policyResult.isPolicyCurrent,
          isTreatmentCovered: policyResult.isTreatmentCovered,
          isWithinClaimLimit: policyResult.isWithinClaimLimit,
          remainingCoverage: policyResult.remainingCoverage,
          issues: policyResult.issues
        }
      };
      
      // Save claim (in a real app, this would be an API call)
      mockClaims.push(newClaim);
      setClaims(prev => [...prev, newClaim]);
      
      // Automatically process the claim after creation
      await autoProcessClaim(newClaim);
      
      toast({
        title: "Claim submitted successfully",
        description: `Claim ID: ${newClaim.id} has been automatically processed.`
      });
      
      return newClaim;
    } catch (error) {
      console.error('Error uploading claim:', error);
      toast({
        title: "Claim submission failed",
        description: "An error occurred while processing your claim",
        variant: "destructive"
      });
      throw error;
    } finally {
      setProcessingClaim(false);
    }
  };

  const updateClaimStatus = (claimId: string, status: ClaimStatus) => {
    if (!user || user.role !== 'admin') {
      toast({
        title: "Permission denied",
        description: "Only admins can update claim status",
        variant: "destructive"
      });
      return;
    }
    
    const claimIndex = mockClaims.findIndex(claim => claim.id === claimId);
    if (claimIndex === -1) {
      toast({
        title: "Error",
        description: "Claim not found",
        variant: "destructive"
      });
      return;
    }
    
    mockClaims[claimIndex].status = status;
    mockClaims[claimIndex].updatedDate = new Date().toISOString();
    
    setClaims(prev => prev.map(claim => 
      claim.id === claimId 
        ? { ...claim, status, updatedDate: new Date().toISOString() } 
        : claim
    ));
    
    toast({
      title: "Status updated",
      description: `Claim status changed to ${status.replace('_', ' ')}`
    });
  };

  const addComment = (claimId: string, text: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to comment",
        variant: "destructive"
      });
      return;
    }
    
    const claimIndex = mockClaims.findIndex(claim => claim.id === claimId);
    if (claimIndex === -1) {
      toast({
        title: "Error",
        description: "Claim not found",
        variant: "destructive"
      });
      return;
    }
    
    const newComment: ClaimComment = {
      id: `CM${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      text,
      timestamp: new Date().toISOString()
    };
    
    mockClaims[claimIndex].comments.push(newComment);
    mockClaims[claimIndex].updatedDate = new Date().toISOString();
    
    setClaims(prev => prev.map(claim => 
      claim.id === claimId 
        ? { 
            ...claim, 
            comments: [...claim.comments, newComment],
            updatedDate: new Date().toISOString() 
          } 
        : claim
    ));
    
    toast({
      title: "Comment added",
      description: "Your comment has been added to the claim"
    });
  };

  return (
    <ClaimsContext.Provider value={{ 
      claims, 
      loadClaims, 
      getClaimDetails, 
      uploadClaim, 
      updateClaimStatus, 
      addComment,
      processingClaim,
      autoProcessClaim
    }}>
      {children}
    </ClaimsContext.Provider>
  );
};

export const useClaims = () => {
  const context = useContext(ClaimsContext);
  if (context === undefined) {
    throw new Error('useClaims must be used within a ClaimsProvider');
  }
  return context;
};
