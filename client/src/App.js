import React, { PureComponent } from 'react';
import './App.css';
import Question from './Question';
import Api from './api';

class App extends PureComponent {
  state = {
    surveyId: null,
    name: '',
    error: null,
    questionIndex: 0,
    complete: false
  }

  questions = [];

  componentWillMount() {
    Api.get('start').then(questions => {
      this.questions = questions;
    });
  }

  onNameChange = event => {
    this.setState({
      name: event.target.value,
      error: false
    });
  }

  start = event => {
    event.preventDefault();
    if (this.state.name.length < 1) {
      this.setState({
        error: 'Name is required!'
      });
      return;
    }
    Api.post('init', { name: this.state.name }).then(({ id: surveyId }) => {
      this.setState({
        surveyId
      });
    })
  }

  answerQuestion = (questionId, answerId) => {
    const { surveyId } = this.state;
    Api.post('answer', { surveyId, questionId, answerId });
    const questionIndex = this.state.questionIndex + 1;
    if (questionIndex === this.questions.length) {
      return this.setState({
        complete: true
      });
    }
    this.setState({
      questionIndex
    });
  }

  render() {
    const { surveyId, name, error, questionIndex, complete } = this.state;
    if (!surveyId) {
      return (
        <div className="App">
          <header className="App-header">
            Lighthouse 2018 Superlatives
          </header>
          { this.state.error &&
            <div className="App-error">{error}</div> }
          <form className="input-group" onSubmit={this.start}>
            <label>Enter your full name</label>
            <input type="text" className="text-input" onChange={this.onNameChange} value={name} placeholder="Full name" />
          </form>
          <button type="button" onClick={this.start} className="button">Continue</button>
        </div>
      )
    }
    if (complete) {
      return (
        <div className="App">
          <header className="App-header">
            Your votes are in! Stay tuned for the results.
          </header>
        </div>
      );
    }
    return (
      <div className="App">
        <Question submit={this.answerQuestion} question={this.questions[questionIndex]} />
      </div>
    );
  }
}

export default App;
