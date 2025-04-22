
import { useNavigate } from "react-router-dom";
import { useClaims } from "@/hooks/useClaims";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Eye, 
  Clock, 
  RefreshCw, 
  CheckSquare, 
  Filter 
} from "lucide-react";
import ClaimStatusBadge from "../claims/ClaimStatusBadge";
import { ClaimStatus } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PendingClaimsList = () => {
  const { claims, updateClaimStatus, autoProcessClaim } = useClaims();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedClaims, setSelectedClaims] = useState<Set<string>>(new Set());
  const [bulkProcessing, setBulkProcessing] = useState(false);

  const handleUpdateStatus = (claimId: string, status: ClaimStatus) => {
    updateClaimStatus(claimId, status);
  };

  const filteredClaims = claims.filter(claim => {
    if (statusFilter === "all") {
      return claim.status === "pending" || claim.status === "under_review" || claim.status === "additional_info";
    }
    return claim.status === statusFilter;
  });

  const toggleSelect = (claimId: string) => {
    const newSelected = new Set(selectedClaims);
    if (newSelected.has(claimId)) {
      newSelected.delete(claimId);
    } else {
      newSelected.add(claimId);
    }
    setSelectedClaims(newSelected);
  };

  const selectAll = () => {
    if (selectedClaims.size === filteredClaims.length) {
      // Deselect all
      setSelectedClaims(new Set());
    } else {
      // Select all
      setSelectedClaims(new Set(filteredClaims.map(claim => claim.id)));
    }
  };

  const handleBulkAction = async (status: ClaimStatus) => {
    if (selectedClaims.size === 0) {
      toast({
        title: "No claims selected",
        description: "Please select at least one claim",
        variant: "destructive"
      });
      return;
    }

    setBulkProcessing(true);
    try {
      // Process each selected claim
      for (const claimId of selectedClaims) {
        updateClaimStatus(claimId, status);
      }
      
      toast({
        title: "Bulk action completed",
        description: `${selectedClaims.size} claims updated to ${status.replace('_', ' ')}`,
      });
      
      // Clear selection after action
      setSelectedClaims(new Set());
    } catch (error) {
      console.error("Error processing bulk action:", error);
      toast({
        title: "Error",
        description: "Failed to process some claims",
        variant: "destructive"
      });
    } finally {
      setBulkProcessing(false);
    }
  };
  
  const handleAutoProcess = async () => {
    setBulkProcessing(true);
    try {
      let processed = 0;
      
      // Process all pending claims
      for (const claim of filteredClaims) {
        if (claim.status === 'pending') {
          await autoProcessClaim(claim);
          processed++;
        }
      }
      
      toast({
        title: "Auto-processing completed",
        description: `${processed} claims have been automatically processed`,
      });
    } catch (error) {
      console.error("Error auto-processing claims:", error);
      toast({
        title: "Error",
        description: "Failed to auto-process claims",
        variant: "destructive"
      });
    } finally {
      setBulkProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">
            {filteredClaims.length} claims requiring review
          </h3>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pending</SelectItem>
              <SelectItem value="pending">New Claims</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="additional_info">Needs Information</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {selectedClaims.size > 0 && (
            <Card className="bg-muted p-0">
              <CardContent className="p-2 flex items-center gap-2">
                <span className="text-xs font-medium">{selectedClaims.size} selected</span>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Bulk Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleBulkAction('approved')}>
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Approve All Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction('rejected')}>
                      <XCircle className="h-4 w-4 text-red-600 mr-2" />
                      Reject All Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction('under_review')}>
                      <Clock className="h-4 w-4 text-blue-600 mr-2" />
                      Mark All As Under Review
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={selectAll}
          >
            <CheckSquare className="h-4 w-4" />
            {selectedClaims.size === filteredClaims.length ? "Deselect All" : "Select All"}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={handleAutoProcess}
            disabled={bulkProcessing}
          >
            <RefreshCw className={cn("h-4 w-4", bulkProcessing && "animate-spin")} />
            {bulkProcessing ? "Processing..." : "Auto-Process All"}
          </Button>
        </div>
      </div>

      {filteredClaims.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]"></TableHead>
                <TableHead>Claim ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClaims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell>
                    <input 
                      type="checkbox" 
                      checked={selectedClaims.has(claim.id)}
                      onChange={() => toggleSelect(claim.id)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{claim.id}</TableCell>
                  <TableCell>{claim.patientName}</TableCell>
                  <TableCell>{claim.hospitalName}</TableCell>
                  <TableCell>₹{claim.claimAmount.toLocaleString('en-IN')}</TableCell>
                  <TableCell>
                    <ClaimStatusBadge status={claim.status} />
                  </TableCell>
                  <TableCell>
                    {new Date(claim.submittedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="View details"
                        onClick={() => navigate(`/admin/review/${claim.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Mark as under review"
                        onClick={() => handleUpdateStatus(claim.id, "under_review")}
                      >
                        <Clock className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Approve claim"
                        onClick={() => handleUpdateStatus(claim.id, "approved")}
                      >
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Reject claim"
                        onClick={() => handleUpdateStatus(claim.id, "rejected")}
                      >
                        <XCircle className="h-4 w-4 text-red-600" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Request additional information"
                        onClick={() => handleUpdateStatus(claim.id, "additional_info")}
                      >
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-md">
          <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
          <p className="font-medium">All caught up!</p>
          <p className="text-sm text-muted-foreground mt-1">
            No pending claims require your attention at this time.
          </p>
        </div>
      )}
    </div>
  );
};

export default PendingClaimsList;
