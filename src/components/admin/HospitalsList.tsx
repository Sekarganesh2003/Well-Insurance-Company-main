
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Search, Building2, Users, ClipboardList, ExternalLink } from "lucide-react";

interface Hospital {
  id: string;
  name: string;
  type: "General" | "Specialty" | "Clinic";
  location: string;
  claimsCount: number;
  verificationStatus: "verified" | "pending" | "unverified";
  patientCount: number;
  joinedDate: string;
}

// Mock hospitals data
const mockHospitals: Hospital[] = [
  {
    id: "H001",
    name: "City General Hospital",
    type: "General",
    location: "Mumbai, Maharashtra",
    claimsCount: 156,
    verificationStatus: "verified",
    patientCount: 2450,
    joinedDate: "2024-01-15"
  },
  {
    id: "H002",
    name: "Apollo Specialty Care",
    type: "Specialty",
    location: "Bangalore, Karnataka",
    claimsCount: 89,
    verificationStatus: "verified",
    patientCount: 1200,
    joinedDate: "2024-02-28"
  },
  {
    id: "H003",
    name: "Wellness Clinic",
    type: "Clinic",
    location: "Delhi, Delhi",
    claimsCount: 42,
    verificationStatus: "pending",
    patientCount: 780,
    joinedDate: "2024-03-10"
  },
  {
    id: "H004",
    name: "Medical Care Center",
    type: "General",
    location: "Chennai, Tamil Nadu",
    claimsCount: 68,
    verificationStatus: "verified",
    patientCount: 1560,
    joinedDate: "2024-01-22"
  },
  {
    id: "H005",
    name: "Health First Hospital",
    type: "General",
    location: "Kolkata, West Bengal",
    claimsCount: 37,
    verificationStatus: "unverified",
    patientCount: 560,
    joinedDate: "2024-03-25"
  }
];

const HospitalsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredHospitals = mockHospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending Verification
          </Badge>
        );
      case "unverified":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
            Unverified
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search hospitals by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hospital Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Claims</TableHead>
              <TableHead>Patients</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHospitals.map((hospital) => (
              <TableRow key={hospital.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{hospital.name}</span>
                  </div>
                </TableCell>
                <TableCell>{hospital.type}</TableCell>
                <TableCell>{hospital.location}</TableCell>
                <TableCell>{hospital.claimsCount}</TableCell>
                <TableCell>{hospital.patientCount}</TableCell>
                <TableCell>{getStatusBadge(hospital.verificationStatus)}</TableCell>
                <TableCell>{new Date(hospital.joinedDate).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => navigate(`/hospital/${hospital.id}`)}
                    >
                      <ExternalLink className="h-3 w-3" />
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="View patients"
                      onClick={() => navigate(`/hospital/${hospital.id}/patients`)}
                    >
                      <Users className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="View claims"
                      onClick={() => navigate(`/hospital/${hospital.id}/claims`)}
                    >
                      <ClipboardList className="h-4 w-4" />
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

export default HospitalsList;
