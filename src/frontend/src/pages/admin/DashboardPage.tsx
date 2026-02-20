import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAllComplaints, useAllTrees, useAllWaterProjects, useAllSolarApplications } from '../../hooks/useQueries';
import MetricsCards from '../../components/admin/MetricsCards';
import ComplaintsBarChart from '../../components/admin/ComplaintsBarChart';
import StatusPieChart from '../../components/admin/StatusPieChart';
import MonthlyActivityChart from '../../components/admin/MonthlyActivityChart';
import RecentActivityFeed from '../../components/admin/RecentActivityFeed';

export default function DashboardPage() {
  const { t } = useLanguage();
  const { data: complaints = [] } = useAllComplaints();
  const { data: trees = [] } = useAllTrees();
  const { data: waterProjects = [] } = useAllWaterProjects();
  const { data: solarApplications = [] } = useAllSolarApplications();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('dashboardTitle')}</h1>

      <MetricsCards
        complaints={complaints}
        trees={trees}
        waterProjects={waterProjects}
        solarApplications={solarApplications}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <ComplaintsBarChart complaints={complaints} />
        <StatusPieChart complaints={complaints} />
      </div>

      <div className="mt-8">
        <MonthlyActivityChart
          complaints={complaints}
          trees={trees}
          waterProjects={waterProjects}
          solarApplications={solarApplications}
        />
      </div>

      <div className="mt-8">
        <RecentActivityFeed
          complaints={complaints}
          trees={trees}
          waterProjects={waterProjects}
          solarApplications={solarApplications}
        />
      </div>
    </div>
  );
}
