import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from './StatusBadge';
import { WaterProject } from '../backend';
import { useLanguage } from '../contexts/LanguageContext';
import { Droplets, User } from 'lucide-react';

interface WaterProjectCardProps {
  project: WaterProject;
}

export default function WaterProjectCard({ project }: WaterProjectCardProps) {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Droplets size={20} className="text-blue-600" />
            {t('water')}
          </CardTitle>
          <StatusBadge status={project.completionStatus} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <img
          src={project.landPhoto.getDirectURL()}
          alt="Land"
          className="w-full h-48 object-cover rounded-md"
        />

        {project.workerAssigned && (
          <div className="flex items-center gap-2 text-sm">
            <User size={16} />
            <span>
              {t('assignedWorker')}: {project.workerAssigned}
            </span>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          {t('submittedOn')}: {new Date(Number(project.createdAt) / 1000000).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
