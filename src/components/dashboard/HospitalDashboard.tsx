
import { useNavigate } from "react-router-dom";
import { useClaims } from "@/hooks/useClaims";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClaimsList from "../claims/ClaimsList";
import { 
  Upload, 
  FileText, 
  Search, 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  FileBarChart2,
  CalendarClock
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import PatientRecordsTable from "../hospital/PatientRecordsTable";
import AppointmentsList from "../hospital/AppointmentsList";

const HospitalDashboard = () => {
  const { claims } = useClaims();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Calculate statistics
  const pendingClaims = claims.filter(claim => claim.status === 'pending').length;
  const underReviewClaims = claims.filter(claim => claim.status === 'under_review').length;
  const approvedClaims = claims.filter(claim => claim.status === 'approved').length;
  const rejectedClaims = claims.filter(claim => claim.status === 'rejected').length;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Hospital Dashboard</h2>
        <p className="text-muted-foreground">
          Manage patient claims and insurance processing for {user?.hospitalName}.
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
              <AlertTriangle className="h-6 w-6 mr-2 text-medical-blue" />
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

      <Tabs defaultValue="claims" className="space-y-4">
        <TabsList>
          <TabsTrigger value="claims">Claims Management</TabsTrigger>
          <TabsTrigger value="patients">Patient Records</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="claims">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks for healthcare providers</CardDescription>
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
                  onClick={() => navigate("/patient-search")}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search Patient Records
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
            
            <div className="grid gap-4 grid-rows-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Patient Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 mr-3 text-medical-blue" />
                      <div>
                        <p className="text-2xl font-bold">152</p>
                        <p className="text-xs text-muted-foreground">Total patients</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate("/patients")}>
                      View All
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-8 w-8 mr-3 text-medical-purple" />
                      <div>
                        <p className="text-2xl font-bold">8</p>
                        <p className="text-xs text-muted-foreground">Today's schedule</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate("/appointments")}>
                      View Calendar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Recent Claims</h3>
            <ClaimsList claims={claims.slice(0, 5)} />
            {claims.length > 5 && (
              <div className="mt-4 flex justify-center">
                <Button variant="outline" onClick={() => navigate('/claims')}>
                  View All Claims
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="patients">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Patient Records</CardTitle>
                <CardDescription>Manage your patient database</CardDescription>
              </div>
              <Button onClick={() => navigate('/add-patient')}>
                Add New Patient
              </Button>
            </CardHeader>
            <CardContent>
              <PatientRecordsTable />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appointments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Appointments</CardTitle>
                <CardDescription>Manage your patient appointments</CardDescription>
              </div>
              <Button onClick={() => navigate('/schedule-appointment')}>
                <CalendarClock className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
            </CardHeader>
            <CardContent>
              <AppointmentsList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HospitalDashboard;
