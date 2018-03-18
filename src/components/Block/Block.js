import React from 'react';
import './Block.css';

import Quiz from '../Quiz/Quiz';

const Block = ({ block }) => {
  const renderBlock = () => {
    if (block.type === 'quiz') {
      return (
        <Quiz key={block.id} block={block} />
      );
    }
  }

  return (
    <div className="Block">
      <div className="BlockContainer">
        {renderBlock()}
      </div>
    </div>
  );
};

export default Block;
