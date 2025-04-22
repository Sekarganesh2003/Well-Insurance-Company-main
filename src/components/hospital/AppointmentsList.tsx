
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

type AppointmentStatus = "scheduled" | "completed" | "cancelled" | "no-show";

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  purpose: string;
  status: AppointmentStatus;
  doctorName: string;
}

// Mock appointment data
const mockAppointments: Appointment[] = [
  {
    id: "A001",
    patientId: "P001",
    patientName: "John Patient",
    date: "2025-04-15",
    time: "10:00",
    purpose: "Follow-up consultation",
    status: "scheduled",
    doctorName: "Dr. Sharma"
  },
  {
    id: "A002",
    patientId: "P002",
    patientName: "Sarah Johnson",
    date: "2025-04-15",
    time: "11:30",
    purpose: "Vaccination",
    status: "scheduled",
    doctorName: "Dr. Patel"
  },
  {
    id: "A003",
    patientId: "P003",
    patientName: "Michael Brown",
    date: "2025-04-14",
    time: "14:00",
    purpose: "Cardiac checkup",
    status: "completed",
    doctorName: "Dr. Reddy"
  },
  {
    id: "A004",
    patientId: "P004",
    patientName: "Emily Wilson",
    date: "2025-04-14",
    time: "15:30",
    purpose: "Allergy test",
    status: "no-show",
    doctorName: "Dr. Khan"
  },
  {
    id: "A005",
    patientId: "P006",
    patientName: "Priya Sharma",
    date: "2025-04-16",
    time: "09:15",
    purpose: "Annual checkup",
    status: "scheduled",
    doctorName: "Dr. Sharma"
  },
  {
    id: "A006",
    patientId: "P007",
    patientName: "Rajesh Patel",
    date: "2025-04-16",
    time: "12:00",
    purpose: "Blood test",
    status: "scheduled",
    doctorName: "Dr. Khan"
  },
];

const AppointmentsList = () => {
  const [filter, setFilter] = useState<string>("all");
  
  const getFilteredAppointments = () => {
    if (filter === "all") return mockAppointments;
    return mockAppointments.filter(appointment => appointment.status === filter);
  };
  
  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Cancelled</Badge>;
      case "no-show":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">No Show</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Upcoming Appointments</h3>
        </div>
        
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Appointments</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="no-show">No Show</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getFilteredAppointments().map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{appointment.patientName}</p>
                    <p className="text-xs text-muted-foreground">ID: {appointment.patientId}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p>{new Date(appointment.date).toLocaleDateString()}</p>
                      <p className="text-xs text-muted-foreground">{appointment.time}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{appointment.doctorName}</TableCell>
                <TableCell>{appointment.purpose}</TableCell>
                <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" title="Mark as complete">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Cancel appointment">
                      <XCircle className="h-4 w-4 text-red-600" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Mark as no-show">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppointmentsList;
