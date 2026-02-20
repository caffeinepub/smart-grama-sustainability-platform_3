import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{t('aboutTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <img
            src="/assets/generated/hero-banner.dim_1200x400.png"
            alt="Smart Grama"
            className="w-full rounded-lg"
          />

          <div>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              Smart Grama is a comprehensive digital platform designed to bridge the gap between citizens and their
              Panchayat administration. Our mission is to enable transparent, efficient, and sustainable development
              in rural areas through technology.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Complaint Management System with photo, audio, and geo-location tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Tree Plantation Tracking with survival rate monitoring</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Rainwater Harvesting Project Management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Solar Scheme Applications integrated with PM Surya Ghar Yojana</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Comprehensive Analytics Dashboard for administrators</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Bilingual support (English and Telugu)</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Impact</h2>
            <p className="text-muted-foreground leading-relaxed">
              By digitizing Panchayat operations, Smart Grama empowers citizens to actively participate in local
              governance while enabling administrators to track, manage, and measure the impact of sustainability
              initiatives. Together, we're building greener, more sustainable communities.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
