
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClaims } from "@/hooks/useClaims";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ClaimsList from "../claims/ClaimsList";
import { FileText, Upload, AlertCircle, CheckCircle, XCircle, Clock } from "lucide-react";

const PatientDashboard = () => {
  const { claims } = useClaims();
  const navigate = useNavigate();
  const [policyInfo] = useState({
    policyNumber: 'POL-123456',
    expirationDate: '2025-12-31',
    coverageLimit: 5000,
    usedCoverage: claims.reduce((acc, claim) => {
      if (claim.status === 'approved') {
        acc += claim.claimAmount;
      }
      return acc;
    }, 0),
  });

  // Calculate statistics
  const pendingClaims = claims.filter(claim => claim.status === 'pending').length;
  const underReviewClaims = claims.filter(claim => claim.status === 'under_review').length;
  const approvedClaims = claims.filter(claim => claim.status === 'approved').length;
  const rejectedClaims = claims.filter(claim => claim.status === 'rejected').length;

  // Calculate remaining coverage
  const remainingCoverage = policyInfo.coverageLimit - policyInfo.usedCoverage;
  const coveragePercentUsed = (policyInfo.usedCoverage / policyInfo.coverageLimit) * 100;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Patient Dashboard</h2>
        <p className="text-muted-foreground">
          Manage your medical insurance claims and track their status.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Claims
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-6 w-6 mr-2 text-medical-yellow" />
              <span className="text-2xl font-bold">{pendingClaims}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Under Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertCircle className="h-6 w-6 mr-2 text-medical-blue" />
              <span className="text-2xl font-bold">{underReviewClaims}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approved Claims
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-2 text-medical-green" />
              <span className="text-2xl font-bold">{approvedClaims}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rejected Claims
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <XCircle className="h-6 w-6 mr-2 text-medical-red" />
              <span className="text-2xl font-bold">{rejectedClaims}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Policy Information</CardTitle>
            <CardDescription>
              Your current insurance policy details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Policy Number</p>
                <p className="font-medium">{policyInfo.policyNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expiration Date</p>
                <p className="font-medium">{policyInfo.expirationDate}</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-muted-foreground">Coverage Used</p>
                <p className="text-sm font-medium">{Math.round(coveragePercentUsed)}%</p>
              </div>
              <Progress value={coveragePercentUsed} className="h-2" />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">Used: ${policyInfo.usedCoverage.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Remaining: ${remainingCoverage.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Full Policy Details
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and actions</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button 
              variant="default" 
              className="w-full justify-start" 
              onClick={() => navigate("/upload-claim")}
            >
              <Upload className="mr-2 h-4 w-4" />
              Submit New Claim
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => navigate("/claims")}
            >
              <FileText className="mr-2 h-4 w-4" />
              View All Claims
            </Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Claims</h3>
        <ClaimsList claims={claims.slice(0, 3)} />
        {claims.length > 3 && (
          <div className="mt-4 flex justify-center">
            <Button variant="outline" onClick={() => navigate('/claims')}>
              View All Claims
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
