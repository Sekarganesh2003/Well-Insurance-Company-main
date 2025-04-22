
import { useClaims } from "@/hooks/useClaims";
import ClaimsList from "@/components/claims/ClaimsList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Claims = () => {
  // Use the useClaims hook to get the claims data
  const { claims } = useClaims();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Claims Management</h2>
        <p className="text-muted-foreground">
          View and manage all insurance claims
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Claims</CardTitle>
          <CardDescription>
            Comprehensive list of all submitted insurance claims
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClaimsList claims={claims} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Claims;
