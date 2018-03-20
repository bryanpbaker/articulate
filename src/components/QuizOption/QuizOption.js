import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './QuizOption.css';

const QuizOption = (props) => {
  // destructure props
  const {
    option,
    blockId,
    setAnswer,
    answerIsSelected,
    answerIsSubmitted,
    answerIsCorrect,
  } = props;

  return (
    <li
      className={`Quiz__option ${answerIsSelected() ? 'selected' : ''} ${answerIsSubmitted() ? 'submitted' : ''} ${answerIsSelected() && answerIsSubmitted() && answerIsCorrect() ? 'correct' : ''} ${answerIsSelected() && answerIsSubmitted() && !answerIsCorrect() ? 'incorrect' : ''}`}
    >
      <input
        type="radio"
        id={`option${option.key}`}
        name={`quiz-${blockId}-option`}
        disabled={answerIsSubmitted()}
        checked={answerIsSelected()}
        onClick={() => setAnswer(option)}
      />
      <label htmlFor={`option${option.key}`}>
        <span className="custom-radio">
          {
            // only show custom radio button fill before submit
            !answerIsSubmitted() &&
            <span className="custom-radio-inner" />
          }
          {
            // show a check is the answer is correct on submit
            answerIsSubmitted() && answerIsSelected() && answerIsCorrect() &&
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
            // show an x if the answer is incorrect on submit
            answerIsSubmitted() && answerIsSelected() && !answerIsCorrect() &&
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
  );
};

QuizOption.propTypes = {
  option: PropTypes.shape({
    isCorrect: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    key: PropTypes.number.isRequired,
  }).isRequired,
  blockId: PropTypes.number.isRequired,
  setAnswer: PropTypes.func.isRequired,
  answerIsSelected: PropTypes.func.isRequired,
  answerIsSubmitted: PropTypes.func.isRequired,
  answerIsCorrect: PropTypes.func.isRequired,
};

export default QuizOption;
