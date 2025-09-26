import './App.css';
import { NavBar } from './components/NavBar';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { QuestionsList } from '@/components/questions/QuestionsList';
import { CategoryDistribution } from '@/components/CategoryDistribution';
import { DifficultyDistribution } from '@/components/DifficultyDistribution';
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
              <CategoryDistribution counts={categories.data} loading={categories.loading} error={categories.error} />
            </TabsContent>
            <TabsContent value="difficulty-distribution" className="space-y-4">
              <DifficultyDistribution data={questions.data} loading={questions.loading} error={questions.error} />
            </TabsContent>
          </div>
        </Tabs>
  );
}

export default App;
