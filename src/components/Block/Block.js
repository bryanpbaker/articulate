import React from 'react';
import PropTypes from 'prop-types';
import './Block.css';

import Quiz from '../Quiz/Quiz';

const Block = ({ block }) => {
  const renderBlock = () => {
    if (block.type === 'quiz') {
      return (
        <Quiz key={block.id} block={block} />
      );
    }
  };

  return (
    <div className="Block">
      <div className="Block__container">
        {renderBlock()}
      </div>
    </div>
  );
};

Block.propTypes = {
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

export default Block;
