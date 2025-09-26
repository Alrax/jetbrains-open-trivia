export interface Questions {
  type: 'multiple' | 'boolean';
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface CategoryData {
  category: string;
  count: number;
  color: string;
}

export interface DifficultyData {
    difficulty: 'easy' | 'medium' | 'hard';
    count: number;
    color: '#22c55e' | '#f59e0b' | '#ef4444';
}

export interface CategoryCount {
  category: string
  count: number
}