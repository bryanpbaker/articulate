import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './ResultMessage.css';

const ResultMessage = (props) => {
  return (
    <div className="Quiz__result-message">
      <div className="icon-container">
        <FontAwesome
          name={props.success ? 'check' : 'close'}
        />
      </div>
      <p>{props.success ? 'Correct' : 'Incorrect'}</p>
      <p className="caption">{props.caption}</p>
    </div>
  );
};

ResultMessage.propTypes = {
  success: PropTypes.bool.isRequired,
  caption: PropTypes.string.isRequired,
};

export default ResultMessage;
