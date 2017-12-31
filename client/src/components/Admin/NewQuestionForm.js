import React, { PureComponent } from 'react';
import './Admin.css';
import { TYPES } from '../../constants/QuestionTypes';

class NewQuestionForm extends PureComponent {
  state = {
    text: '',
    type: TYPES.RADIO,
    answers: []
  }

  updateValue = (key, event) => {
    this.setState({
      [key]: event.target.value
    });
  }

  updateAnswer = (index, event) => {
    this.setState({
      answers: [
        ...this.state.answers.slice(0, index),
        { text: event.target.value },
        ...this.state.answers.slice(index + 1)
      ]
    })
  }

  renderAnswerInput = (answer, index) => {
    return (
      <div className="input-group-inline" key={`answer-${index}`}>
        <input
          tabIndex={index + 1}
          value={answer.text}
          placeholder={`Answer ${index + 1}`}
          onChange={this.updateAnswer.bind(this, index)}
          type="text"
          className="input" />
        <a href="#" tabIndex="-1" onClick={this.removeAnswer.bind(this, index)}>&times;</a>
      </div>
    );
  }

  addAnswer = event => {
    event.preventDefault();
    this.setState({
      answers: [
        ...this.state.answers,
        { text: '' }
      ]
    });
  }

  removeAnswer = (index, event) => {
    event.preventDefault();
    this.setState({
      answers: [
        ...this.state.answers.slice(0, index),
        ...this.state.answers.slice(index + 1)
      ]
    });
  }

  submit = event => {
    event.preventDefault();
    this.props.submit(this.state);
  }

  render() {
    const { text, type, answers } = this.state;
    return (
      <form className="Admin" onSubmit={this.submit}>
        <h2>New Question</h2>
        <div className="input-group">
          <label className="label">Question text</label>
          <input value={text} onChange={this.updateValue.bind(this, 'text')} type="text" className="input" />
        </div>
        <div className="input-group">
          <label className="label">Question Type</label>
          <select value={type} onChange={this.updateValue.bind(this, 'type')} className="input">
            {Object.keys(TYPES).map(key => <option key={key} value={TYPES[key]}>{key}</option>)}
          </select>
        </div>
        { type === TYPES.RADIO && <p><a href="#" onClick={this.addAnswer}>+ Add answer</a></p>}
        {answers.map(this.renderAnswerInput)}
        <button type="submit" className="button">Submit</button>
        <p><a href="#" onClick={this.props.toggle}>Cancel</a></p>
      </form>
    );
  }
}

export default NewQuestionForm;
