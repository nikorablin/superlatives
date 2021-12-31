import React, { useEffect, useState } from 'react';
import useQuestions from '../../client/useQuestions';
import useSurvey from '../../client/useSurvey';
import Spinner from '../../components/Spinner';
import Question from './components/Question';
import Input from '../../components/Input';
import Button from '../../components/Button';

function Survey() {
  const [name, setName] = useState('');
  const { isLoading, data: questions } = useQuestions();
  const { surveyIsLoading, upsertSurvey, submitAnswer, survey } = useSurvey();

  useEffect(() => {
    upsertSurvey();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const validateAndSubmit = (evt) => {
    evt.preventDefault();
    if (name.length < 3) {
      return;
    }
    upsertSurvey({ name, id: survey.id });
  }

  if (isLoading || surveyIsLoading) {
    return <Spinner />
  }

  if (!survey.name)  {
    return (
      <>
        <h1 className="m-8 font-serif text-center text-rose-600 text-3xl font-bold">
          NYE Superlatives
        </h1>
        <form onSubmit={validateAndSubmit}>
          <label className="block mb-2 font-bold">Enter your name</label>
          <Input
            value={name}
            onChange={evt => setName(evt.target.value)}
            placeholder="First and last name"
          />
          <Button>Get Started</Button>
        </form>
      </>
    );
  }
    
  if (survey.question >= questions.length) {
    return (
      <h1 className="m-8 font-serif text-center text-rose-600 text-3xl font-bold">
        Stay tuned for the results!
      </h1>
    )
  }

  return (
    <Question
      {...questions[survey.question]}
      surveyId={survey.id}
      submit={submitAnswer}
    />
  );
}

export default Survey;
