import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, TreePine, Droplets, Sun, FileSearch } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: FileText,
      title: t('reportIssue'),
      description: 'Submit complaints with photo, audio & geo-location',
      link: '/report-issue',
      color: 'text-red-600',
    },
    {
      icon: TreePine,
      title: t('tree'),
      description: 'Request tree plantation and track survival',
      link: '/tree',
      color: 'text-green-600',
    },
    {
      icon: Droplets,
      title: t('water'),
      description: 'Apply for rainwater harvesting implementation',
      link: '/water',
      color: 'text-blue-600',
    },
    {
      icon: Sun,
      title: t('solar'),
      description: 'Apply for PM Surya Ghar solar scheme',
      link: '/solar',
      color: 'text-yellow-600',
    },
    {
      icon: FileSearch,
      title: t('schemes'),
      description: 'Explore all government schemes',
      link: '/schemes',
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen">
      <div
        className="relative bg-cover bg-center h-96"
        style={{ backgroundImage: 'url(/assets/generated/hero-banner.dim_1200x400.png)' }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('smartGrama')}</h1>
            <p className="text-xl md:text-2xl mb-6">{t('tagline')}</p>
            <Link to="/report-issue">
              <Button size="lg" className="bg-saffron hover:bg-saffron/90">
                {t('reportIssue')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link key={feature.link} to={feature.link}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <feature.icon className={`h-12 w-12 ${feature.color} mb-2`} />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
