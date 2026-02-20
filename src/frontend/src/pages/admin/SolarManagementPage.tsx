import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAllSolarApplications, useUpdateSolarStatus } from '../../hooks/useQueries';
import StatusBadge from '../../components/StatusBadge';
import { Status, SolarApplication } from '../../backend';
import { Sun } from 'lucide-react';

export default function SolarManagementPage() {
  const { t } = useLanguage();
  const { data: applications = [] } = useAllSolarApplications();
  const updateStatus = useUpdateSolarStatus();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<Status>('pending' as Status);
  const [viewingDocs, setViewingDocs] = useState<SolarApplication | null>(null);

  const totalApplications = applications.length;
  const installedHomes = applications.filter((a) => a.status === 'completed').length;
  const estimatedCO2 = installedHomes * 1.5;
  const estimatedEnergy = installedHomes * 3000;

  const handleUpdateStatus = async (id: string) => {
    await updateStatus.mutateAsync({ id, status: newStatus });
    setEditingId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('solarManagement')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{t('totalApplications')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalApplications}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{t('installedHomes')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{installedHomes}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{t('estimatedCO2Reduction')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{estimatedCO2.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">{t('tonsPerYear')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{t('estimatedEnergyGeneration')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{estimatedEnergy}</p>
            <p className="text-xs text-muted-foreground">{t('kWhPerYear')}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((application) => (
          <Card key={application.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sun size={20} className="text-yellow-600" />
                  Solar Application
                </CardTitle>
                <StatusBadge status={application.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <img
                  src={application.aadhaarDoc.getDirectURL()}
                  alt="Aadhaar"
                  className="w-full h-24 object-cover rounded-md cursor-pointer"
                  onClick={() => setViewingDocs(application)}
                />
                <img
                  src={application.billDoc.getDirectURL()}
                  alt="Bill"
                  className="w-full h-24 object-cover rounded-md cursor-pointer"
                  onClick={() => setViewingDocs(application)}
                />
                <img
                  src={application.housePhoto.getDirectURL()}
                  alt="House"
                  className="w-full h-24 object-cover rounded-md cursor-pointer"
                  onClick={() => setViewingDocs(application)}
                />
              </div>

              <p className="text-xs text-muted-foreground">
                {t('submittedOn')}: {new Date(Number(application.createdAt) / 1000000).toLocaleDateString()}
              </p>

              {editingId === application.id ? (
                <div className="space-y-3 border-t pt-3">
                  <div>
                    <Label>{t('updateStatus')}</Label>
                    <Select value={newStatus} onValueChange={(v) => setNewStatus(v as Status)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inProgress">Approved</SelectItem>
                        <SelectItem value="completed">Installed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleUpdateStatus(application.id)}>
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
                    setEditingId(application.id);
                    setNewStatus(application.status);
                  }}
                >
                  {t('updateStatus')}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!viewingDocs} onOpenChange={() => setViewingDocs(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{t('viewDocuments')}</DialogTitle>
          </DialogHeader>
          {viewingDocs && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t('aadhaarDocument')}</h3>
                <img src={viewingDocs.aadhaarDoc.getDirectURL()} alt="Aadhaar" className="w-full rounded-md" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('electricityBill')}</h3>
                <img src={viewingDocs.billDoc.getDirectURL()} alt="Bill" className="w-full rounded-md" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('housePhoto')}</h3>
                <img src={viewingDocs.housePhoto.getDirectURL()} alt="House" className="w-full rounded-md" />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
