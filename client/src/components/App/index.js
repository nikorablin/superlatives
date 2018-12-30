import React, { PureComponent } from 'react';
import './App.css';
import Question from '../Question';
import Api from '../../api';

class App extends PureComponent {
  state = {
    surveyId: null,
    name: '',
    error: null,
    questionIndex: 0,
    complete: false,
    questions: []
  }

  componentWillMount() {
    Api.get('start').then(questions => {
      this.setState({
        questions,
        surveyId: localStorage.getItem('surveyId'),
        questionIndex: parseInt(localStorage.getItem('questionIndex')) || 0
      });
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
      localStorage.setItem('surveyId', surveyId);
    })
  }

  answerQuestion = (questionId, answerId, text) => {
    const { surveyId, questions } = this.state;
    Api.post('answer', { surveyId, questionId, answerId, text });
    const questionIndex = this.state.questionIndex + 1;
    if (questionIndex === questions.length) {
      localStorage.removeItem('surveyId');
      localStorage.removeItem('questionIndex');
      return this.setState({
        complete: true
      });
    }
    localStorage.setItem('questionIndex', questionIndex);
    this.setState({
      questionIndex
    });
  }

  render() {
    const { surveyId, name, error, questionIndex, complete, questions } = this.state;
    if (questions.length === 0) {
      return (
        <div className="App">
          <header className="App-header">
            Loading
          </header>
        </div>
      );
    }
    if (!surveyId) {
      return (
        <div className="App">
          <header className="App-header">
            Lighthouse {(new Date()).getFullYear() + 1} Superlatives
          </header>
          { this.state.error &&
            <div className="App-error">{error}</div> }
          <form className="form" onSubmit={this.start}>
            <label className="label">Enter your full name</label>
            <input type="text" className="input" onChange={this.onNameChange} value={name} placeholder="Full name" />
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
        <Question submit={this.answerQuestion} question={questions[questionIndex]} />
      </div>
    );
  }
}

export default App;
