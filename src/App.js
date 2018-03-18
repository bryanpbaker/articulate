import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'normalize.css';
import './App.css';

import fetchBlocks from './actions/blocks';

import Block from './components/Block/Block';

class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.fetchBlocks();
    }, 200);
  }

  /**
   * render a block component for each block on state
   */
  renderBlocks() {
    return this.props.blocks.map(block => (
      <Block key={block.id} block={block} />
    ));
  }

  render() {
    if (!this.props.blocks) {
      return <div>loading...</div>;
    }

    return (
      <div className="lesson">
        {this.renderBlocks()}
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
