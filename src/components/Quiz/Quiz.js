import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Quiz.css';

import QuizImage from '../QuizImage/QuizImage';
import QuizOption from '../QuizOption/QuizOption';
import ResultMessage from '../ResultMessage/ResultMessage';
import SubmitButton from '../SubmitButton/SubmitButton';
import ResetButton from '../ResetButton/ResetButton';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      selectedAnswer: null,
      canSubmit: false,
      submitted: false,
    };

    this.state = this.initialState;

    this.setAnswer = this.setAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetQuiz = this.resetQuiz.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.answerIsSelected = this.answerIsSelected.bind(this);
    this.answerCanBeSubmitted = this.answerCanBeSubmitted.bind(this);
    this.answerIsSubmitted = this.answerIsSubmitted.bind(this);
    this.answerIsCorrect = this.answerIsCorrect.bind(this);
  }

  /**
   * set the selectedAnswer state and allow submission
   * @param {Object} option
   */
  setAnswer(option) {
    this.setState({
      selectedAnswer: option,
      canSubmit: true,
    });
  }

  /**
   * disable submission and set canSubmit to true
   */
  handleSubmit() {
    this.setState({
      canSubmit: false,
      submitted: true,
    });
  }

  /**
   * reset initial state
   */
  resetQuiz() {
    this.setState(this.initialState);
  }

  /**
   * return true if the passed in option is the selectedAnswer
   * @param {Object} option
   */
  answerIsSelected(option) {
    return this.state.selectedAnswer === option;
  }

  /**
   * return true if the answer can be submitted
   */
  answerCanBeSubmitted() {
    return this.state.canSubmit;
  }

  /**
   * return true if the answer has been submitted
   */
  answerIsSubmitted() {
    return this.state.submitted;
  }

  /**
   * return true if the answer is correct
   */
  answerIsCorrect() {
    return this.state.selectedAnswer.isCorrect;
  }

  /**
   * render an option for each available option on props
   */
  renderOptions() {
    return this.props.block.options.map(option => (
      <QuizOption
        key={option.key}
        option={option}
        blockId={this.props.block.id}
        setAnswer={this.setAnswer}
        answerIsSelected={() => this.answerIsSelected(option)}
        answerIsSubmitted={this.answerIsSubmitted}
        answerIsCorrect={this.answerIsCorrect}
      />
    ));
  }

  render() {
    // destructure props
    const {
      question, img, caption,
    } = this.props.block;

    return (
      <div className="Quiz">
        <p className="Quiz__title">{question}</p>
        {
          // if there's an image for the block, render a QuizImage
          img &&
          <QuizImage img={img} alt={question} />
        }
        <div className="Quiz__options">
          <ul>
            {this.renderOptions()}
          </ul>
        </div>
        <div className="results">
          {
            // when the user answers correctly, show success
            this.answerIsSubmitted() && this.answerIsCorrect() &&
            <ResultMessage key="1" success caption={caption} />
          }
          {
            // when the user answers incorrectly, show fail
            this.answerIsSubmitted() && !this.answerIsCorrect() &&
            <ResultMessage key="2" success={false} caption={caption} />
          }
        </div>
        <div>
          {
            // hide the submit button once the answer has been submitted
            !this.answerIsSubmitted() &&
            <SubmitButton
              canSubmit={this.answerCanBeSubmitted()}
              handleSubmit={this.handleSubmit}
            />
          }
        </div>
        {
          // only show the reset button if the answer has been submitted
          this.answerIsSubmitted() &&
          <ResetButton resetQuiz={this.resetQuiz} label="Try Again" />
        }
      </div>
    );
  }
}

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
