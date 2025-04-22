
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const PatientSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { user } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock search functionality
    // In a real application, this would query a database
    setHasSearched(true);
    
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    
    // Mock results based on search term
    const mockResults = [
      {
        id: "P12345",
        name: "John Smith",
        age: 45,
        gender: "Male",
        policyNumber: "POL-123456",
        lastVisit: "2025-03-15",
      },
      {
        id: "P67890",
        name: "Jane Anderson",
        age: 32,
        gender: "Female",
        policyNumber: "POL-789012",
        lastVisit: "2025-04-02",
      },
    ].filter(patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      patient.policyNumber.includes(searchTerm)
    );
    
    setSearchResults(mockResults);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Patient Search</h2>
        <p className="text-muted-foreground">
          {user?.role === 'hospital' ? 'Search for patients in your hospital records' : 'Find patient information'}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Patients</CardTitle>
          <CardDescription>
            Enter patient name, policy number, or ID to find their records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <Input
              placeholder="Search by name or policy number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>

          {hasSearched && (
            <>
              {searchResults.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Policy Number</TableHead>
                        <TableHead>Last Visit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell>{patient.id}</TableCell>
                          <TableCell className="font-medium">{patient.name}</TableCell>
                          <TableCell>{patient.age}</TableCell>
                          <TableCell>{patient.gender}</TableCell>
                          <TableCell>{patient.policyNumber}</TableCell>
                          <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-10 border rounded-md">
                  <p className="text-muted-foreground">No patients found matching your search criteria</p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientSearch;
