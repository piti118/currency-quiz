import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CurrencyDisplay from './CurrencyDisplay';
import '../App.css';
import * as api from '../api';

function ClickableCurrency(props) {
  return (
    <button className="img-button" onClick={props.onClick} disabled={props.disabled}>
      <div style={{ fontSize: 'xx-large' }}>
        <CurrencyDisplay currency={props.currency} amount={props.amount} />
      </div>
    </button>
  );
}

ClickableCurrency.propTypes = {
  onClick: PropTypes.func,
  currency: PropTypes.string.isRequired,
  amount: PropTypes.number,
  disabled: PropTypes.bool,
};

ClickableCurrency.defaultProps = {
  onClick: () => {},
  amount: 0,
  disabled: false,
};

function ScoreDisplay(props) {
  return (
    <div className="score-container">
      Score {props.score}/{props.total}
    </div>
  );
}

ScoreDisplay.propTypes = {
  score: PropTypes.number,
  total: PropTypes.number,
};

ScoreDisplay.defaultProps = {
  score: 0,
  total: 0,
};

function randomCurrency() {
  const currencies = ['USD', 'EUR', 'THB', 'AUD', 'BRL', 'CNY'];
  return currencies[Math.floor(Math.random() * currencies.length)];
}

function randomAmount() {
  return Math.random() * 10;
}

class CurrencyQuiz extends Component {

  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      total: 0,
      leftCurrency: randomCurrency(),
      leftAmount: randomAmount(),
      rightCurrency: randomCurrency(),
      rightAmount: randomAmount(),
      loading: false,
    };
  }

  correctAnswer(id, leftAmount, rightAmount, ltr) {
    const leftCorrect = leftAmount * ltr > rightAmount;
    const rightCorrect = !leftCorrect;
    return (id === 'left' && leftCorrect) || (id === 'right' && rightCorrect);
  }

  onPicked(id, leftAmount, leftCurrency, rightAmount, rightCurrency) {
    // disable both button
    // ajax get rate
    // compare left and right
    // update score

    this.setState({ loading: true });
    api.getConversion(leftCurrency, rightCurrency).then((ltr) => {
      const correct = this.correctAnswer(id, leftAmount, rightAmount, ltr);
      this.setState(st => ({
        total: st.total + 1,
        score: st.score + (correct ? 1 : 0),
        leftAmount: randomAmount(),
        rightAmount: randomAmount(),
        leftCurrency: randomCurrency(),
        rightCurrency: randomCurrency(),
        loading: false,
      }));
    });
  }

  render() {
    const { leftAmount, leftCurrency, rightAmount, rightCurrency } = this.state;
    const { score, total, loading } = this.state;
    const answerpicked = id => this.onPicked(
      id, leftAmount, leftCurrency, rightAmount, rightCurrency);
    return (
      <div className="quiz-container vcenter">
        <div style={{ textAlign: 'center' }}>Which one is greater?</div>
        <div className="question-container">
          <ClickableCurrency
            currency={leftCurrency}
            amount={leftAmount}
            onClick={() => answerpicked('left')}
            disabled={loading}
          />
          VS
          <ClickableCurrency
            currency={rightCurrency}
            amount={rightAmount}
            onClick={() => answerpicked('right')}
            disabled={loading}
          />
        </div>
        <div className="score-container">
          <ScoreDisplay score={score} total={total} />
        </div>
      </div>
    );
  }

}

export default CurrencyQuiz;
