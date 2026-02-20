import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAllTrees, useUpdateTreeStatus } from '../../hooks/useQueries';
import { TreePine, MapPin } from 'lucide-react';

export default function TreeManagementPage() {
  const { t } = useLanguage();
  const { data: trees = [] } = useAllTrees();
  const updateTreeStatus = useUpdateTreeStatus();

  const totalTrees = trees.length;
  const survivingTrees = trees.filter((t) => t.survivalStatus).length;
  const survivalRate = totalTrees > 0 ? ((survivingTrees / totalTrees) * 100).toFixed(1) : '0';

  const handleToggleSurvival = async (id: string, currentStatus: boolean) => {
    await updateTreeStatus.mutateAsync({ id, survivalStatus: !currentStatus });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('treeManagement')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{t('totalTrees')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalTrees}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{t('survivingTrees')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{survivingTrees}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{t('treeSurvivalRate')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{survivalRate}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trees.map((tree) => (
          <Card key={tree.id}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TreePine size={20} className="text-green-600" />
                {tree.treeType}
              </CardTitle>
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
                Planted: {new Date(Number(tree.plantedDate) / 1000000).toLocaleDateString()}
              </p>

              <div className="flex items-center justify-between border-t pt-3">
                <Label htmlFor={`survival-${tree.id}`}>{t('survivalStatus')}</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{tree.survivalStatus ? t('surviving') : t('dead')}</span>
                  <Switch
                    id={`survival-${tree.id}`}
                    checked={tree.survivalStatus}
                    onCheckedChange={() => handleToggleSurvival(tree.id, tree.survivalStatus)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
