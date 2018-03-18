import React, { Component } from 'react';

class Quiz extends Component {
  render() {
    return (
      <div className="quiz">
        {this.props.block.question}
      </div>
    )
  }
}

export default Quiz;
