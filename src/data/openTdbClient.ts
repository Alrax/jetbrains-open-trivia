import { useEffect, useState } from 'react';
import type { CategoryCount, Questions } from './types';

// Question fetch response
interface ResponseCode {
  response_code: number; // 0 success; otherwise treat as error/empty
  results: Questions[];
}

// Category list
interface CategoriesApi {
  trivia_categories: Array<{ id: number; name: string }>
}

// Category count
interface GlobalCountsApi {
  categories?: GlobalCategoryCounts
}

type GlobalCategoryCounts = Record<string, { total_num_of_verified_questions: number }>

// Amount can vary from 1 to 50
async function fetchQuestionsList(amount = 50, signal?: AbortSignal): Promise<Questions[]> {
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

async function fetchCategoriesList(signal?: AbortSignal): Promise<Array<{ id: number; name: string }>> {
  const url = 'https://opentdb.com/api_category.php'
  try {
    const res = await fetch(url, { signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json: CategoriesApi = await res.json()
    return json.trivia_categories ?? []
  } catch (e) {
    console.error(e)
    return []
  }
}

async function fetchGlobalCounts(signal?: AbortSignal): Promise<GlobalCategoryCounts> {
  const url = 'https://opentdb.com/api_count_global.php'
  try {
    const res = await fetch(url, { signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json: GlobalCountsApi = await res.json()
    return json.categories ?? {}
  } catch (e) {
    console.error(e)
    return {}
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
    fetchQuestionsList(amount, controller.signal)
      .then(qs => setData(qs))
      .catch(err => setError(err as Error))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [amount]);

  return { data, loading, error } as const;
}

// React hook to retrieve global category counts
export function useGlobalCategoryCounts() {
  const [data, setData] = useState<CategoryCount[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    ;(async () => {
      try {
        const [cats, counts] = await Promise.all([
          fetchCategoriesList(controller.signal),
          fetchGlobalCounts(controller.signal),
        ])

        const rows: CategoryCount[] = cats.map(({ id, name }) => {
          const rec = counts[String(id)]!
          const count = rec.total_num_of_verified_questions
          return { category: decodeHtml(name), count }
        })

        // sort by count desc for stable charts
        rows.sort((a, b) => b.count - a.count)
        setData(rows)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    })()
    return () => controller.abort()
  }, [])

  return { data, loading, error } as const
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