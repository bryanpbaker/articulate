import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './ResetButton.css';

const ResetButton = props => (
  <button className="try-again" onClick={props.resetQuiz}>
    <FontAwesome
      name="undo"
    />
    &nbsp;
    {props.label}
  </button>
);

ResetButton.propTypes = {
  resetQuiz: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default ResetButton;
