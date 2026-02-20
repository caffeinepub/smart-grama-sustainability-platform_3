import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useLanguage } from '../contexts/LanguageContext';
import { useRequestWaterProject } from '../hooks/useQueries';
import { Upload } from 'lucide-react';

export default function WaterHarvestingPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const requestWaterProject = useRequestWaterProject();

  const [landPhoto, setLandPhoto] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!landPhoto) return;

    await requestWaterProject.mutateAsync({ landPhoto });
    navigate({ to: '/my-requests' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{t('requestWaterProject')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="landPhoto">{t('uploadLandPhoto')} *</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="landPhoto"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLandPhoto(e.target.files?.[0] || null)}
                  required
                />
                <Upload size={20} />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={requestWaterProject.isPending}>
              {requestWaterProject.isPending ? t('submitting') : t('submit')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
