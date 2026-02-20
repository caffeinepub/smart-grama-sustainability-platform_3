import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, TreePine, Droplets, Sun } from 'lucide-react';
import type { Complaint, Tree, WaterProject, SolarApplication } from '../../backend';

interface RecentActivityFeedProps {
  complaints: Complaint[];
  trees: Tree[];
  waterProjects: WaterProject[];
  solarApplications: SolarApplication[];
}

type Activity = {
  type: 'complaint' | 'tree' | 'water' | 'solar';
  timestamp: bigint;
  description: string;
};

export default function RecentActivityFeed({
  complaints,
  trees,
  waterProjects,
  solarApplications,
}: RecentActivityFeedProps) {
  const activities: Activity[] = [
    ...complaints.map((c) => ({
      type: 'complaint' as const,
      timestamp: c.createdAt,
      description: `New complaint: ${c.category}`,
    })),
    ...trees.map((t) => ({
      type: 'tree' as const,
      timestamp: t.plantedDate,
      description: `Tree planted: ${t.treeType}`,
    })),
    ...waterProjects.map((w) => ({
      type: 'water' as const,
      timestamp: w.createdAt,
      description: 'New water project request',
    })),
    ...solarApplications.map((s) => ({
      type: 'solar' as const,
      timestamp: s.createdAt,
      description: 'New solar application',
    })),
  ];

  const sortedActivities = activities.sort((a, b) => Number(b.timestamp - a.timestamp)).slice(0, 10);

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'complaint':
        return <FileText size={16} className="text-red-600" />;
      case 'tree':
        return <TreePine size={16} className="text-green-600" />;
      case 'water':
        return <Droplets size={16} className="text-blue-600" />;
      case 'solar':
        return <Sun size={16} className="text-yellow-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {sortedActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                <div className="mt-1">{getIcon(activity.type)}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(Number(activity.timestamp) / 1000000).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
