import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '../contexts/LanguageContext';
import { useSubmitComplaint } from '../hooks/useQueries';
import { useGetCallerUserProfile } from '../hooks/useUserProfile';
import { Category } from '../backend';
import { MapPin, Upload } from 'lucide-react';

export default function ReportIssuePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const submitComplaint = useSubmitComplaint();
  const { userProfile } = useGetCallerUserProfile();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [location, setLocation] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name);
      if (userProfile.mobile) {
        setMobile(userProfile.mobile);
      }
    }
  }, [userProfile]);

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
    if (!category) return;

    await submitComplaint.mutateAsync({
      name,
      mobile,
      category: category as Category,
      description,
      photo,
      audio,
      location,
    });

    navigate({ to: '/my-requests' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{t('submitComplaint')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">{t('fullName')} *</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div>
              <Label htmlFor="mobile">{t('mobileNumber')} *</Label>
              <Input id="mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
            </div>

            <div>
              <Label htmlFor="category">{t('complaintCategory')} *</Label>
              <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectCategory')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="garbage">{t('garbage')}</SelectItem>
                  <SelectItem value="streetLight">{t('streetLight')}</SelectItem>
                  <SelectItem value="drainage">{t('drainage')}</SelectItem>
                  <SelectItem value="others">{t('others')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">{t('description')} *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('describeIssue')}
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="photo">{t('uploadPhoto')}</Label>
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
              <Label htmlFor="audio">{t('uploadAudio')}</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="audio"
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudio(e.target.files?.[0] || null)}
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

            <Button type="submit" className="w-full" disabled={submitComplaint.isPending}>
              {submitComplaint.isPending ? t('submitting') : t('submit')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
