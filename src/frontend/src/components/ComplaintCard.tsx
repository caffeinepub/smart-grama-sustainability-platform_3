import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatusBadge from './StatusBadge';
import ComplaintRatingForm from './ComplaintRatingForm';
import { Complaint } from '../backend';
import { useLanguage } from '../contexts/LanguageContext';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { MapPin, User } from 'lucide-react';

interface ComplaintCardProps {
  complaint: Complaint;
  showRating?: boolean;
}

export default function ComplaintCard({ complaint, showRating = false }: ComplaintCardProps) {
  const { t } = useLanguage();
  const { identity } = useInternetIdentity();

  const isOwner = identity && complaint.userId === identity.getPrincipal().toString();
  const categoryLabels: Record<string, string> = {
    garbage: t('garbage'),
    streetLight: t('streetLight'),
    drainage: t('drainage'),
    others: t('others'),
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{categoryLabels[complaint.category] || complaint.category}</CardTitle>
          <StatusBadge status={complaint.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{complaint.description}</p>

        {complaint.photo && (
          <img
            src={complaint.photo.getDirectURL()}
            alt="Complaint"
            className="w-full h-48 object-cover rounded-md"
          />
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={16} />
          <span>{complaint.location}</span>
        </div>

        {complaint.assignedWorker && (
          <div className="flex items-center gap-2 text-sm">
            <User size={16} />
            <span>
              {t('assignedWorker')}: {complaint.assignedWorker}
            </span>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          {t('submittedOn')}: {new Date(Number(complaint.createdAt) / 1000000).toLocaleDateString()}
        </p>

        {complaint.rating && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{t('rating')}:</span>
            <span className="text-yellow-500">{'★'.repeat(Number(complaint.rating))}</span>
          </div>
        )}

        {showRating && isOwner && complaint.status === 'completed' && !complaint.rating && (
          <ComplaintRatingForm complaintId={complaint.id} />
        )}
      </CardContent>
    </Card>
  );
}
