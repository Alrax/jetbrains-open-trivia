import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import type { Questions } from '@/data/types';

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: '#22c55e',
  medium: '#f59e0b',
  hard: '#ef4444'
};

export function DifficultyDistribution({ data: questions, loading, error }: { data: Questions[]; loading: boolean; error: Error | null }) {
  const order = ['easy', 'medium', 'hard'] as const;
  const difficultyData = order.map(d => ({
    difficulty: d,
    count: questions.filter(q => q.difficulty === d).length,
    color: DIFFICULTY_COLORS[d]
  }));
  const allZero = difficultyData.every(d => d.count === 0);

  return (
    <div className="space-y-6">
      {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-4">Failed to load data: {error.message}</div>}
      {loading && !error && <div className="text-sm text-muted-foreground rounded-md p-4 bg-background/50">Loading difficulty distribution…</div>}
      {!loading && !error && allZero && <div className="text-sm text-muted-foreground rounded-md p-4 bg-background/50">No difficulty data.</div>}
      {!loading && !error && !allZero && (
        <Tabs defaultValue="pie" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pie">Pie Chart</TabsTrigger>
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          </TabsList>
          <TabsContent value="pie">
            <Card>
              <CardHeader><CardTitle>Difficulty Distribution - Pie Chart (from 50 Questions)</CardTitle></CardHeader>
              <CardContent>
                <div className="h-124">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={difficultyData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ percent, payload }) => {
                          interface DifficultyDatum { difficulty?: string }
                          const dp = payload as DifficultyDatum | undefined;
                          const diff = dp?.difficulty ?? '';
                          const pct = (typeof percent === 'number' ? percent * 100 : 0).toFixed(0);
                          return `${diff} (${pct}%)`;
                        }}
                        outerRadius={200}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {difficultyData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="bar">
            <Card>
              <CardHeader><CardTitle>Difficulty Distribution - Bar Chart (from 50 Questions)</CardTitle></CardHeader>
              <CardContent>
                <div className="h-124">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={difficultyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="difficulty" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8">
                        {difficultyData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}