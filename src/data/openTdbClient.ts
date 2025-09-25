import { useEffect, useState } from 'react';
import type { Questions } from './types';

interface ResponseCode {
  response_code: number; // 0 success; otherwise treat as error/empty
  results: Questions[];
}

function decodeHtml(str: string): string {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&eacute;/g, 'é')
    .replace(/&nbsp;/g, ' ');
}

// amount can vary from 1 to 50
export async function fetchOpenTDB(amount = 50, signal?: AbortSignal): Promise<Questions[]> {
  const url = `https://opentdb.com/api.php?amount=${amount}`;
  try {
    const response = await fetch(url, { signal });
    if (!response.ok){
        throw new Error(`HTTP ${response.status}`);
    }

    const json: ResponseCode = await response.json();
    if (json.response_code !== 0) return [];

    return json.results.map((r): Questions => ({
      type: r.type,
      category: decodeHtml(r.category),
      difficulty: r.difficulty,
      question: decodeHtml(r.question),
      correct_answer: decodeHtml(r.correct_answer),
      incorrect_answers: r.incorrect_answers.map(decodeHtml),
    }));
  } catch (e) {
    console.error (e);
    return [];
  }
}

// React hook to retrieve questions
export function useQuestions(amount = 50) {
  const [data, setData] = useState<Questions[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetchOpenTDB(amount, controller.signal)
      .then(qs => setData(qs))
      .catch(err => setError(err as Error))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [amount]);

  return { data, loading, error } as const;
}