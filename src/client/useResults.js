import { useQuery } from 'react-query';
import supabase from './supabaseClient';

const formatResults = (count = 'count') => (acc, r) => {
  acc[r.id] = {
    name: r.question,
    results: [...(acc?.[r.id]?.results || []), { name: r.answer, count: r[count] }],
  };
  return acc;
}

const getResults = async () => {
  const { data } = await supabase
    .from('results')
    .select('*');
  
  const { data: textResults } = await supabase
    .from('text_results')
    .select('*');
  
  const formattedResults = data.reduce(formatResults('total'), {});

  const formattedText = textResults.reduce(formatResults(), {});

  return { radio: formattedResults, text: formattedText };
};

export const useResults = () => useQuery('results', getResults);

export default useResults;
