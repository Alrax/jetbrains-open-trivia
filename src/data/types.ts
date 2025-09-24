export interface Question {
  id: string;
  question: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  answer: string;
}

export interface CategoryData {
  category: string;
  count: number;
  color: string;
}

export interface DifficultyData {
    difficulty: 'Easy' | 'Medium' | 'Hard';
    count: number;
    color: '#22c55e' | '#f59e0b' | '#ef4444';
}