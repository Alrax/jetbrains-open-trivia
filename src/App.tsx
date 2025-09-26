import './App.css';
import { NavBar } from './components/NavBar';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { QuestionsList } from '@/components/questions/QuestionsList';
import { lazy, Suspense } from 'react';
const CategoryDistribution = lazy(() => import('@/components/CategoryDistribution').then(m => ({ default: m.CategoryDistribution })));
const DifficultyDistribution = lazy(() => import('@/components/DifficultyDistribution').then(m => ({ default: m.DifficultyDistribution })));
import { useQuestions, useGlobalCategoryCounts } from '@/data/openTdbClient';

function App() {
  // Fetch once at the top level and pass down to tabs
  const questions = useQuestions(50);
  const categories = useGlobalCategoryCounts();

  return (
        <Tabs defaultValue="questions" className="w-full gap-0">
          <NavBar />
          <div className="mt-6">
            <TabsContent value="questions" className="space-y-4">
              <QuestionsList data={questions.data} loading={questions.loading} error={questions.error} />
            </TabsContent>
            <TabsContent value="category-distribution" className="space-y-4">
              <Suspense fallback={<div className="text-sm text-muted-foreground">Loading chart…</div>}>
                <CategoryDistribution counts={categories.data} loading={categories.loading} error={categories.error} />
              </Suspense>
            </TabsContent>
            <TabsContent value="difficulty-distribution" className="space-y-4">
              <Suspense fallback={<div className="text-sm text-muted-foreground">Loading chart…</div>}>
                <DifficultyDistribution data={questions.data} loading={questions.loading} error={questions.error} />
              </Suspense>
            </TabsContent>
          </div>
        </Tabs>
  );
}

export default App;
