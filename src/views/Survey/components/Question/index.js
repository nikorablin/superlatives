import React, { useState } from 'react';
import titleize from 'titleize';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import TYPES from '../../../../constants/questionType';

const Question = ({ id, text, type, answers, submit, surveyId }) => {
  const [input, setInput] = useState('');

  const validateAndSubmit = (evt) => {
    evt.preventDefault();
    if (type === TYPES.TEXT && input.length < 3) {
      return;
    }
    setInput('');
    const answer = type === TYPES.RADIO ? evt.target.value : undefined;
    submit({ question: id, survey: surveyId, text: input, answer });
  }
  
  return (
    <form onSubmit={validateAndSubmit}>
      <label className="mb-8 text-3xl block font-serif">{text}{type === TYPES.RADIO && ' is the...'}</label>
      {type === TYPES.TEXT &&
        <> 
          <Input
            placeholder={text}
            value={input}
            onChange={evt => setInput(evt.target.value)}
          />
          <Button type="submit">Next</Button>
        </>
      }
      {
        type === TYPES.RADIO &&
        answers.map(a => <Button key={a.id} onClick={validateAndSubmit} className="mb-4" type="button" value={a.id}>{titleize(a.text)}</Button>)
      }
    </form>
  );
};

export default Question;
