import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Complaint } from '../../backend';

interface StatusPieChartProps {
  complaints: Complaint[];
}

export default function StatusPieChart({ complaints }: StatusPieChartProps) {
  const { t } = useLanguage();

  const statusData = [
    { name: 'Pending', value: complaints.filter((c) => c.status === 'pending').length, color: '#eab308' },
    { name: 'In Progress', value: complaints.filter((c) => c.status === 'inProgress').length, color: '#3b82f6' },
    { name: 'Completed', value: complaints.filter((c) => c.status === 'completed').length, color: '#16a34a' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complaint Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
