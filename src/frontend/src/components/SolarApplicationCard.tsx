import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from './StatusBadge';
import { SolarApplication } from '../backend';
import { useLanguage } from '../contexts/LanguageContext';
import { Sun } from 'lucide-react';

interface SolarApplicationCardProps {
  application: SolarApplication;
}

export default function SolarApplicationCard({ application }: SolarApplicationCardProps) {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sun size={20} className="text-yellow-600" />
            {t('solar')}
          </CardTitle>
          <StatusBadge status={application.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <img
            src={application.aadhaarDoc.getDirectURL()}
            alt="Aadhaar"
            className="w-full h-24 object-cover rounded-md"
          />
          <img
            src={application.billDoc.getDirectURL()}
            alt="Bill"
            className="w-full h-24 object-cover rounded-md"
          />
          <img
            src={application.housePhoto.getDirectURL()}
            alt="House"
            className="w-full h-24 object-cover rounded-md"
          />
        </div>

        <p className="text-xs text-muted-foreground">
          {t('submittedOn')}: {new Date(Number(application.createdAt) / 1000000).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
