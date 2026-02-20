import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Complaint, Tree, WaterProject, SolarApplication } from '../../backend';

interface MonthlyActivityChartProps {
  complaints: Complaint[];
  trees: Tree[];
  waterProjects: WaterProject[];
  solarApplications: SolarApplication[];
}

export default function MonthlyActivityChart({
  complaints,
  trees,
  waterProjects,
  solarApplications,
}: MonthlyActivityChartProps) {
  const getMonthKey = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  const monthlyData: Record<string, { complaints: number; trees: number; water: number; solar: number }> = {};

  complaints.forEach((c) => {
    const key = getMonthKey(c.createdAt);
    if (!monthlyData[key]) monthlyData[key] = { complaints: 0, trees: 0, water: 0, solar: 0 };
    monthlyData[key].complaints++;
  });

  trees.forEach((t) => {
    const key = getMonthKey(t.plantedDate);
    if (!monthlyData[key]) monthlyData[key] = { complaints: 0, trees: 0, water: 0, solar: 0 };
    monthlyData[key].trees++;
  });

  waterProjects.forEach((w) => {
    const key = getMonthKey(w.createdAt);
    if (!monthlyData[key]) monthlyData[key] = { complaints: 0, trees: 0, water: 0, solar: 0 };
    monthlyData[key].water++;
  });

  solarApplications.forEach((s) => {
    const key = getMonthKey(s.createdAt);
    if (!monthlyData[key]) monthlyData[key] = { complaints: 0, trees: 0, water: 0, solar: 0 };
    monthlyData[key].solar++;
  });

  const chartData = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, data]) => ({
      month,
      Complaints: data.complaints,
      Trees: data.trees,
      Water: data.water,
      Solar: data.solar,
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Activity Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Complaints" stroke="#ef4444" />
            <Line type="monotone" dataKey="Trees" stroke="#22c55e" />
            <Line type="monotone" dataKey="Water" stroke="#3b82f6" />
            <Line type="monotone" dataKey="Solar" stroke="#eab308" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
