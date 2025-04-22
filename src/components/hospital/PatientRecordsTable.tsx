
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, FileText, Search } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  insuranceId: string;
  lastVisit: string;
}

// Mock patient data
const mockPatients: Patient[] = [
  { id: "P001", name: "John Patient", age: 45, gender: "Male", phone: "9876543210", insuranceId: "INS98765", lastVisit: "2025-03-12" },
  { id: "P002", name: "Sarah Johnson", age: 32, gender: "Female", phone: "9876543211", insuranceId: "INS98766", lastVisit: "2025-04-02" },
  { id: "P003", name: "Michael Brown", age: 58, gender: "Male", phone: "9876543212", insuranceId: "INS98767", lastVisit: "2025-03-25" },
  { id: "P004", name: "Emily Wilson", age: 24, gender: "Female", phone: "9876543213", insuranceId: "INS98768", lastVisit: "2025-04-08" },
  { id: "P005", name: "David Kumar", age: 42, gender: "Male", phone: "9876543214", insuranceId: "INS98769", lastVisit: "2025-03-30" },
  { id: "P006", name: "Priya Sharma", age: 29, gender: "Female", phone: "9876543215", insuranceId: "INS98770", lastVisit: "2025-04-05" },
  { id: "P007", name: "Rajesh Patel", age: 51, gender: "Male", phone: "9876543216", insuranceId: "INS98771", lastVisit: "2025-03-18" },
];

const PatientRecordsTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPatients = mockPatients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.insuranceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search patients by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Insurance ID</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.insuranceId}</TableCell>
                  <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => navigate(`/patient/${patient.id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => navigate(`/patient/${patient.id}/claims`)}>
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No patients found matching your search
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PatientRecordsTable;
