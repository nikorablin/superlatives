import { useQuery } from 'react-query';
import supabase from './supabaseClient';

const getQuestions = async () => {
  const { data } = await supabase
    .from('questions')
    .select(`
      id,
      text,
      type,
      answers!question (
        id,
        text
      )
    `)
    .order('type')
    .order('text');

  return data;
};

export const useQuestions = () => useQuery('questions', getQuestions);

export default useQuestions;
