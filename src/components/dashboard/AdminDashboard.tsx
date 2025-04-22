
import { useNavigate } from "react-router-dom";
import { useClaims } from "@/hooks/useClaims";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClaimsList from "../claims/ClaimsList";
import { 
  AlertTriangle, 
  BarChart, 
  CheckCircle, 
  Clock, 
  FileText, 
  PieChart, 
  Users, 
  XCircle,
  IndianRupee,
  ClipboardList,
  UserCog
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import PendingClaimsList from "../admin/PendingClaimsList";
import HospitalsList from "../admin/HospitalsList";
import PendingUsersList from "../admin/PendingUsersList";

const AdminDashboard = () => {
  const { claims } = useClaims();
  const { getPendingUsers } = useAuth();
  const navigate = useNavigate();

  // Calculate statistics
  const totalClaims = claims.length;
  const pendingClaims = claims.filter(claim => claim.status === 'pending').length;
  const underReviewClaims = claims.filter(claim => claim.status === 'under_review').length;
  const approvedClaims = claims.filter(claim => claim.status === 'approved').length;
  const rejectedClaims = claims.filter(claim => claim.status === 'rejected').length;
  
  // Calculate suspicious claims
  const suspiciousClaims = claims.filter(claim => claim.fraudFlags && claim.fraudFlags.length > 0).length;

  // Calculate total claim amounts
  const totalClaimAmount = claims.reduce((sum, claim) => sum + claim.claimAmount, 0);
  const approvedClaimAmount = claims
    .filter(claim => claim.status === 'approved')
    .reduce((sum, claim) => sum + claim.claimAmount, 0);
  
  // Get pending users count
  const pendingUsersCount = getPendingUsers().length;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Manage and oversee all insurance claims processing.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Claims
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="h-6 w-6 mr-2 text-medical-blue" />
              <span className="text-2xl font-bold">{totalClaims}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-6 w-6 mr-2 text-medical-yellow" />
              <span className="text-2xl font-bold">{pendingClaims + underReviewClaims}</span>
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
              Pending Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UserCog className="h-6 w-6 mr-2 text-medical-purple" />
              <span className="text-2xl font-bold">{pendingUsersCount}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pending-claims">Pending Claims</TabsTrigger>
          <TabsTrigger value="pending-users">New Users</TabsTrigger>
          <TabsTrigger value="hospitals">Hospital Records</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Claims Overview</CardTitle>
                <CardDescription>
                  Monthly claims data and processing statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
                    <p className="mt-2 text-sm text-muted-foreground">Claims analytics visualization will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Claims Distribution</CardTitle>
                <CardDescription>
                  Current status breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-center mb-4">
                    <div className="h-[140px] w-[140px] relative flex items-center justify-center">
                      <PieChart className="h-full w-full text-muted-foreground opacity-50" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-medical-blue mr-2"></div>
                      <div className="flex items-center justify-between w-full text-xs">
                        <span>Pending</span>
                        <span>{pendingClaims} ({Math.round((pendingClaims / totalClaims) * 100)}%)</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-medical-yellow mr-2"></div>
                      <div className="flex items-center justify-between w-full text-xs">
                        <span>Under Review</span>
                        <span>{underReviewClaims} ({Math.round((underReviewClaims / totalClaims) * 100)}%)</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-medical-green mr-2"></div>
                      <div className="flex items-center justify-between w-full text-xs">
                        <span>Approved</span>
                        <span>{approvedClaims} ({Math.round((approvedClaims / totalClaims) * 100)}%)</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-medical-red mr-2"></div>
                      <div className="flex items-center justify-between w-full text-xs">
                        <span>Rejected</span>
                        <span>{rejectedClaims} ({Math.round((rejectedClaims / totalClaims) * 100)}%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Claims Financial Summary</CardTitle>
                <CardDescription>
                  Total amount of claims processed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Claims Amount</span>
                    <span className="font-bold flex items-center">
                      <IndianRupee className="h-3 w-3 mr-1" />
                      {totalClaimAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Approved Amount</span>
                    <span className="font-bold text-medical-green flex items-center">
                      <IndianRupee className="h-3 w-3 mr-1" />
                      {approvedClaimAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pending Amount</span>
                    <span className="font-bold text-medical-yellow flex items-center">
                      <IndianRupee className="h-3 w-3 mr-1" />
                      {(totalClaimAmount - approvedClaimAmount).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Processing Rate</span>
                    <span className="text-sm">
                      {Math.round((approvedClaims + rejectedClaims) / totalClaims * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(approvedClaims + rejectedClaims) / totalClaims * 100} 
                    className="h-2" 
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Access</CardTitle>
                <CardDescription>Manage claims and system data</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button 
                  variant="default" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/claims")}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Review Pending Claims
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/fraud-alerts")}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Investigate Fraud Alerts
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/users")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/policies")}
                >
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Manage Insurance Policies
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="pending-claims">
          <Card>
            <CardHeader>
              <CardTitle>Claims Requiring Review</CardTitle>
              <CardDescription>Review and update status of submitted claims</CardDescription>
            </CardHeader>
            <CardContent>
              <PendingClaimsList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending-users">
          <Card>
            <CardHeader>
              <CardTitle>User Account Approvals</CardTitle>
              <CardDescription>New user accounts waiting for approval</CardDescription>
            </CardHeader>
            <CardContent>
              <PendingUsersList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hospitals">
          <Card>
            <CardHeader>
              <CardTitle>Registered Hospitals</CardTitle>
              <CardDescription>All healthcare providers in the network</CardDescription>
            </CardHeader>
            <CardContent>
              <HospitalsList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
