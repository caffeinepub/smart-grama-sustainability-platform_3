import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{t('privacyPolicyTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">1. Information Collection</h2>
            <p>
              Smart Grama collects personal information including name, mobile number, and location data when you
              submit complaints, requests, or applications through our platform. We also collect uploaded documents
              and media files as part of your submissions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">2. Use of Information</h2>
            <p>
              The information collected is used solely for processing your requests, tracking sustainability
              initiatives, and improving Panchayat services. Your data helps administrators assign workers, monitor
              progress, and generate analytics for better governance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">3. Data Storage and Security</h2>
            <p>
              All data is stored securely on the Internet Computer blockchain. We implement industry-standard security
              measures to protect your information from unauthorized access, alteration, or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">4. Data Sharing</h2>
            <p>
              Your personal information is shared only with authorized Panchayat administrators for the purpose of
              processing your requests. We do not sell or share your data with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">5. Your Rights</h2>
            <p>
              You have the right to access, update, or request deletion of your personal information. Contact your
              local Panchayat office for any privacy-related concerns or requests.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">6. Updates to Privacy Policy</h2>
            <p>
              This privacy policy may be updated periodically. Continued use of Smart Grama after changes indicates
              your acceptance of the updated policy.
            </p>
          </section>

          <p className="text-sm mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </CardContent>
      </Card>
    </div>
  );
}
