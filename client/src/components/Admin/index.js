import React, { PureComponent } from 'react';
import './Admin.css';
import AuthForm from './AuthForm';
import NewQuestionForm from './NewQuestionForm';
import Api from '../../api';

const PASSWORD = "superduper";

class Admin extends PureComponent {
  state = {
    authed: false,
    showQuestion: false
  };

  componentWillMount() {
    if (localStorage.getItem('authed') === PASSWORD) {
      this.setState({
        authed: true
      });
    }
  }

  toggleQuestionForm = event => {
    if (event) event.preventDefault();
    this.setState({
      showQuestion: !this.state.showQuestion
    })
  }

  login = () => {
    localStorage.setItem('authed', PASSWORD);
    this.setState({
      authed: true
    });
  }

  submit(question) {
    Api.post('/new-question', question).then(response => {
      this.setState({
        showQuestion: false
      });
    });
  }

  render() {
    const { authed, showQuestion } = this.state;
    if (!authed) {
      return <AuthForm login={this.login} />
    }
    if (showQuestion) {
      return <NewQuestionForm toggle={this.toggleQuestionForm} submit={this.submit} />
    }
    return (
      <div className="Admin">
        <h2>Admin</h2>
        <p><a href="#" onClick={this.toggleQuestionForm}>Add question</a></p>
      </div>
    );
  }
}

export default Admin;
