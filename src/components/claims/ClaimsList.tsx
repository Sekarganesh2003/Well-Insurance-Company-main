
import { Claim } from "@/lib/mockData";
import ClaimCard from "./ClaimCard";

interface ClaimsListProps {
  claims: Claim[];
}

const ClaimsList = ({ claims }: ClaimsListProps) => {
  if (claims.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No claims found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {claims.map((claim) => (
        <ClaimCard key={claim.id} claim={claim} />
      ))}
    </div>
  );
};

export default ClaimsList;
