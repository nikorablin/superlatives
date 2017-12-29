import React, { PureComponent } from 'react';
import './Question.css';
import Answer from '../Answer';

export default class Question extends PureComponent {
  renderAnswer = answer => {
    return (
      <li key={answer.id}><Answer answer={answer} onClick={this.handleClick} /></li>
    );
  }

  handleClick = answerId => {
    this.props.submit(this.props.question.id, answerId);
  }

  render() {
    const { question } = this.props;
    return (
      <div>
        <h2>{question.text}</h2>
        <ul className="Answers">
          {question.answers.map(this.renderAnswer)}
        </ul>
      </div>
    )
  }
}
