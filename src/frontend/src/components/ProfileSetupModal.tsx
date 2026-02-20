import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useUserProfile';
import { useSaveUserProfile } from '../hooks/useQueries';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';

export default function ProfileSetupModal() {
  const { identity } = useInternetIdentity();
  const { userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const saveProfile = useSaveUserProfile();
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error(t('nameRequired'));
      return;
    }

    try {
      await saveProfile.mutateAsync({
        name: name.trim(),
        mobile: mobile.trim() || undefined,
        role: 'Citizen',
      });
      toast.success(t('profileSaved'));
    } catch (error) {
      console.error('Profile save error:', error);
      toast.error(t('profileSaveError'));
    }
  };

  return (
    <Dialog open={showProfileSetup} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{t('welcomeToSmartGrama')}</DialogTitle>
          <DialogDescription>{t('setupProfileMessage')}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">{t('fullName')} *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('enterYourName')}
              required
            />
          </div>
          <div>
            <Label htmlFor="mobile">{t('mobileNumber')}</Label>
            <Input
              id="mobile"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder={t('enterMobileNumber')}
            />
          </div>
          <Button type="submit" className="w-full" disabled={saveProfile.isPending}>
            {saveProfile.isPending ? t('saving') : t('continue')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
