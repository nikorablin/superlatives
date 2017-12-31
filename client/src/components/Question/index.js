import React, { PureComponent } from 'react';
import './Question.css';
import Answer from '../Answer';
import { TYPES } from '../../constants/QuestionTypes';

export default class Question extends PureComponent {
  state = {
    value: ''
  }

  renderAnswer = answer => {
    return (
      <li key={answer.id}><Answer answer={answer} onClick={this.handleClick} /></li>
    );
  }

  next = event => {
    event.preventDefault();
    if (this.state.value.length < 1) {
      return;
    }
    this.setState({
      value: ''
    });
    this.props.submit(this.props.question._id, null, this.state.value);
  }

  handleClick = answerId => {
    this.props.submit(this.props.question._id, answerId);
  }

  onChange = event => {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    const { question } = this.props;
    return (
      <div>
        <h2>{question.text}</h2>
        { question.type === TYPES.RADIO &&
        <ul className="Answers">
          {question.answers.map(this.renderAnswer)}
        </ul>
        }
        { question.type === TYPES.TEXT &&
          <form className="form" onSubmit={this.next}>
            <input type="text" className="input" placeholder="Full Name" value={this.state.value} onChange={this.onChange} />
            <button type="submit" className="button">Next</button>
          </form>
        }
      </div>
    )
  }
}
