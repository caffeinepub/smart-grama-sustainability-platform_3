import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAllComplaints, useUpdateComplaintStatus } from '../../hooks/useQueries';
import ComplaintCard from '../../components/ComplaintCard';
import StatusBadge from '../../components/StatusBadge';
import { Status, Category } from '../../backend';

export default function ComplaintsManagementPage() {
  const { t } = useLanguage();
  const { data: complaints = [] } = useAllComplaints();
  const updateStatus = useUpdateComplaintStatus();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<Status>('pending' as Status);
  const [workerName, setWorkerName] = useState('');

  const filteredComplaints = complaints.filter((c) =>
    filterCategory === 'all' ? true : c.category === filterCategory
  );

  const handleUpdateStatus = async (id: string) => {
    await updateStatus.mutateAsync({
      id,
      status: newStatus,
      assignedWorker: workerName || null,
    });
    setEditingId(null);
    setWorkerName('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('complaintsManagement')}</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t('filterByCategory')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allCategories')}</SelectItem>
              <SelectItem value="garbage">{t('garbage')}</SelectItem>
              <SelectItem value="streetLight">{t('streetLight')}</SelectItem>
              <SelectItem value="drainage">{t('drainage')}</SelectItem>
              <SelectItem value="others">{t('others')}</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComplaints.map((complaint) => (
          <Card key={complaint.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">
                  {complaint.category === 'garbage'
                    ? t('garbage')
                    : complaint.category === 'streetLight'
                      ? t('streetLight')
                      : complaint.category === 'drainage'
                        ? t('drainage')
                        : t('others')}
                </CardTitle>
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

              <p className="text-xs text-muted-foreground">
                {t('submittedOn')}: {new Date(Number(complaint.createdAt) / 1000000).toLocaleDateString()}
              </p>

              {editingId === complaint.id ? (
                <div className="space-y-3 border-t pt-3">
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
                  <div>
                    <Label>{t('workerName')}</Label>
                    <Input
                      value={workerName}
                      onChange={(e) => setWorkerName(e.target.value)}
                      placeholder={t('assignWorker')}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleUpdateStatus(complaint.id)}>
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
                    setEditingId(complaint.id);
                    setNewStatus(complaint.status);
                    setWorkerName(complaint.assignedWorker || '');
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
