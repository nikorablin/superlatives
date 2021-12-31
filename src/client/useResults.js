import { useQuery } from 'react-query';
import supabase from './supabaseClient';

const getResults = async () => {
  const { data } = await supabase
    .from('results')
    .select('*');
  
  const { data: textResults } = await supabase
    .from('text_results')
    .select('*');
  
  const formattedResults = data.reduce((acc, r) => {
    acc[r.id] = {
      name: r.question,
      result: [...(acc?.[r.id]?.result.split(', ') || []), `${r.answer}: ${r.total}`].join(', '),
    };
    return acc;
  }, {});

  const formattedText = textResults.reduce((acc, r) => {
    acc[r.id] = {
      name: r.question,
      results: [...(acc?.[r.id]?.results || []), { name: r.answer, count: r.count }],
    };
    return acc;
  }, {});

  return { radio: formattedResults, text: formattedText };
};

export const useResults = () => useQuery('results', getResults);

export default useResults;
