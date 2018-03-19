import React from 'react';
import PropTypes from 'prop-types';

import './SubmitButton.css';

const SubmitButton = props => (
  <button
    className="Quiz__submit"
    disabled={!props.canSubmit}
    onClick={props.handleSubmit}
  >
    Submit
  </button>
);

SubmitButton.propTypes = {
  canSubmit: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default SubmitButton;
