
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, FileCheck, FileWarning } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Claim, ClaimComment, FraudFlag } from "@/lib/mockData";
import ClaimStatusBadge from "./ClaimStatusBadge";
import { useClaims } from "@/hooks/useClaims";
import { useAuth } from "@/hooks/useAuth";

interface ClaimDetailsProps {
  claim: Claim;
  isReviewMode?: boolean;
}

const ClaimDetails: React.FC<ClaimDetailsProps> = ({ claim, isReviewMode = false }) => {
  const { user } = useAuth();
  const { addComment } = useClaims();
  const { toast } = useToast();
  const [comment, setComment] = useState("");
  
  const handleAddComment = () => {
    if (!comment.trim()) {
      toast({
        title: "Comment required",
        description: "Please enter a comment before submitting",
        variant: "destructive",
      });
      return;
    }
    
    addComment(claim.id, comment);
    setComment("");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-y-2 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Claim #{claim.id}</h2>
          <p className="text-muted-foreground">
            Submitted on {new Date(claim.submittedDate).toLocaleDateString()}
          </p>
        </div>
        <ClaimStatusBadge status={claim.status} className="sm:self-start" />
      </div>
      
      {claim.fraudFlags && claim.fraudFlags.length > 0 && (
        <Card className="border-medical-red/40 bg-medical-red/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-medical-red flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Fraud Risk Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {claim.fraudFlags.map((flag: FraudFlag, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <Badge variant="outline" className="text-medical-red border-medical-red/30">
                    {flag.severity}
                  </Badge>
                  <span>{flag.description}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Claim Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="verification">Policy Verification</TabsTrigger>
          <TabsTrigger value="comments">Comments ({claim.comments?.length || 0})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Claim Information</CardTitle>
              <CardDescription>Details extracted from submitted documents</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Patient Name</p>
                <p className="font-medium">{claim.patientName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Hospital Name</p>
                <p className="font-medium">{claim.hospitalName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Diagnosis</p>
                <p className="font-medium">{claim.diagnosis}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Diagnosis Code</p>
                <p className="font-medium">{claim.diagnosisCode || "Not specified"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Treatment Details</p>
                <p className="font-medium">{claim.treatmentDetails}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Claim Amount</p>
                <p className="font-medium">₹{claim.claimAmount.toLocaleString('en-IN')}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
              <CardDescription>Medical reports and bills submitted with this claim</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {claim.documentUrls && claim.documentUrls.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {claim.documentUrls.map((url, index) => (
                    <div key={index} className="border rounded-md p-4 flex items-start gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <FileCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Document {index + 1}</p>
                        <p className="text-sm text-muted-foreground">
                          Uploaded on {new Date(claim.submittedDate).toLocaleDateString()}
                        </p>
                        <Button variant="link" className="p-0 h-auto text-sm">View Document</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileWarning className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="font-medium">No documents available</p>
                  <p className="text-sm text-muted-foreground">
                    Document links are not accessible for this claim.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="verification">
          <Card>
            <CardHeader>
              <CardTitle>Policy Verification</CardTitle>
              <CardDescription>Results of policy checks and verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {claim.policyVerification ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {claim.policyVerification.isPolicyCurrent ? (
                          <CheckCircle className="h-5 w-5 text-medical-green" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-medical-red" />
                        )}
                        <p className="font-medium">Policy Status</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {claim.policyVerification.isPolicyCurrent 
                          ? "Active and current" 
                          : "Policy expired or inactive"}
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {claim.policyVerification.isTreatmentCovered ? (
                          <CheckCircle className="h-5 w-5 text-medical-green" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-medical-red" />
                        )}
                        <p className="font-medium">Treatment Coverage</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {claim.policyVerification.isTreatmentCovered 
                          ? "Treatment covered by policy" 
                          : "Treatment not covered"}
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {claim.policyVerification.isWithinClaimLimit ? (
                          <CheckCircle className="h-5 w-5 text-medical-green" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-medical-red" />
                        )}
                        <p className="font-medium">Claim Limit</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Remaining coverage: ₹{claim.policyVerification.remainingCoverage?.toLocaleString('en-IN') || 0}
                      </p>
                    </div>
                  </div>
                  
                  {claim.policyVerification.issues && claim.policyVerification.issues.length > 0 && (
                    <div className="mt-4">
                      <p className="font-medium mb-2">Verification Issues:</p>
                      <ul className="space-y-2">
                        {claim.policyVerification.issues.map((issue, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <AlertTriangle className="h-4 w-4 text-medical-yellow mt-0.5 flex-shrink-0" />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Clock className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="font-medium">Verification Pending</p>
                  <p className="text-sm text-muted-foreground">
                    Policy verification details are not yet available for this claim.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comments">
          <Card>
            <CardHeader>
              <CardTitle>Comments & Communication</CardTitle>
              <CardDescription>Communication history for this claim</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {claim.comments && claim.comments.length > 0 ? (
                  claim.comments.map((comment: ClaimComment) => (
                    <div key={comment.id} className="border rounded-md p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {comment.userName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{comment.userName}</p>
                            <p className="text-xs text-muted-foreground">
                              {comment.userRole} • {new Date(comment.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm">{comment.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="font-medium">No comments yet</p>
                    <p className="text-sm text-muted-foreground">
                      Be the first to add a comment to this claim.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            {user && (
              <CardFooter className="flex flex-col space-y-2 border-t pt-6">
                <Textarea 
                  placeholder="Add your comment here..." 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex justify-end w-full">
                  <Button onClick={handleAddComment}>Add Comment</Button>
                </div>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClaimDetails;
