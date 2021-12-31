import { useState } from 'react';
import { useMutation } from 'react-query';
import lsClient from './localStorageClient';
import supabase from './supabaseClient';

const getSurvey = (setQuestion, surveyId) => async ({ name, id } = {}) => {
  if (name || !surveyId) {
    const { data: [survey], error } = await supabase
    .from('surveys')
    .upsert({
      id: id || surveyId,
      name,
    });
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return;
    }
    lsClient.setValue('surveyId', survey?.id);
    return { id: survey?.id, name };
  }
  const { data: userSurvey } = await supabase
    .from('surveys')
    .select(`
      id,
      name,
      survey_answers (
        id
      )
    `)
    .eq('id', surveyId)
    .single();
  setQuestion(prevQuestion => Math.max(prevQuestion, userSurvey.survey_answers.length));
  return { id: userSurvey?.id, name: userSurvey.name };
};

const submitAnswer = setQuestion => async ({ question, survey, answer, text }) => {
  setQuestion(prevQuestion => prevQuestion + 1);
  await supabase
    .from('survey_answers')
    .insert([{
      question,
      survey,
      answer,
      text,
    }]);
}

export const useSurvey = () => {
  const surveyId = Number(lsClient.getValue('surveyId')) || undefined;
  const [question, setQuestion] = useState(0);
  const { mutate: upsertSurvey, isLoading, data = {} } = useMutation(getSurvey(setQuestion, surveyId));

  return {
    upsertSurvey,
    submitAnswer: submitAnswer(setQuestion),
    surveyIsLoading: isLoading,
    survey: { ...data, question },
  }
};

export default useSurvey;
