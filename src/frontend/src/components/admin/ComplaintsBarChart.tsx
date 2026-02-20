import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Complaint } from '../../backend';

interface ComplaintsBarChartProps {
  complaints: Complaint[];
}

export default function ComplaintsBarChart({ complaints }: ComplaintsBarChartProps) {
  const { t } = useLanguage();

  const categoryData = [
    { name: t('garbage'), count: complaints.filter((c) => c.category === 'garbage').length },
    { name: t('streetLight'), count: complaints.filter((c) => c.category === 'streetLight').length },
    { name: t('drainage'), count: complaints.filter((c) => c.category === 'drainage').length },
    { name: t('others'), count: complaints.filter((c) => c.category === 'others').length },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complaints by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="oklch(var(--chart-1))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
