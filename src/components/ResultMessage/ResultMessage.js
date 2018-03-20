import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './ResultMessage.css';

const ResultMessage = props => (
  <CSSTransitionGroup
    transitionName="result-message"
    transitionAppear
    transitionEnterTimeout={500}
    transitionLeaveTimeout={300}
    transitionAppearTimeout={500}
  >
    <div className="Quiz__result-message">
      <div className="icon-container">
        <FontAwesome
          name={props.success ? 'check' : 'close'}
        />
      </div>
      <p className="result">{props.success ? 'Correct' : 'Incorrect'}</p>
      <p className="caption">{props.caption}</p>
    </div>
  </CSSTransitionGroup>
);

ResultMessage.propTypes = {
  success: PropTypes.bool.isRequired,
  caption: PropTypes.string.isRequired,
};

export default ResultMessage;
