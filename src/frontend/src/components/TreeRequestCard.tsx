import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tree } from '../backend';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, TreePine } from 'lucide-react';

interface TreeRequestCardProps {
  tree: Tree;
}

export default function TreeRequestCard({ tree }: TreeRequestCardProps) {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <TreePine size={20} className="text-green-600" />
            {tree.treeType}
          </CardTitle>
          <Badge className={tree.survivalStatus ? 'bg-green-600' : 'bg-red-600'}>
            {tree.survivalStatus ? t('surviving') : t('dead')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {tree.photo && (
          <img
            src={tree.photo.getDirectURL()}
            alt="Tree"
            className="w-full h-48 object-cover rounded-md"
          />
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={16} />
          <span>{tree.location}</span>
        </div>

        <p className="text-xs text-muted-foreground">
          {t('submittedOn')}: {new Date(Number(tree.plantedDate) / 1000000).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
