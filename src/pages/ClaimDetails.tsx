
import { useParams } from "react-router-dom";
import ClaimDetailsComponent from "@/components/claims/ClaimDetails";
import { useClaims } from "@/hooks/useClaims";
import { useEffect, useState } from "react";
import { Claim } from "@/lib/mockData";
import { Skeleton } from "@/components/ui/skeleton";

const ClaimDetails = () => {
  const { claimId } = useParams<{ claimId: string }>();
  const { getClaimDetails } = useClaims();
  const [claim, setClaim] = useState<Claim | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (claimId) {
      const claimDetails = getClaimDetails(claimId);
      setClaim(claimDetails || null);
      setLoading(false);
    }
  }, [claimId, getClaimDetails]);

  if (loading) {
    return (
      <div className="py-6">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-4 w-1/4 mb-8" />
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="py-6">
        <h2 className="text-2xl font-bold tracking-tight">Claim Not Found</h2>
        <p className="text-muted-foreground">
          The claim you are looking for does not exist or you don't have permission to view it.
        </p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <ClaimDetailsComponent claim={claim} />
    </div>
  );
};

export default ClaimDetails;
