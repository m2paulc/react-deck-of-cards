import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <img src={ this.props.imgSrc } alt={ this.props.cardName } className='p-4' />
    );
  }
}

Card.propTypes = {
  imgSrc: PropTypes.string,
  cardName: PropTypes.string
};