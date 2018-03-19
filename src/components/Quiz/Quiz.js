import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

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
      <li
        key={option.key}
        className={`Quiz__option ${this.state.selectedAnswer === option ? 'selected' : ''} ${this.state.submitted ? 'submitted' : ''} ${this.state.submitted && option.isCorrect ? 'correct' : 'incorrect'}`}
      >
        <input
          type="radio"
          id={`option${option.key}`}
          name={`quiz-${this.props.block.id}-option`}
          checked={this.state.selectedAnswer === option}
          disabled={this.state.submitted}
          onClick={() => this.setAnswer(option)}
        />
        <label htmlFor={`option${option.key}`}>
          <span className="custom-radio">
            {
              !this.state.submitted &&
              <span className="custom-radio-inner" />
            }
            {
              this.state.submitted && this.state.hasSuccess && this.state.selectedAnswer === option &&
              <FontAwesome
                className="status-icon"
                name="check"
                style={{
                  fontSize: '12px',
                  color: '#707070',
                }}
              />
            }
            {
              this.state.submitted && !this.state.hasSuccess && this.state.selectedAnswer === option &&
              <FontAwesome
                className="status-icon"
                name="close"
                style={{
                  fontSize: '12px',
                  color: '#707070',
                }}
              />
            }
          </span>
          <span>{option.label}</span>
        </label>
        <div className="underline" />
      </li>
    ));
  }

  render() {
    const {
      question, img, caption,
    } = this.props.block;

    return (
      <div className="Quiz">
        <p className="Quiz__title">{question}</p>
        {
          img &&
          <img src={process.env.PUBLIC_URL + img} alt={question} />
        }
        <div className="Quiz__options">
          <ul>
            {this.renderOptions()}
          </ul>
        </div>
        <div className="results">
          {
            this.state.submitted && this.state.hasSuccess &&
            <div className="Quiz__success-message">
              <div className="icon-container">
                <FontAwesome
                  name="check"
                  style={{
                    fontSize: '32px',
                    color: '#707070',
                  }}
                />
              </div>
              <p>Correct</p>
              <p className="caption">{caption}</p>
            </div>
          }
          {
            this.state.submitted && !this.state.hasSuccess &&
            <div className="Quiz__success-message">
              <div className="icon-container">
                <FontAwesome
                  name="close"
                  style={{
                    fontSize: '32px',
                    color: '#707070',
                  }}
                />
              </div>
              <p>Incorrect</p>
              <p className="caption">{caption}</p>
            </div>
          }
        </div>
        <div>
          {
            !this.state.submitted &&
            <button
              className="Quiz__submit"
              disabled={!this.state.canSubmit}
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          }
        </div>
        {
          this.state.submitted &&
          <button className="try-again" onClick={this.resetQuiz}>
            <FontAwesome
              name="undo"
            />
            &nbsp;
            Try again
          </button>
        }
      </div>
    );
  }
};

Quiz.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    img: PropTypes.string,
    question: PropTypes.string,
    caption: PropTypes.string,
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
