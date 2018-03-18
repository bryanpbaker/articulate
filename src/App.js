import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchBlocks from './actions/blocks';

import './App.css';

import Quiz from './components/Quiz/Quiz';

class App extends Component {
  componentDidMount() {
    this.props.fetchBlocks();
  }

  /**
   * render ui for each block based on type
   */
  renderBlockItems() {
    return this.props.blocks.map((block) => {
      if (block.type === 'quiz') {
        return (
          <Quiz key={block.id} block={block} />
        );
      }
    });
  }

  render() {
    if (!this.props.blocks) {
      return <div>loading...</div>;
    }

    return (
      <div className="lesson">
        {this.renderBlockItems()}
      </div>
    );
  }
}

// default props
App.defaultProps = {
  blocks: null,
};
// prop-types
App.propTypes = {
  fetchBlocks: PropTypes.func.isRequired,
  blocks: PropTypes.arrayOf(PropTypes.object),
};
// map application state to props
function mapStateToProps(state) {
  return {
    blocks: state.blocks,
  };
}

export default connect(mapStateToProps, { fetchBlocks })(App);
