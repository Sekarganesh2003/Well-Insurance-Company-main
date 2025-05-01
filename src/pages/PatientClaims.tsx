
import { useParams } from "react-router-dom";
import { useClaims } from "@/hooks/useClaims";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ClaimsList from "@/components/claims/ClaimsList";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

// Mock patient data mapping - in real app would come from API
const patientNames: Record<string, string> = {
  "P001": "John Patient",
  "P002": "Sarah Johnson",
  "P003": "Michael Brown",
  "P004": "Emily Wilson",
  "P005": "David Kumar",
  "P006": "Priya Sharma",
  "P007": "Rajesh Patel",
  "P12345": "John Smith",
  "P67890": "Jane Anderson",
  "P24680": "Michael Johnson",
  "P008": "Alice Roberts",
  "P009": "Priya Singh"
};


const PatientClaims = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const { claims, loadClaims, autoProcessClaim } = useClaims();
  const [processing, setProcessing] = useState(false);
  const [autoProcessed, setAutoProcessed] = useState(false);
  
  // Filter claims for this patient
  const patientClaims = claims.filter(claim => claim.patientId === patientId);
  
  // Get pending claims count
  const pendingClaims = patientClaims.filter(claim => claim.status === 'pending').length;
  
  // Get patient name
  const patientName = patientId && patientId in patientNames 
    ? patientNames[patientId] 
    : "Unknown Patient";
    
  // Handle auto-processing all pending claims
  const handleAutoProcess = async () => {
    setProcessing(true);
    try {
      // Process all pending claims
      const pendingClaimsList = patientClaims.filter(claim => claim.status === 'pending');
      
      for (const claim of pendingClaimsList) {
        await autoProcessClaim(claim);
      }
      
      // Refresh claims list
      loadClaims();
      setAutoProcessed(true);
      
      // Reset the auto-processed flag after 3 seconds
      setTimeout(() => {
        setAutoProcessed(false);
      }, 3000);
    } catch (error) {
      console.error("Error auto-processing claims:", error);
    } finally {
      setProcessing(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button 
            variant="ghost" 
            className="flex items-center mb-2" 
            onClick={() => navigate(`/patient/${patientId}`)}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Patient
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">{patientName}'s Claims</h2>
          <p className="text-muted-foreground">
            Patient ID: {patientId}
          </p>
        </div>
        
        {pendingClaims > 0 && (
          <Button 
            onClick={handleAutoProcess} 
            disabled={processing}
            className="flex items-center gap-2"
          >
            {processing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Auto-Process Claims
              </>
            )}
          </Button>
        )}
      </div>
      
      {autoProcessed && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">
            Claims have been automatically processed based on policy and fraud detection rules.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Insurance Claims History</CardTitle>
            <CardDescription>
              View all claims submitted by this patient
            </CardDescription>
          </div>
          
          {pendingClaims > 0 && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
              {pendingClaims} pending claims
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          {patientClaims.length > 0 ? (
            <ClaimsList claims={patientClaims} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">This patient has no claims on record</p>
              <Button 
                className="mt-4"
                onClick={() => navigate("/upload-claim")}
              >
                Submit New Claim
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientClaims;
