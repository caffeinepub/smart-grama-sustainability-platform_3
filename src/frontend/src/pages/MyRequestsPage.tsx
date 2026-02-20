import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { useMyComplaints, useMyTrees, useMyWaterProjects, useMySolarApplications } from '../hooks/useQueries';
import ComplaintCard from '../components/ComplaintCard';
import TreeRequestCard from '../components/TreeRequestCard';
import WaterProjectCard from '../components/WaterProjectCard';
import SolarApplicationCard from '../components/SolarApplicationCard';
import ProtectedRoute from '../components/ProtectedRoute';

function MyRequestsContent() {
  const { t } = useLanguage();
  const { data: complaints = [] } = useMyComplaints();
  const { data: trees = [] } = useMyTrees();
  const { data: waterProjects = [] } = useMyWaterProjects();
  const { data: solarApplications = [] } = useMySolarApplications();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('myRequests')}</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('myComplaintsTitle')}</h2>
          {complaints.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">{t('noComplaints')}</CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {complaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} showRating />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('myTreesTitle')}</h2>
          {trees.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">{t('noTrees')}</CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trees.map((tree) => (
                <TreeRequestCard key={tree.id} tree={tree} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('myWaterProjectsTitle')}</h2>
          {waterProjects.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">{t('noWaterProjects')}</CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {waterProjects.map((project) => (
                <WaterProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('mySolarApplicationsTitle')}</h2>
          {solarApplications.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                {t('noSolarApplications')}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {solarApplications.map((application) => (
                <SolarApplicationCard key={application.id} application={application} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function MyRequestsPage() {
  return (
    <ProtectedRoute>
      <MyRequestsContent />
    </ProtectedRoute>
  );
}
