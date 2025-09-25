import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useCallback, memo } from 'react';
import type { Questions } from '../../data/types';

interface CategoryCardsProps {
  questions: Questions[];
  loading?: boolean;
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
}

// Helper functions kept pure (no hooks) so they can be reused / tested.
const getCategoryCount = (questions: Questions[], category: string) =>
  questions.filter(q => q.category === category).length;

const getDifficultyBreakdown = (questions: Questions[], category: string) => {
  const categoryQuestions = questions.filter(q => q.category === category);
  return {
    easy: categoryQuestions.filter(q => q.difficulty === 'easy').length,
    medium: categoryQuestions.filter(q => q.difficulty === 'medium').length,
    hard: categoryQuestions.filter(q => q.difficulty === 'hard').length,
  };
};

export const CategoryCards = memo(function CategoryCards({ questions, loading, selectedCategory, onSelect }: CategoryCardsProps) {
  const categories = Array.from(new Set(questions.map(q => q.category))).sort();
  const handleToggle = useCallback((category: string) => {
    onSelect(selectedCategory === category ? null : category);
  }, [onSelect, selectedCategory]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs px-1 gap-2">
        Filtering : {selectedCategory}
        {selectedCategory && selectedCategory !== 'all' && (
          <Button size="sm" variant="ghost" className="h-6 px-2" onClick={() => onSelect(null)}>Clear</Button>
        )}
        {!selectedCategory && (
          <Button size="sm" variant="ghost" className="h-6 px-2" onClick={() => onSelect('all')}>All</Button>
        )}
        {selectedCategory === 'all' && (
          <Button size="sm" variant="ghost" className="h-6 px-2" onClick={() => onSelect(null)}>Hide</Button>
        )}
      </div>
      {loading && (
        <div className="text-xs text-muted-foreground px-2 py-1">Loading categories…</div>
      )}
      {!loading && categories.map(category => {
        const count = getCategoryCount(questions, category);
  const breakdown = getDifficultyBreakdown(questions, category);
        return (
          <Card
            key={category}
            onClick={() => handleToggle(category)}
            role="button"
            aria-pressed={selectedCategory === category}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggle(category); } }}
            className={
              'cursor-pointer hover:outline hover:outline-primary focus:ring-2 focus:ring-primary/50 ' +
              (selectedCategory === category ? 'border-primary ring-1 ring-primary/40' : '')
            }
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-sm font-semibold leading-snug line-clamp-2">{category}</CardTitle>
                <Badge variant="secondary" className="text-[10px] h-5 px-2 font-normal whitespace-nowrap">{count}</Badge>
              </div>
            </CardHeader>
            <CardContent className="py-1 pb-0 pt-0">
              <div className="flex flex-wrap items-center gap-1 text-[10px] leading-tight">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-1 py-0.5 font-normal">Easy : {breakdown.easy}</Badge>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 px-1 py-0.5 font-normal">Medium : {breakdown.medium}</Badge>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 px-1 py-0.5 font-normal">Hard : {breakdown.hard}</Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
});

CategoryCards.displayName = 'CategoryCards';

export default CategoryCards;