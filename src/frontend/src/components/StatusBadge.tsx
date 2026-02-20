import { Badge } from '@/components/ui/badge';
import { Status } from '../backend';
import { Clock, Loader2, CheckCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pending',
          className: 'bg-yellow-500 text-white hover:bg-yellow-600',
          icon: Clock,
        };
      case 'inProgress':
        return {
          label: 'In Progress',
          className: 'bg-blue-500 text-white hover:bg-blue-600',
          icon: Loader2,
        };
      case 'completed':
        return {
          label: 'Completed',
          className: 'bg-green-600 text-white hover:bg-green-700',
          icon: CheckCircle,
        };
      default:
        return {
          label: 'Unknown',
          className: 'bg-gray-500 text-white',
          icon: Clock,
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Badge className={config.className}>
      <Icon size={14} className="mr-1" />
      {config.label}
    </Badge>
  );
}
