import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, UserRound, FileText, Phone, Mail, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Mock patient data - In a real application, this would come from an API
const mockPatientDetails = {
  P001: {
    id: "P001",
    name: "John Patient",
    age: 45,
    gender: "Male",
    dob: "1980-05-15",
    phone: "9876543210",
    email: "john.patient@example.com",
    address: "123 Main Street, Mumbai, India",
    emergencyContact: "Mary Patient (Wife) - 9876543211",
    bloodGroup: "O+",
    allergies: "Penicillin",
    chronicConditions: "Hypertension, Diabetes Type 2",
    insuranceId: "INS98765",
    insuranceProvider: "Health Shield India",
    registrationDate: "2024-10-15",
    lastVisit: "2025-03-12"
  },
  P002: {
    id: "P002",
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    dob: "1993-08-22",
    phone: "9876543211",
    email: "sarah.johnson@example.com",
    address: "456 Park Avenue, Delhi, India",
    emergencyContact: "Robert Johnson (Husband) - 9876543212",
    bloodGroup: "A+",
    allergies: "None",
    chronicConditions: "Asthma",
    insuranceId: "INS98766",
    insuranceProvider: "Health Shield India",
    registrationDate: "2024-09-22",
    lastVisit: "2025-04-02"
  },
  P003: {
    id: "P003",
    name: "Michael Brown",
    age: 58,
    gender: "Male",
    dob: "1967-03-10",
    phone: "9876543212",
    email: "michael.brown@example.com",
    address: "789 Oak Street, Bangalore, India",
    emergencyContact: "Linda Brown (Wife) - 9876543213",
    bloodGroup: "B-",
    allergies: "Sulfa drugs",
    chronicConditions: "Coronary Artery Disease",
    insuranceId: "INS98767",
    insuranceProvider: "MediCare India",
    registrationDate: "2024-08-05",
    lastVisit: "2025-03-25"
  },
  P005: {
    id: "P005",
    name: "David Kumar",
    age: 42,
    gender: "Male",
    dob: "1983-11-20",
    phone: "9876543214",
    email: "david.kumar@example.com",
    address: "22 Residency Road, Chennai, India",
    emergencyContact: "Anita Kumar (Wife) - 9876543215",
    bloodGroup: "AB+",
    allergies: "None",
    chronicConditions: "High Cholesterol",
    insuranceId: "INS98769",
    insuranceProvider: "LifeCare Insurance",
    registrationDate: "2024-11-10",
    lastVisit: "2025-03-30"
  },
  P008: {
    id: "P008",
    name: "Alice Roberts",
    age: 36,
    gender: "Female",
    dob: "1989-06-12",
    phone: "9876543217",
    email: "alice.roberts@example.com",
    address: "Plot 5, MG Road, Pune, India",
    emergencyContact: "Thomas Roberts (Husband) - 9876543218",
    bloodGroup: "A-",
    allergies: "Peanuts",
    chronicConditions: "Thyroid",
    insuranceId: "INS98772",
    insuranceProvider: "SafeHealth",
    registrationDate: "2024-10-01",
    lastVisit: "2025-04-10"
  },
  P009: {
    id: "P009",
    name: "Priya Singh",
    age: 28,
    gender: "Female",
    dob: "1997-02-18",
    phone: "9876543219",
    email: "priya.singh@example.com",
    address: "8 Sector 21, Noida, India",
    emergencyContact: "Ravi Singh (Brother) - 9876543220",
    bloodGroup: "B+",
    allergies: "Dust mites",
    chronicConditions: "PCOD",
    insuranceId: "INS98773",
    insuranceProvider: "CarePlus India",
    registrationDate: "2024-12-05",
    lastVisit: "2025-04-12"
  }
};


const PatientDetails = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [appointmentRequest, setAppointmentRequest] = useState({
    reason: "",
    submitted: false
  });
  
  // Get patient data
  const patient = patientId ? mockPatientDetails[patientId as keyof typeof mockPatientDetails] : null;
  
  if (!patient) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Patient Not Found</h2>
          <p className="text-muted-foreground">
            The patient record you're looking for does not exist
          </p>
        </div>
      </div>
    );
  }
  
  const handleAppointmentRequest = () => {
    // In a real app, this would submit to an API
    setAppointmentRequest({
      reason: "Checkup",
      submitted: true
    });
    
    // Show success notification (this would be replaced with a proper toast)
    alert("Appointment request submitted successfully!");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{patient.name}</h2>
          <p className="text-muted-foreground">
            Patient ID: {patient.id}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate(/patient/{patientId}/claims)}
          >
            <FileText className="h-4 w-4 mr-2" />
            View Claims
          </Button>
          <Button onClick={handleAppointmentRequest}>
            <Calendar className="h-4 w-4 mr-2" />
            Request Appointment
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Patient Details</TabsTrigger>
          <TabsTrigger value="medical">Medical History</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserRound className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Full Name</p>
                  <p>{patient.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Age</p>
                  <p>{patient.age} years</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Gender</p>
                  <p>{patient.gender}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Date of Birth</p>
                  <p>{new Date(patient.dob).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Phone</p>
                  <p className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    {patient.phone}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Email</p>
                  <p className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {patient.email}
                  </p>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="text-sm font-medium">Address</p>
                  <p>{patient.address}</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="text-sm font-medium">Emergency Contact</p>
                  <p>{patient.emergencyContact}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="medical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Blood Group</p>
                  <p>{patient.bloodGroup}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Known Allergies</p>
                  <p>{patient.allergies || "None"}</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="text-sm font-medium">Chronic Conditions</p>
                  <p>{patient.chronicConditions || "None"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insurance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Insurance Provider</p>
                  <p>{patient.insuranceProvider}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Insurance ID</p>
                  <p>{patient.insuranceId}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Registration Date</p>
                  <p>{new Date(patient.registrationDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Last Visit</p>
                  <p className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(patient.lastVisit).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDetails;" for examble if i uplode John_Patient_details.pdf shown the result of "patientName: 'John Patient',
    patientId: '1',
    hospitalName: 'City General Hospital',
    diagnosis: 'Acute Bronchitis',
    diagnosisCode: 'J20.9',
    treatmentDetails: 'Consultation, chest X-ray, prescription for antibiotics and bronchodilators',
    claimAmount: 475.50,
    serviceDate: '2025-04-10',
    confidence: {
      patientName: 0.95,
      patientId: 0.97,
      hospitalName: 0.92,
      diagnosis: 0.88,
      diagnosisCode: 0.94,
      treatmentDetails: 0.82,
      claimAmount: 0.90,
      serviceDate: 0.96