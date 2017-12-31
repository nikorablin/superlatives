import React, { PureComponent } from 'react';
import './Answer.css';

export default class Question extends PureComponent {

  clickAnswer = event => {
    event.preventDefault();
    this.props.onClick(this.props.answer._id);
  }

  render() {
    const { answer } = this.props;
    return (
      <button type="button" href="#" className="button" onClick={this.clickAnswer}>{answer.text}</button>
    )
  }
}
