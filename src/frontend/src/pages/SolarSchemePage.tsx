import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useLanguage } from '../contexts/LanguageContext';
import { useSubmitSolarApplication } from '../hooks/useQueries';
import { Upload } from 'lucide-react';

export default function SolarSchemePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const submitSolarApplication = useSubmitSolarApplication();

  const [aadhaarDoc, setAadhaarDoc] = useState<File | null>(null);
  const [billDoc, setBillDoc] = useState<File | null>(null);
  const [housePhoto, setHousePhoto] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aadhaarDoc || !billDoc || !housePhoto) return;

    await submitSolarApplication.mutateAsync({ aadhaarDoc, billDoc, housePhoto });
    navigate({ to: '/my-requests' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{t('applySolarScheme')}</CardTitle>
          <CardDescription>{t('solarSchemeInfo')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="aadhaar">{t('uploadAadhaar')} *</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="aadhaar"
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => setAadhaarDoc(e.target.files?.[0] || null)}
                  required
                />
                <Upload size={20} />
              </div>
            </div>

            <div>
              <Label htmlFor="bill">{t('uploadElectricityBill')} *</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="bill"
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => setBillDoc(e.target.files?.[0] || null)}
                  required
                />
                <Upload size={20} />
              </div>
            </div>

            <div>
              <Label htmlFor="house">{t('uploadHousePhoto')} *</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="house"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setHousePhoto(e.target.files?.[0] || null)}
                  required
                />
                <Upload size={20} />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={submitSolarApplication.isPending}>
              {submitSolarApplication.isPending ? t('submitting') : t('submit')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
