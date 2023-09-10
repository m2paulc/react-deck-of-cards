import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  constructor(props) {
    super(props);
    let angle = Math.random() * 90 - 45;
    this._transform = `rotate(${angle}deg)`;
  }

  render() {
    return (
      <img src={ this.props.imgSrc } alt={ this.props.cardName } className='p-1' style={ { transform: this._transform } } />
    );
  }
}

Card.propTypes = {
  imgSrc: PropTypes.string,
  cardName: PropTypes.string
};