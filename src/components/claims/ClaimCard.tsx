
import { Claim } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ClaimStatusBadge from "./ClaimStatusBadge";
import { AlertTriangle, Calendar, Clock, DollarSign, FileText, Hospital } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ClaimCardProps {
  claim: Claim;
}

const ClaimCard = ({ claim }: ClaimCardProps) => {
  const navigate = useNavigate();

  const hasFraudFlags = claim.fraudFlags && claim.fraudFlags.length > 0;
  const formattedDate = formatDistanceToNow(new Date(claim.submittedDate), { addSuffix: true });

  return (
    <Card className="claim-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center text-lg">
              {claim.diagnosis}
              {hasFraudFlags && (
                <AlertTriangle className="h-4 w-4 ml-2 text-medical-red" />
              )}
            </CardTitle>
            <CardDescription>Claim #{claim.id}</CardDescription>
          </div>
          <ClaimStatusBadge status={claim.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center">
            <Hospital className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="truncate">{claim.hospitalName}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>${claim.claimAmount.toFixed(2)}</span>
          </div>
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="truncate">{claim.diagnosisCode}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate(`/claim/${claim.id}`)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClaimCard;
