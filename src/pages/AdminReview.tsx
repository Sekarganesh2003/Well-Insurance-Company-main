
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useClaims } from "@/hooks/useClaims";
import { useAuth } from "@/hooks/useAuth";
import ClaimReviewForm from "@/components/admin/ClaimReviewForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AdminReview = () => {
  const { claimId } = useParams<{ claimId: string }>();
  const { getClaimDetails } = useClaims();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [reviewComplete, setReviewComplete] = useState(false);
  
  if (!claimId) {
    navigate("/claims");
    return null;
  }
  
  const claim = getClaimDetails(claimId);
  
  if (!user || user.role !== 'admin') {
    return (
      <Alert variant="destructive" className="max-w-lg mx-auto mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Access Denied</AlertTitle>
        <AlertDescription>
          You do not have permission to access the admin review page.
        </AlertDescription>
      </Alert>
    );
  }
  
  if (!claim) {
    return (
      <Alert variant="destructive" className="max-w-lg mx-auto mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Claim not found. The claim ID may be invalid or the claim has been removed.
        </AlertDescription>
      </Alert>
    );
  }
  
  const handleReviewComplete = () => {
    setReviewComplete(true);
  };
  
  return (
    <div className="py-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate(`/claim/${claimId}`)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Claim
        </Button>
        <h1 className="text-2xl font-bold">Admin Review: Claim #{claimId}</h1>
      </div>
      
      {reviewComplete ? (
        <div className="max-w-md mx-auto text-center py-12">
          <div className="h-12 w-12 rounded-full bg-medical-green/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-6 w-6 text-medical-green" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Review Complete</h2>
          <p className="text-muted-foreground mb-6">
            Your review of this claim has been submitted successfully.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => navigate(`/claim/${claimId}`)}>
              View Updated Claim
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <ClaimReviewForm claim={claim} onReviewComplete={handleReviewComplete} />
        </div>
      )}
    </div>
  );
};

export default AdminReview;
