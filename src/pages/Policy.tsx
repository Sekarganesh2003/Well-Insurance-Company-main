
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertCircle, Info } from "lucide-react";

const Policy = () => {
  // Sample policy data for demo
  const policyDetails = {
    policyNumber: "WIC/HLT/2025/123456",
    policyType: "Family Floater Health Insurance",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    sumInsured: 500000, // in INR
    premium: 15000, // Annual premium in INR
    remainingCoverage: 425000,
    status: "active",
    members: [
      { name: "Rahul Sharma", age: 35, relation: "Self", id: "MEM001" },
      { name: "Priya Sharma", age: 32, relation: "Spouse", id: "MEM002" },
      { name: "Arjun Sharma", age: 8, relation: "Son", id: "MEM003" },
      { name: "Anaya Sharma", age: 5, relation: "Daughter", id: "MEM004" }
    ],
    claims: [
      { id: "CLM001", date: "2025-02-15", amount: 35000, status: "approved", reason: "Hospitalization (Dengue)" },
      { id: "CLM002", date: "2025-04-22", amount: 40000, status: "approved", reason: "Surgery (Appendectomy)" }
    ],
    coverages: [
      { type: "Hospitalization", isIncluded: true, waitingPeriod: "30 days", notes: "100% of Sum Insured" },
      { type: "Pre & Post Hospitalization", isIncluded: true, waitingPeriod: "None", notes: "60 days before and 90 days after hospitalization" },
      { type: "Day Care Treatments", isIncluded: true, waitingPeriod: "None", notes: "All day care procedures covered" },
      { type: "Ambulance Charges", isIncluded: true, waitingPeriod: "None", notes: "Up to ₹3,000 per hospitalization" },
      { type: "Domiciliary Treatment", isIncluded: true, waitingPeriod: "None", notes: "Up to 10% of Sum Insured" },
      { type: "Organ Donor Expenses", isIncluded: true, waitingPeriod: "90 days", notes: "Up to 20% of Sum Insured" },
      { type: "Ayurvedic Treatment", isIncluded: true, waitingPeriod: "60 days", notes: "Up to ₹30,000" },
      { type: "Maternity Benefits", isIncluded: false, waitingPeriod: "9 months", notes: "Not included in this policy" },
      { type: "OPD Treatment", isIncluded: false, waitingPeriod: "None", notes: "Not included in this policy" }
    ],
    exclusions: [
      "Pre-existing diseases for first 24 months of policy",
      "Intentional self-injury, attempted suicide",
      "Cosmetic or plastic surgery (unless required due to accident)",
      "Treatment related to HIV/AIDS",
      "War, invasion, act of foreign enemy",
      "Alcohol/drug abuse or addiction",
      "Dental treatment or surgery unless necessitated by accident",
      "Expenses related to any treatment needed due to participation in hazardous activities"
    ]
  };
  
  // Format date for display
  const formatDate = (dateStr: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-IN', options);
  };
  
  // Calculate policy usage percentage
  const coverageUsed = policyDetails.sumInsured - policyDetails.remainingCoverage;
  const coveragePercentage = Math.round((coverageUsed / policyDetails.sumInsured) * 100);
  
  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Policy Information</h1>
        <p className="text-muted-foreground">
          View details about your insurance policy, coverage, and claims history.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Policy Summary</CardTitle>
              <CardDescription>Your current policy information</CardDescription>
            </div>
            <Badge variant={policyDetails.status === "active" ? "default" : "destructive"} className="capitalize">
              {policyDetails.status}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Policy Number</p>
                <p className="font-medium">{policyDetails.policyNumber}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Policy Type</p>
                <p className="font-medium">{policyDetails.policyType}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Valid From</p>
                <p className="font-medium">{formatDate(policyDetails.startDate)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Valid Until</p>
                <p className="font-medium">{formatDate(policyDetails.endDate)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Sum Insured</p>
                <p className="font-medium">₹{policyDetails.sumInsured.toLocaleString('en-IN')}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Annual Premium</p>
                <p className="font-medium">₹{policyDetails.premium.toLocaleString('en-IN')}</p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <div className="flex justify-between mb-1">
                  <p className="text-sm text-muted-foreground">Coverage Utilization</p>
                  <p className="text-sm font-medium">{coveragePercentage}%</p>
                </div>
                <Progress value={coveragePercentage} className="h-2" />
                <div className="flex justify-between text-xs mt-1">
                  <span>₹{coverageUsed.toLocaleString('en-IN')} used</span>
                  <span>₹{policyDetails.remainingCoverage.toLocaleString('en-IN')} remaining</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="coverage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="coverage">Coverage Details</TabsTrigger>
          <TabsTrigger value="members">Covered Members</TabsTrigger>
          <TabsTrigger value="claims">Claims History</TabsTrigger>
          <TabsTrigger value="exclusions">Exclusions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="coverage">
          <Card>
            <CardHeader>
              <CardTitle>Coverage Details</CardTitle>
              <CardDescription>What's included in your policy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md divide-y">
                <div className="grid grid-cols-12 gap-2 p-3 font-medium bg-muted/50">
                  <div className="col-span-4">Coverage Type</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Waiting Period</div>
                  <div className="col-span-4">Details</div>
                </div>
                {policyDetails.coverages.map((coverage, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 p-3">
                    <div className="col-span-4">{coverage.type}</div>
                    <div className="col-span-2">
                      {coverage.isIncluded ? (
                        <span className="inline-flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-4 w-4" /> Included
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-500">
                          <AlertCircle className="h-4 w-4" /> Not Included
                        </span>
                      )}
                    </div>
                    <div className="col-span-2">{coverage.waitingPeriod}</div>
                    <div className="col-span-4">{coverage.notes}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Covered Members</CardTitle>
              <CardDescription>Who's covered under this policy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md divide-y">
                <div className="grid grid-cols-12 gap-2 p-3 font-medium bg-muted/50">
                  <div className="col-span-1">ID</div>
                  <div className="col-span-5">Name</div>
                  <div className="col-span-3">Relation</div>
                  <div className="col-span-3">Age</div>
                </div>
                {policyDetails.members.map((member, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 p-3">
                    <div className="col-span-1">{member.id}</div>
                    <div className="col-span-5">{member.name}</div>
                    <div className="col-span-3">{member.relation}</div>
                    <div className="col-span-3">{member.age} years</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="claims">
          <Card>
            <CardHeader>
              <CardTitle>Claims History</CardTitle>
              <CardDescription>Previous claims made under this policy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md divide-y">
                <div className="grid grid-cols-12 gap-2 p-3 font-medium bg-muted/50">
                  <div className="col-span-2">Claim ID</div>
                  <div className="col-span-3">Date</div>
                  <div className="col-span-3">Reason</div>
                  <div className="col-span-2">Amount (₹)</div>
                  <div className="col-span-2">Status</div>
                </div>
                {policyDetails.claims.map((claim, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 p-3">
                    <div className="col-span-2">{claim.id}</div>
                    <div className="col-span-3">{formatDate(claim.date)}</div>
                    <div className="col-span-3">{claim.reason}</div>
                    <div className="col-span-2">₹{claim.amount.toLocaleString('en-IN')}</div>
                    <div className="col-span-2">
                      <Badge variant={claim.status === "approved" ? "default" : "secondary"} className="capitalize">
                        {claim.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="exclusions">
          <Card>
            <CardHeader>
              <CardTitle>Policy Exclusions</CardTitle>
              <CardDescription>Items not covered by your insurance policy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex gap-3">
                  <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-yellow-800">
                    Please review the following exclusions carefully. These conditions, treatments, and situations are not 
                    covered by your policy. If you have any questions, please contact our support team.
                  </p>
                </div>
                <ul className="space-y-2">
                  {policyDetails.exclusions.map((exclusion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span>{exclusion}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  This is not an exhaustive list. Please refer to your policy document for complete details on 
                  exclusions, terms, and conditions.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Policy;
