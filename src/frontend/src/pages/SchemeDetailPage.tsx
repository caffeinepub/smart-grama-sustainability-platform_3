import { useParams, Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { schemes } from '../data/schemes';

export default function SchemeDetailPage() {
  const { schemeId } = useParams({ from: '/schemes/$schemeId' });
  const { t } = useLanguage();

  const scheme = schemes.find((s) => s.id === schemeId);

  if (!scheme) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">Scheme not found</p>
            <Link to="/schemes">
              <Button variant="link" className="mt-4">
                {t('backToSchemes')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/schemes">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft size={16} className="mr-2" />
          {t('backToSchemes')}
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{scheme.name}</CardTitle>
          <p className="text-muted-foreground">{scheme.ministry}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">{t('description')}</h3>
            <p className="text-muted-foreground">{scheme.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">{t('eligibility')}</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {scheme.eligibility.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">{t('benefits')}</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {scheme.benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">{t('applicationProcess')}</h3>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              {scheme.applicationProcess.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">{t('requiredDocuments')}</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {scheme.documents.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">{t('contactDetails')}</h3>
            <p className="text-muted-foreground">{scheme.contact}</p>
          </div>

          {scheme.website && (
            <div>
              <h3 className="text-xl font-semibold mb-2">{t('officialWebsite')}</h3>
              <a href={scheme.website} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  {t('visitWebsite')}
                  <ExternalLink size={16} className="ml-2" />
                </Button>
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
