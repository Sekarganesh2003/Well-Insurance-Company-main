
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";

// Mock appointment data
const mockAppointments = [
  {
    id: "APT-001",
    patientName: "John Smith",
    patientId: "P12345",
    doctorName: "Dr. Sarah Williams",
    department: "Cardiology",
    date: "2025-04-20",
    time: "10:00 AM",
    status: "scheduled",
    notes: "Follow-up on heart condition"
  },
  {
    id: "APT-002",
    patientName: "Jane Anderson",
    patientId: "P67890",
    doctorName: "Dr. Michael Chen",
    department: "Orthopedics",
    date: "2025-04-18",
    time: "2:30 PM",
    status: "completed",
    notes: "Post-surgery checkup"
  },
  {
    id: "APT-003",
    patientName: "Robert Johnson",
    patientId: "P54321",
    doctorName: "Dr. Lisa Rodriguez",
    department: "Neurology",
    date: "2025-04-25",
    time: "11:15 AM",
    status: "scheduled",
    notes: "Initial consultation"
  },
  {
    id: "APT-004",
    patientName: "Michael Johnson",
    patientId: "P24680",
    doctorName: "Dr. James Wilson",
    department: "Pulmonology",
    date: "2025-04-15",
    time: "9:00 AM",
    status: "cancelled",
    notes: "Patient requested cancellation"
  }
];

const Appointments = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const filteredAppointments = mockAppointments.filter(apt => {
    if (activeTab === "upcoming") {
      return apt.status === "scheduled" && new Date(apt.date) >= new Date();
    } else if (activeTab === "completed") {
      return apt.status === "completed";
    } else if (activeTab === "cancelled") {
      return apt.status === "cancelled";
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
          <p className="text-muted-foreground">
            {user?.role === 'hospital' ? 'Manage patient appointments' : 'View your appointment schedule'}
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Appointment Schedule
          </CardTitle>
          <CardDescription>
            View and manage patient appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Appointment ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>{appointment.id}</TableCell>
                          <TableCell className="font-medium">
                            {appointment.patientName}
                            <div className="text-xs text-muted-foreground">
                              ID: {appointment.patientId}
                            </div>
                          </TableCell>
                          <TableCell>{appointment.doctorName}</TableCell>
                          <TableCell>{appointment.department}</TableCell>
                          <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline"
                                size="sm"
                                disabled={appointment.status !== "scheduled"}
                              >
                                <Clock className="h-4 w-4 mr-1" />
                                Reschedule
                              </Button>
                              {appointment.status === "scheduled" && (
                                <Button 
                                  variant="destructive"
                                  size="sm"
                                >
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6">
                          <p className="text-muted-foreground">No appointments found</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointments;
