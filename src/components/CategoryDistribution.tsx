import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import type { CategoryCount } from '@/data/types';

export function CategoryDistribution({ counts, loading, error }: { counts: CategoryCount[]; loading: boolean; error: Error | null }) {
  const categoryData = counts.map((row, index) => ({
    category: row.category,
    count: row.count,
    color: `hsl(${(index * 60) % 360}, 70%, 50%)`,
  }));

  // Shorten long category labels for the X axis to save vertical space
  const shorten = (label: string) => (label?.length > 14 ? `${label.slice(0, 14)}…` : label);

  return (
    <div className="space-y-6">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-4">Failed to load data: {error.message}</div>
      )}
      {loading && !error && (
        <div className="text-sm text-muted-foreground rounded-md p-4 bg-background/50">Loading category distribution…</div>
      )}
      {!loading && !error && categoryData.length === 0 && (
        <div className="text-sm text-muted-foreground rounded-md p-4 bg-background/50">No category data.</div>
      )}
      {!loading && !error && categoryData.length > 0 && (
        <Tabs defaultValue="pie" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pie">Pie Chart</TabsTrigger>
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          </TabsList>
          <TabsContent value="pie">
            <Card>
              <CardHeader>
                <CardTitle>Category Distribution - Pie Chart (from full database)</CardTitle>
              </CardHeader>
              <CardContent className="h-124">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ percent, payload }) => {
                          interface CategoryDatum { category?: string }
                          const dataPoint = payload as CategoryDatum | undefined;
                          const category = dataPoint?.category ?? '';
                          const numericPercent = typeof percent === 'number' ? percent : 0;
                          const pct = (numericPercent * 100).toFixed(0);
                          return `${category} (${pct}%)`;
                        }}
                        outerRadius={200}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="bar">
            <Card>
              <CardHeader>
                <CardTitle>Category Distribution - Bar Chart (from full database)</CardTitle>
              </CardHeader>
              <CardContent className='h-124'>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="category"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tickMargin={6}
                        interval="preserveStartEnd"
                        tick={{ fontSize: 11 }}
                        tickFormatter={shorten}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8">
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}