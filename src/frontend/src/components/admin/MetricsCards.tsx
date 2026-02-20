import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Complaint, Tree, WaterProject, SolarApplication } from '../../backend';

interface MetricsCardsProps {
  complaints: Complaint[];
  trees: Tree[];
  waterProjects: WaterProject[];
  solarApplications: SolarApplication[];
}

export default function MetricsCards({ complaints, trees, waterProjects, solarApplications }: MetricsCardsProps) {
  const { t } = useLanguage();

  const completedComplaints = complaints.filter((c) => c.status === 'completed').length;
  const completionRate = complaints.length > 0 ? ((completedComplaints / complaints.length) * 100).toFixed(1) : '0';

  const survivingTrees = trees.filter((t) => t.survivalStatus).length;
  const survivalRate = trees.length > 0 ? ((survivingTrees / trees.length) * 100).toFixed(1) : '0';

  const installedSolar = solarApplications.filter((a) => a.status === 'completed').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="text-sm font-medium">{t('totalComplaints')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{complaints.length}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {t('completionRate')}: {completionRate}%
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="text-sm font-medium">{t('treeSurvivalRate')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{survivalRate}%</p>
          <p className="text-xs text-muted-foreground mt-1">
            {survivingTrees} / {trees.length} {t('surviving')}
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader>
          <CardTitle className="text-sm font-medium">{t('solarInstallations')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{installedSolar}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {solarApplications.length} {t('totalApplications')}
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="text-sm font-medium">{t('waterProjects')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{waterProjects.length}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {waterProjects.filter((p) => p.completionStatus === 'completed').length} {t('completedProjects')}
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            {complaints.length + trees.length + waterProjects.length + solarApplications.length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">All modules combined</p>
        </CardContent>
      </Card>
    </div>
  );
}
