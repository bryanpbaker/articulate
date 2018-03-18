import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Quiz.css';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
      selectedAnswer: null,
    };

    this.setAnswer = this.setAnswer.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.resetQuiz = this.resetQuiz.bind(this);
  }

  setAnswer(option) {
    this.setState({
      selectedAnswer: option,
      canSubmit: true,
    }, () => {
      console.log(this.state)
    });
  }

  checkAnswer() {
    if (this.state.selectedAnswer.isCorrect) {
      console.log('Correct!');
    } else {
      console.log('NOPE');
    }

    this.setState({
      canSubmit: false,
    });
  }

  resetQuiz() {
    this.setState({
      selectedAnswer: null,
      canSubmit: false,
    });
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
            name="option"
            checked={this.state.selectedAnswer === option}
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
        <ul className="options">
          {this.renderOptions()}
        </ul>
        <button 
          disabled={!this.state.canSubmit}
          onClick={this.checkAnswer}
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
