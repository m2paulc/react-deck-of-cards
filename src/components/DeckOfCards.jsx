// import PropTypes from 'prop-types';
import { Component } from 'react';
import Card from './Card';

export default class DeckOfCards extends Component {
  constructor(props) {
    super(props);
    this.state = { cards: [], cardID: '', remainingCards: 0, cardName: '' };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    const cardAPI = 'https://deckofcardsapi.com/api/deck/new/shuffle';
    const response = await fetch(cardAPI);
    const data = await response.json();
    // console.log(data);
    this.setState({ cardID: data.deck_id, remainingCards: data.remaining });
  }

  // need to request from 
  async getCard() {
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${this.state.cardID}/draw/`);
      const cardsData = await response.json();
      // console.log(cardsData);
      if (!cardsData.success) {
        throw new Error('No cards remaining');
      }
      const cardObject = cardsData.cards[0];
      this.setState(prevState => ({
        cards: [...prevState.cards, cardObject],
        remainingCards: cardsData.remaining,
        cardName: `${cardObject.value} of ${cardObject.suit}`
      }));
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    // let cardImage = null;
    let disabled = this.state.remainingCards === 0;
    const renderCards = this.state.cards.map(card => (
      < Card key={ card.code } imgSrc={ card.image } cardName={ this.state.cardName } />
    ));
    return (
      <div>
        <h1 className='text-3xl m-4 text-center'>Card Dealer</h1>
        <p className='text-center'>A little demo made with React</p>
        <div className='m-auto my-8 text-center'>
          <button className='bg-sky-500 cursor-pointer text-lg p-4 rounded font-bold' onClick={ this.getCard } disabled={ disabled }>{ !disabled ? 'Deal me a Card' : 'No more cards to deal' }</button>
          <div className='grid grid-flow-row grid-cols-10 grid-rows-6 gap-1'>
            { renderCards }
          </div>
        </div>
      </div >
    );
  }
}
