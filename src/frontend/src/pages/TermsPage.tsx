import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{t('termsTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Smart Grama platform, you accept and agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">2. User Responsibilities</h2>
            <p>
              Users are responsible for providing accurate information when submitting complaints, requests, or
              applications. False or misleading information may result in rejection of your submission and potential
              legal consequences.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">3. Service Scope</h2>
            <p>
              Smart Grama is a digital platform for facilitating communication between citizens and Panchayat
              administration. The platform does not guarantee resolution of complaints or approval of applications,
              which remain subject to Panchayat policies and available resources.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">4. Content Guidelines</h2>
            <p>
              Users must not upload offensive, defamatory, or illegal content. All submissions should be relevant to
              Panchayat services and sustainability initiatives. The administration reserves the right to remove
              inappropriate content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">5. Intellectual Property</h2>
            <p>
              The Smart Grama platform, including its design, features, and content, is protected by intellectual
              property rights. Users may not copy, modify, or distribute platform content without authorization.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">6. Limitation of Liability</h2>
            <p>
              Smart Grama and its administrators are not liable for any delays, failures, or issues arising from the
              use of this platform. The platform is provided "as is" without warranties of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">7. Governing Law</h2>
            <p>
              These terms are governed by the laws of India. Any disputes arising from the use of Smart Grama shall be
              subject to the jurisdiction of local courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">8. Modifications</h2>
            <p>
              We reserve the right to modify these terms at any time. Users will be notified of significant changes,
              and continued use of the platform constitutes acceptance of modified terms.
            </p>
          </section>

          <p className="text-sm mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </CardContent>
      </Card>
    </div>
  );
}
