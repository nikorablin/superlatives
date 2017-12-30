import React, { PureComponent } from 'react';
import './Admin.css';

const PASSWORD = "superduper";

class AuthForm extends PureComponent {
  state = {
    authed: false,
    password: ''
  };

  updatePassword = event => {
    this.setState({
      password: event.target.value
    })
  }

  login = event => {
    event.preventDefault();
    if (this.state.password !== PASSWORD) {
      return;
    }
    this.props.login();
  }

  render() {
    const { password } = this.state;
    return (
      <div className="Admin">
        <h1>Log in to Admin</h1>
        <form className="form" onSubmit={this.login}>
          <label className="label">Password</label>
          <input type="text" className="input" value={password} onChange={this.updatePassword} />
          <button type="submit" className="button">Log in</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
