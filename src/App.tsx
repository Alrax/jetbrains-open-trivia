import './App.css';
import { NavBar } from './components/NavBar';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { QuestionsList } from '@/components/questions/QuestionsList';
import { CategoryDistribution } from '@/components/CategoryDistribution';
import { DifficultyDistribution } from '@/components/DifficultyDistribution';

function App() {
  return (
        <Tabs defaultValue="questions" className="w-full gap-0">
          <NavBar />
          <div className="mt-6">
            <TabsContent value="questions" className="space-y-4">
              <QuestionsList />
            </TabsContent>
            <TabsContent value="category-distribution" className="space-y-4">
              <CategoryDistribution />
            </TabsContent>
            <TabsContent value="difficulty-distribution" className="space-y-4">
              <DifficultyDistribution />
            </TabsContent>
          </div>
        </Tabs>
  );
}

export default App;
