
import { useState } from "react";
import { Claim, ClaimStatus } from "@/lib/mockData";
import { useClaims } from "@/hooks/useClaims";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, AlertCircle, Clock, MessageSquare, LoaderCircle } from "lucide-react";

interface ClaimReviewFormProps {
  claim: Claim;
  onReviewComplete?: () => void;
}

const ClaimReviewForm = ({ claim, onReviewComplete }: ClaimReviewFormProps) => {
  const { updateClaimStatus, addComment } = useClaims();
  const [newStatus, setNewStatus] = useState<ClaimStatus>(claim.status);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      // Update status
      if (newStatus !== claim.status) {
        updateClaimStatus(claim.id, newStatus);
      }
      
      // Add comment if provided
      if (comment.trim()) {
        addComment(claim.id, comment);
      }
      
      // Call the callback if provided
      if (onReviewComplete) {
        onReviewComplete();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Claim</CardTitle>
        <CardDescription>
          Update the status of claim #{claim.id} and provide feedback
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Update Status</h3>
            <RadioGroup 
              defaultValue={claim.status}
              value={newStatus}
              onValueChange={(value) => setNewStatus(value as ClaimStatus)}
              className="grid grid-cols-1 md:grid-cols-2 gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="approved" id="approved" />
                <Label htmlFor="approved" className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-medical-green" />
                  Approve Claim
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rejected" id="rejected" />
                <Label htmlFor="rejected" className="flex items-center">
                  <XCircle className="mr-2 h-4 w-4 text-medical-red" />
                  Reject Claim
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="under_review" id="under_review" />
                <Label htmlFor="under_review" className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-medical-blue" />
                  Under Review
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="additional_info" id="additional_info" />
                <Label htmlFor="additional_info" className="flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-medical-yellow" />
                  Request More Info
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comment" className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              Add Comment
            </Label>
            <Textarea
              id="comment"
              placeholder="Provide feedback or notes about this claim review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="ghost" 
            type="button"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting || (newStatus === claim.status && !comment.trim())}
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>Submit Review</>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ClaimReviewForm;
