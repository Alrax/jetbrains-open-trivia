import './App.css';
import { NavBar } from './components/NavBar';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { QuestionsList } from '@/components/questions/QuestionsList';

function App() {
  return (
        <Tabs defaultValue="categories" className="w-full gap-0">
          <NavBar />
          <div className="mt-6">
            <TabsContent value="categories" className="space-y-4">
              <QuestionsList />
            </TabsContent>
            <TabsContent value="category-distribution" className="space-y-4">
              
            </TabsContent>
            <TabsContent value="difficulty-distribution" className="space-y-4">
              
            </TabsContent>
          </div>
        </Tabs>
  );
}

export default App;
