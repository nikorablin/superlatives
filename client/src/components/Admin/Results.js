import React, { PureComponent } from 'react';
import './Admin.css';
import AuthForm from './AuthForm';
import Api from '../../api';

const PASSWORD = "superduper";

class Admin extends PureComponent {
  state = {
    authed: false,
    results: { results: {}, textResults: {} }
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

  renderResult = result => {
    return (
      <tr key={result.text}>
        <td>{ result.text }</td>
        <td>
          { Object.keys(result.answers)
            .sort(key => result.answers[key].count)
            .reverse()
            .map(key => this.renderItem(result.answers[key]))
            .join(', ')
          }
          </td>
      </tr>
    )
  }

  renderItem = item => {
    return `${item.text}: ${item.count}`;
  }

  renderTextResults = results => {
    return (
      <div className="textResults">
        <b>{results.text}</b>
        {results.results.slice().sort().map((item, index) => <p key={`${item}-${index}`}>{item}</p>)}
      </div>
    )
  }

  render() {
    const { authed, results: { results, textResults } } = this.state;
    if (!authed) {
      return <AuthForm login={this.login} />
    }
    return (
      <div className="Admin">
        <h2>Results</h2>
        <table className="table">
          <tbody>
            <tr>
              <th>Question</th>
              <th>Results</th>
            </tr>
            {Object.keys(results).map(key => this.renderResult(results[key]))}
          </tbody>
        </table>
        { Object.keys(textResults).map(key => this.renderTextResults(textResults[key])) }
      </div>
    );
  }
}

export default Admin;
