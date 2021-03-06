import React from 'react';
import PropTypes from 'prop-types';

const QuizImage = props => (
  <img src={process.env.PUBLIC_URL + props.img} alt={props.alt} />
);

QuizImage.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default QuizImage;
