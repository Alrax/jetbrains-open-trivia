import { BarChart3, List, PieChart, BookOpen } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function NavBar() {
  return (
    <div className="w-full">
      <div className="mb-5 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
            <BookOpen className="h-5 w-5" />
          </span>
          <h1 className="text-2xl font-semibold tracking-tight">Open Trivia Visualiser</h1>
        </div>
        <ul className="text-sm text-muted-foreground leading-relaxed max-w-2xl list-disc list-inside text-left">
          <li>Explore a list of questions sortable by category and difficulty.</li>
          <li>View distributions of questions by category or difficulty.</li>
          <li>Answer a few trivia questions while you're here!</li>
        </ul>
      </div>
    <TabsList className="grid w-full grid-cols-3 relative overflow-hidden rounded-md border bg-muted/40 p-1 backdrop-blur supports-[backdrop-filter]:bg-muted/30">
      <TabsTrigger value="categories" className="flex items-center gap-2">
        <List className="h-4 w-4" />
        Questions
      </TabsTrigger>
      <TabsTrigger value="category-distribution" className="flex items-center gap-2">
        <PieChart className="h-4 w-4" />
        Categories
      </TabsTrigger>
      <TabsTrigger value="difficulty-distribution" className="flex items-center gap-2">
        <BarChart3 className="h-4 w-4" />
        Difficulties
      </TabsTrigger>
    </TabsList>
    </div>
  );
}
