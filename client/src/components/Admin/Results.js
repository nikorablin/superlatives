import React, { PureComponent } from 'react';
import './Admin.css';
import AuthForm from './AuthForm';
import Api from '../../api';

const PASSWORD = "superduper";

class Admin extends PureComponent {
  state = {
    authed: false,
    results: []
  };

  componentWillMount() {
    Api.get('results').then(results => {
      this.setState({
        results
      });
    })
    if (localStorage.getItem('authed') === PASSWORD) {
      this.setState({
        authed: true
      });
    }
  }

  login = () => {
    localStorage.setItem('authed', PASSWORD);
    this.setState({
      authed: true
    });
  }

  render() {
    const { authed, showQuestion } = this.state;
    if (!authed) {
      return <AuthForm login={this.login} />
    }
    return (
      <div className="Admin">
        <h2>Results</h2>
      </div>
    );
  }
}

export default Admin;
