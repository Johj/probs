import React, { Component, } from 'react';

export default class App extends Component {
  state = {
    coin: '',
    dice: '',
    rps: '',
    history: [],
  }

  componentWillMount = () => {
    const coin = this.flipCoin();
    const dice = this.rollDice();
    const rps = this.playRPS();

    this.setState({coin, dice, rps,});
  }

  randomCrypto = () => {
    const cryptoObj = window.crypto || window.msCrypto; // for IE 11
    const randomBuffer = new Uint32Array(1);
    cryptoObj.getRandomValues(randomBuffer);
    const randomNumber = randomBuffer[0] / (0xffffffff + 1);

    return randomNumber;
  }

  getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(this.randomCrypto() * (max - min + 1)) + min;
  }

  update = (e) => {
    const type = e.target.name;
    let item;
    if (type === 'coin') {
      item = this.flipCoin();
    } else if (type === 'dice') {
      item = this.rollDice();
    } else if (type === 'rps') {
      item = this.playRPS();
    } else {
      item = null; // should be unreachable
    }

    const state = {};
    state[type] = item;

    this.setState(state, () => {
      const history = this.state.history.length >= 8
        ? this.state.history.slice(0, this.state.history.length - 1)
        : this.state.history;

      this.setState({ history: item.concat(history), });
    });

  }

  flipCoin = () => {
    return this.getRandomIntInclusive(0, 1) ? '⚪' : '⚫';
  }

  rollDice = () => {
    return String.fromCharCode(parseInt(2680 + this.getRandomIntInclusive(0, 5), 16));
  }

  playRPS = () => {
    const play = this.getRandomIntInclusive(0, 2);
    let rps;
    if (play === 0) {
      rps = '✊';
    } else if (play === 1) {
      rps = '✋';
    } else {
      rps = '✌';
    }

    return rps;
  }

  render = () => {
    return (
      <div className='centered monospace white' style={{display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between',}}>
        <div />
        <div className='unselectable'>
          <a className='lg-size' name='coin' onClick={this.update}>{this.state.coin}</a><br />
          <a className='lg-size' name='dice' onClick={this.update}>{this.state.dice}</a><br />
          <a className='lg-size' name='rps' onClick={this.update}>{this.state.rps}</a>
        </div>
        <div className='md-size'>
          {this.state.history}
        </div>
        <div>
          <hr />
          <p>Made with ❤ by <a className='white' href='https://github.com/Johj'>Peter</a></p>
        </div>
      </div>
    );
  }
}