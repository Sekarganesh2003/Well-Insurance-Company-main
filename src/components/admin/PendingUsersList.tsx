
import { useState } from "react";
import { useAuth, User } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const PendingUsersList = () => {
  const { getPendingUsers, approveUser, rejectUser } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const pendingUsers = getPendingUsers();

  const handleApprove = async (userId: string) => {
    setIsLoading(prev => ({ ...prev, [userId]: true }));
    try {
      await approveUser(userId);
      toast({
        title: "User approved successfully",
        description: "The user can now log in to their account",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error approving user",
        description: "An error occurred while approving the user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const handleReject = async (userId: string) => {
    setIsLoading(prev => ({ ...prev, [userId]: true }));
    try {
      await rejectUser(userId);
      toast({
        title: "User rejected",
        description: "The user has been denied access to the system",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error rejecting user",
        description: "An error occurred while rejecting the user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'patient':
        return 'bg-blue-100 text-blue-800';
      case 'hospital':
        return 'bg-green-100 text-green-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">
          {pendingUsers.length} accounts waiting for approval
        </h3>
      </div>

      {pendingUsers.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.role === 'patient' && user.policyNumber && (
                      <span className="text-xs">Policy: {user.policyNumber}</span>
                    )}
                    {user.role === 'hospital' && user.hospitalName && (
                      <span className="text-xs">{user.hospitalName}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="flex gap-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => handleApprove(user.id)}
                        disabled={isLoading[user.id]}
                      >
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="flex gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleReject(user.id)}
                        disabled={isLoading[user.id]}
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
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
          <UserCog className="h-12 w-12 text-green-500 mb-2" />
          <p className="font-medium">All caught up!</p>
          <p className="text-sm text-muted-foreground mt-1">
            No pending account requests require your approval.
          </p>
        </div>
      )}
    </div>
  );
};

export default PendingUsersList;
