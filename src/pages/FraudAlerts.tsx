
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for fraud alerts
const mockFraudAlerts = [
  {
    id: "FR-001",
    claimId: "CL-78945",
    patientName: "Robert Johnson",
    hospitalName: "City General Hospital",
    claimAmount: 125000,
    flags: ["Duplicate Billing", "Excessive Charges"],
    date: "2025-04-01",
    severity: "high"
  },
  {
    id: "FR-002",
    claimId: "CL-56723",
    patientName: "Maria Garcia",
    hospitalName: "Memorial Hospital",
    claimAmount: 45000,
    flags: ["Unusual Treatment Pattern"],
    date: "2025-04-03",
    severity: "medium"
  },
  {
    id: "FR-003",
    claimId: "CL-89012",
    patientName: "David Williams",
    hospitalName: "St. Luke's Medical Center",
    claimAmount: 78500,
    flags: ["Provider History Flag"],
    date: "2025-04-07",
    severity: "low"
  }
];

const FraudAlerts = () => {
  const navigate = useNavigate();

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "low":
        return <Badge className="bg-blue-100 text-blue-800">Low</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{severity}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Fraud Alerts</h2>
        <p className="text-muted-foreground">
          Review and investigate potential fraudulent claim activities
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Potential Fraud Alerts
          </CardTitle>
          <CardDescription>
            Claims that have been flagged for suspicious activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockFraudAlerts.length > 0 ? (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alert ID</TableHead>
                    <TableHead>Claim</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Hospital</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Flags</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFraudAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>{alert.id}</TableCell>
                      <TableCell>{alert.claimId}</TableCell>
                      <TableCell>{alert.patientName}</TableCell>
                      <TableCell>{alert.hospitalName}</TableCell>
                      <TableCell>₹{alert.claimAmount.toLocaleString('en-IN')}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {alert.flags.map((flag, index) => (
                            <span key={index} className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full">
                              {flag}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                      <TableCell>{new Date(alert.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/admin/review/${alert.claimId}`)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-10 border rounded-md">
              <AlertTriangle className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <p className="font-medium">No fraud alerts detected</p>
              <p className="text-sm text-muted-foreground mt-1">
                All claims are currently clear of suspicious activity
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FraudAlerts;
