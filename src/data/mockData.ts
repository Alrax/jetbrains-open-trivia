import type { Question } from './types.ts';

export const mockQuestions: Question[] = [
  // Sport questions
  { id: '1', question: 'Which country has won the most FIFA World Cups?', category: 'Sport', difficulty: 'Medium', answer: 'Brazil' },
  { id: '2', question: 'How many players are on a basketball team on the court?', category: 'Sport', difficulty: 'Easy', answer: '5' },
  { id: '3', question: 'What is the maximum score possible in ten-pin bowling?', category: 'Sport', difficulty: 'Hard', answer: '300' },
  { id: '4', question: 'Which sport is known as "The Sport of Kings"?', category: 'Sport', difficulty: 'Medium', answer: 'Horse Racing' },
  { id: '5', question: 'In which year were the first modern Olympic Games held?', category: 'Sport', difficulty: 'Hard', answer: '1896' },
  { id: '6', question: 'How many holes are played in a standard round of golf?', category: 'Sport', difficulty: 'Easy', answer: '18' },
  
  // Science questions
  { id: '7', question: 'What is the chemical symbol for gold?', category: 'Science', difficulty: 'Easy', answer: 'Au' },
  { id: '8', question: 'What is the speed of light in a vacuum?', category: 'Science', difficulty: 'Hard', answer: '299,792,458 m/s' },
  { id: '9', question: 'How many bones are in the adult human body?', category: 'Science', difficulty: 'Medium', answer: '206' },
  { id: '10', question: 'What gas makes up about 78% of Earth\'s atmosphere?', category: 'Science', difficulty: 'Medium', answer: 'Nitrogen' },
  { id: '11', question: 'What is the smallest unit of matter?', category: 'Science', difficulty: 'Easy', answer: 'Atom' },
  { id: '12', question: 'What is the hardest natural substance on Earth?', category: 'Science', difficulty: 'Easy', answer: 'Diamond' },
  { id: '13', question: 'What is the pH of pure water?', category: 'Science', difficulty: 'Medium', answer: '7' },
  { id: '14', question: 'What particle has no electric charge?', category: 'Science', difficulty: 'Hard', answer: 'Neutron' },
  
  // History questions
  { id: '15', question: 'In which year did World War II end?', category: 'History', difficulty: 'Easy', answer: '1945' },
  { id: '16', question: 'Who was the first person to walk on the moon?', category: 'History', difficulty: 'Easy', answer: 'Neil Armstrong' },
  { id: '17', question: 'Which ancient wonder of the world was located in Alexandria?', category: 'History', difficulty: 'Hard', answer: 'Lighthouse of Alexandria' },
  { id: '18', question: 'Who was the first President of the United States?', category: 'History', difficulty: 'Easy', answer: 'George Washington' },
  { id: '19', question: 'In which year did the Berlin Wall fall?', category: 'History', difficulty: 'Medium', answer: '1989' },
  { id: '20', question: 'Which empire was ruled by Julius Caesar?', category: 'History', difficulty: 'Medium', answer: 'Roman Empire' },
  { id: '21', question: 'What year did the Titanic sink?', category: 'History', difficulty: 'Medium', answer: '1912' },
  
  // Geography questions
  { id: '22', question: 'What is the capital of Australia?', category: 'Geography', difficulty: 'Medium', answer: 'Canberra' },
  { id: '23', question: 'Which is the longest river in the world?', category: 'Geography', difficulty: 'Easy', answer: 'Nile River' },
  { id: '24', question: 'What is the smallest country in the world?', category: 'Geography', difficulty: 'Medium', answer: 'Vatican City' },
  { id: '25', question: 'Which mountain range contains Mount Everest?', category: 'Geography', difficulty: 'Easy', answer: 'Himalayas' },
  { id: '26', question: 'How many continents are there?', category: 'Geography', difficulty: 'Easy', answer: '7' },
  
  // Literature questions
  { id: '27', question: 'Who wrote "Romeo and Juliet"?', category: 'Literature', difficulty: 'Easy', answer: 'William Shakespeare' },
  { id: '28', question: 'What is the first book in the Harry Potter series?', category: 'Literature', difficulty: 'Easy', answer: 'Harry Potter and the Philosopher\'s Stone' },
  { id: '29', question: 'Who wrote "1984"?', category: 'Literature', difficulty: 'Medium', answer: 'George Orwell' },
  { id: '30', question: 'Which novel begins with "Call me Ishmael"?', category: 'Literature', difficulty: 'Hard', answer: 'Moby Dick' },
];

export const categories = ['Sport', 'Science', 'History', 'Geography', 'Literature'] as const;

// Central difficulty metadata (color stable across all visualisations)
export const difficulties = [
  { difficulty: 'Easy', color: '#22c55e' },
  { difficulty: 'Medium', color: '#f59e0b' },
  { difficulty: 'Hard', color: '#ef4444' }
] as const;