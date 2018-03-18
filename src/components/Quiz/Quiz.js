import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Quiz.css';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      selectedAnswer: null,
      canSubmit: false,
      submitted: false,
      hasSuccess: false,
    };

    this.state = this.initialState;

    this.setAnswer = this.setAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetQuiz = this.resetQuiz.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
  }

  setAnswer(option) {
    this.setState({
      selectedAnswer: option,
      canSubmit: true,
    });
  }

  handleSubmit() {
    this.setState({
      canSubmit: false,
      submitted: true,
      hasSuccess: this.state.selectedAnswer.isCorrect,
    });
  }

  resetQuiz() {
    this.setState(this.initialState);
  }

  /**
   * render an option for each available option on props
   */
  renderOptions() {
    return this.props.block.options.map(option => (
      <li key={option.key}>
        <label htmlFor={`option${option.key}`}>
          <input
            type="radio"
            id={`option${option.key}`}
            name={`quiz-${this.props.block.id}-option`}
            checked={this.state.selectedAnswer === option}
            disabled={this.state.submitted}
            onClick={() => this.setAnswer(option)}
          />
          <span>{option.label}</span>
        </label>
      </li>
    ));
  }

  render() {
    const {
      title, question, img,
    } = this.props.block;

    return (
      <div className="Quiz">
        <h3>{title}</h3>
        {
          img &&
          <img src={process.env.PUBLIC_URL + img} alt={question} />
        }
        <p>{question}</p>
        {
          this.state.submitted && this.state.hasSuccess &&
          <h4>That is correct!</h4>
        }
        {
          this.state.submitted && !this.state.hasSuccess &&
          <h4>That is NOT correct!</h4>
        }
        <ul className="options">
          {this.renderOptions()}
        </ul>
        <button 
          disabled={!this.state.canSubmit}
          onClick={this.handleSubmit}
        >
          Submit
        </button>
        <button onClick={this.resetQuiz}>Try again!</button>
      </div>
    );
  }
};

Quiz.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string,
    img: PropTypes.string,
    question: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      isCorrect: PropTypes.bool,
      label: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      id: PropTypes.number,
    })),
  }).isRequired,
};

export default Quiz;
