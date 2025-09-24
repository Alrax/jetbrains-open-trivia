import { mockQuestions } from '../../data/mockData.ts';
import { Card, CardContent } from '../ui/card.tsx';
import { Badge } from '../ui/badge.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table.tsx';
import { useState, useMemo, useEffect } from 'react';
import { Button } from '../ui/button.tsx';
import { ChevronsUpDown } from 'lucide-react';
import { CategoryCards } from './CategoryCards.tsx';

const DIFFICULTY_ORDER = ['Easy', 'Medium', 'Hard'] as const;

export function QuestionsList() {
    const [sortKey, setSortKey] = useState<'category' | 'difficulty' | null>(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const sortedQuestions = useMemo(() => {
        const base = selectedCategory && selectedCategory !== 'all'
            ? mockQuestions.filter(q => q.category === selectedCategory)
            : mockQuestions;
        if (!sortKey) return [...base];
        return [...base].sort((a, b) => {
            if (sortKey === 'category') {
                const cmp = a.category.localeCompare(b.category);
                return sortDir === 'asc' ? cmp : -cmp;
            }
            // difficulty
            const ai = DIFFICULTY_ORDER.indexOf(a.difficulty as typeof DIFFICULTY_ORDER[number]);
            const bi = DIFFICULTY_ORDER.indexOf(b.difficulty as typeof DIFFICULTY_ORDER[number]);
            const cmp = ai - bi;
            return sortDir === 'asc' ? cmp : -cmp;
        });
    }, [sortKey, sortDir, selectedCategory]);

    // Manual incremental loading state
    const CHUNK_SIZE = 25;
    const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);
    useEffect(() => { setVisibleCount(CHUNK_SIZE); }, [sortKey, sortDir, selectedCategory]);
    const showMore = () => setVisibleCount(v => Math.min(v + CHUNK_SIZE, sortedQuestions.length));
    const allVisible = visibleCount >= sortedQuestions.length;

    const toggleSort = (key: 'category' | 'difficulty') => {
        // Cycle: none -> asc -> desc -> none
        setSortKey(prevKey => {
            if (prevKey !== key) {
                setSortDir('asc');
                return key;
            }
            if (sortDir === 'asc') {
                setSortDir('desc');
                return prevKey;
            }
            if (sortDir === 'desc') {
                setSortDir('asc');
                return null;
            }
            return prevKey;
        });
    };

    const SortIcon = ({ state }: { state: 'none' | 'asc' | 'desc' }) => {
        const active = state !== 'none';
        return (
            <span
                className={
                    'ml-1 inline-flex items-center transition-colors ' +
                    (active ? 'text-primary' : 'text-muted-foreground')
                }
                aria-hidden="true"
            >
                <ChevronsUpDown
                    className={
                        'h-3.5 w-3.5 stroke-[2] ' + (active ? '' : 'opacity-70')
                    }
                />
                <span className="sr-only">
                    {state === 'none' ? 'Not sorted' : state === 'asc' ? 'Sorted ascending' : 'Sorted descending'}
                </span>
            </span>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Left column */}
                <div className="md:w-1/4">
                    <CategoryCards selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
                </div>
                {/* Right column */}
                <div className="md:flex-1">
                    <Card className="h-full border-none shadow-none bg-transparent">
                        <CardContent className="p-0">
                            <div className="pr-1">
                                {!selectedCategory && (
                                    <div className="rounded-md p-10 text-center text-sm text-muted-foreground bg-background/50">
                                        Select a category to see corresponding questions
                                    </div>
                                )}
                                {selectedCategory && (
                                    <div className="overflow-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-12 text-center">#</TableHead>
                                                    <TableHead className="text-center">Question</TableHead>
                                                    <TableHead className="text-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleSort('category')}
                                                            className="inline-flex items-center justify-center w-full hover:underline focus:outline-none"
                                                            aria-sort={sortKey === 'category' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                                                        >
                                                            Category
                                                            <SortIcon state={sortKey === 'category' ? sortDir : 'none'} />
                                                        </button>
                                                    </TableHead>
                                                    <TableHead className="text-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleSort('difficulty')}
                                                            className="inline-flex items-center justify-center w-full hover:underline focus:outline-none"
                                                            aria-sort={sortKey === 'difficulty' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                                                        >
                                                            Difficulty
                                                            <SortIcon state={sortKey === 'difficulty' ? sortDir : 'none'} />
                                                        </button>
                                                    </TableHead>
                                                    <TableHead className="text-center">Answer</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {sortedQuestions.slice(0, visibleCount).map((q, idx) => (
                                                    <TableRow key={q.id}>
                                                        <TableCell className="text-muted-foreground">{idx + 1}</TableCell>
                                                        <TableCell className="whitespace-normal max-w-[260px]">{q.question}</TableCell>
                                                        <TableCell>{q.category}</TableCell>
                                                        <TableCell>
                                                            {q.difficulty === 'Easy' && (
                                                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Easy</Badge>
                                                            )}
                                                            {q.difficulty === 'Medium' && (
                                                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium</Badge>
                                                            )}
                                                            {q.difficulty === 'Hard' && (
                                                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Hard</Badge>
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="whitespace-normal max-w-[200px]">{q.answer}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        <div className="py-4 flex items-center justify-center">
                                            {!allVisible && (
                                                <Button variant="outline" onClick={showMore}>
                                                    Load more ({visibleCount}/{sortedQuestions.length})
                                                </Button>
                                            )}
                                            {allVisible && (
                                                <span className="text-sm text-muted-foreground">All {sortedQuestions.length} questions loaded</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}