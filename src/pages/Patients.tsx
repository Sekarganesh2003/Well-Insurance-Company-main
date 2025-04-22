
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, FileText, UserPlus, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// Mock patient data
const mockPatients = [
  {
    id: "P12345",
    name: "John Smith",
    age: 45,
    gender: "Male",
    policyNumber: "POL-123456",
    registrationDate: "2024-10-15",
    lastVisit: "2025-03-15",
  },
  {
    id: "P67890",
    name: "Jane Anderson",
    age: 32,
    gender: "Female",
    policyNumber: "POL-789012",
    registrationDate: "2024-09-22",
    lastVisit: "2025-04-02",
  },
  {
    id: "P24680",
    name: "Michael Johnson",
    age: 58,
    gender: "Male",
    policyNumber: "POL-246801",
    registrationDate: "2024-08-05",
    lastVisit: "2025-02-27",
  }
];

const Patients = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: "",
    time: "",
    reason: "",
    doctor: "Dr. Sharma"
  });

  const handleAppointmentRequest = () => {
    // In a real application, this would submit to an API
    toast({
      title: "Appointment Requested",
      description: `Appointment requested for ${selectedPatient} on ${appointmentDetails.date} at ${appointmentDetails.time}`
    });
    
    // Reset form and close dialog (closure handled by Dialog component)
    setAppointmentDetails({
      date: "",
      time: "",
      reason: "",
      doctor: "Dr. Sharma"
    });
    setSelectedPatient(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
          <p className="text-muted-foreground">
            Manage patient records and information
          </p>
        </div>
        <Button onClick={() => navigate("/patient-search")}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Patient
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Records</CardTitle>
          <CardDescription>
            View and manage all registered patients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Policy Number</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.id}</TableCell>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.policyNumber}</TableCell>
                    <TableCell>{new Date(patient.registrationDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/patient/${patient.id}`)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/patient/${patient.id}/claims`)}>
                          <FileText className="h-4 w-4 mr-1" />
                          Claims
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedPatient(patient.name)}
                            >
                              <Calendar className="h-4 w-4 mr-1" />
                              Book
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Request Appointment</DialogTitle>
                              <DialogDescription>
                                Schedule an appointment for {selectedPatient}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="date" className="text-right">
                                  Date
                                </Label>
                                <input
                                  id="date"
                                  type="date"
                                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                  value={appointmentDetails.date}
                                  onChange={(e) => setAppointmentDetails({...appointmentDetails, date: e.target.value})}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="time" className="text-right">
                                  Time
                                </Label>
                                <input
                                  id="time"
                                  type="time"
                                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                  value={appointmentDetails.time}
                                  onChange={(e) => setAppointmentDetails({...appointmentDetails, time: e.target.value})}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="doctor" className="text-right">
                                  Doctor
                                </Label>
                                <Select 
                                  value={appointmentDetails.doctor} 
                                  onValueChange={(value) => setAppointmentDetails({...appointmentDetails, doctor: value})}
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a doctor" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Dr. Sharma">Dr. Sharma</SelectItem>
                                    <SelectItem value="Dr. Patel">Dr. Patel</SelectItem>
                                    <SelectItem value="Dr. Reddy">Dr. Reddy</SelectItem>
                                    <SelectItem value="Dr. Khan">Dr. Khan</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="reason" className="text-right">
                                  Reason
                                </Label>
                                <Textarea
                                  id="reason"
                                  className="col-span-3"
                                  value={appointmentDetails.reason}
                                  onChange={(e) => setAppointmentDetails({...appointmentDetails, reason: e.target.value})}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit" onClick={handleAppointmentRequest}>Request Appointment</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Patients;
