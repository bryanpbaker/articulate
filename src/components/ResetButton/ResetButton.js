import React from 'react';
import FontAwesome from 'react-fontawesome';

import './ResetButton.css';

const ResetButton = props => (
  <button className="try-again" onClick={props.resetQuiz}>
    <FontAwesome
      name="undo"
    />
    &nbsp;
    Try again
  </button>
);

export default ResetButton;
