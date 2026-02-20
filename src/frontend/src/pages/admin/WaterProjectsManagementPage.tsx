import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAllWaterProjects, useUpdateWaterProjectStatus } from '../../hooks/useQueries';
import StatusBadge from '../../components/StatusBadge';
import { Status } from '../../backend';
import { Droplets } from 'lucide-react';

export default function WaterProjectsManagementPage() {
  const { t } = useLanguage();
  const { data: projects = [] } = useAllWaterProjects();
  const updateStatus = useUpdateWaterProjectStatus();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [workerName, setWorkerName] = useState('');
  const [newStatus, setNewStatus] = useState<Status>('pending' as Status);

  const totalProjects = projects.length;
  const completedProjects = projects.filter((p) => p.completionStatus === 'completed').length;
  const completionRate = totalProjects > 0 ? ((completedProjects / totalProjects) * 100).toFixed(1) : '0';

  const handleUpdateStatus = async (id: string) => {
    await updateStatus.mutateAsync({
      id,
      workerAssigned: workerName || null,
      status: newStatus,
    });
    setEditingId(null);
    setWorkerName('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('waterProjectsManagement')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{t('totalProjects')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalProjects}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{t('completedProjects')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{completedProjects}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{t('completionRate')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{completionRate}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Droplets size={20} className="text-blue-600" />
                  Water Project
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

              <p className="text-xs text-muted-foreground">
                {t('submittedOn')}: {new Date(Number(project.createdAt) / 1000000).toLocaleDateString()}
              </p>

              {project.workerAssigned && (
                <p className="text-sm">
                  {t('assignedWorker')}: {project.workerAssigned}
                </p>
              )}

              {editingId === project.id ? (
                <div className="space-y-3 border-t pt-3">
                  <div>
                    <Label>{t('workerName')}</Label>
                    <Input
                      value={workerName}
                      onChange={(e) => setWorkerName(e.target.value)}
                      placeholder={t('assignWorker')}
                    />
                  </div>
                  <div>
                    <Label>{t('updateStatus')}</Label>
                    <Select value={newStatus} onValueChange={(v) => setNewStatus(v as Status)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inProgress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleUpdateStatus(project.id)}>
                      {t('submit')}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setEditingId(project.id);
                    setWorkerName(project.workerAssigned || '');
                    setNewStatus(project.completionStatus);
                  }}
                >
                  {t('updateStatus')}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
