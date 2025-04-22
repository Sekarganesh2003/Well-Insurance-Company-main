
import { Badge } from "@/components/ui/badge";
import { ClaimStatus } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface ClaimStatusBadgeProps {
  status: ClaimStatus;
  className?: string;
}

const ClaimStatusBadge = ({ status, className }: ClaimStatusBadgeProps) => {
  const getStatusConfig = (status: ClaimStatus) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pending',
          variant: 'secondary',
        };
      case 'under_review':
        return {
          label: 'Under Review',
          variant: 'outline',
        };
      case 'approved':
        return {
          label: 'Approved',
          variant: 'default',
          className: 'bg-medical-green hover:bg-medical-green/80 text-white'
        };
      case 'rejected':
        return {
          label: 'Rejected',
          variant: 'destructive',
        };
      case 'additional_info':
        return {
          label: 'Info Needed',
          variant: 'outline',
          className: 'border-medical-yellow text-medical-yellow hover:bg-medical-yellow/10'
        };
      default:
        return {
          label: (status as string).split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          variant: 'secondary',
        };
    }
  };

  const config = getStatusConfig(status);
  
  return (
    <Badge 
      variant={config.variant as any}
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
};

export default ClaimStatusBadge;
