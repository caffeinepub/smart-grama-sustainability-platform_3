import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useLanguage } from '../contexts/LanguageContext';
import { useRequestTree } from '../hooks/useQueries';
import { MapPin, Upload } from 'lucide-react';

export default function TreePlantationPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const requestTree = useRequestTree();

  const [treeType, setTreeType] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [location, setLocation] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude},${position.coords.longitude}`);
          setLoadingLocation(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLoadingLocation(false);
        }
      );
    } else {
      setLoadingLocation(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!treeType) return;

    await requestTree.mutateAsync({
      treeType,
      photo,
      location,
    });

    navigate({ to: '/my-requests' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{t('requestTree')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="treeType">{t('treeType')} *</Label>
              <Select value={treeType} onValueChange={setTreeType}>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectTreeType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Neem">{t('neem')}</SelectItem>
                  <SelectItem value="Mango">{t('mango')}</SelectItem>
                  <SelectItem value="Teak">{t('teak')}</SelectItem>
                  <SelectItem value="Banyan">{t('banyan')}</SelectItem>
                  <SelectItem value="Peepal">{t('peepal')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="photo">{t('uploadPlantingPhoto')}</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                />
                <Upload size={20} />
              </div>
            </div>

            <div>
              <Label htmlFor="location">{t('location')}</Label>
              <div className="flex items-center gap-2">
                <Input id="location" value={location} readOnly />
                <MapPin size={20} className="text-green" />
              </div>
              {loadingLocation && <p className="text-sm text-muted-foreground mt-1">Detecting location...</p>}
              {location && <p className="text-sm text-muted-foreground mt-1">{t('autoDetected')}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={requestTree.isPending}>
              {requestTree.isPending ? t('submitting') : t('submit')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
