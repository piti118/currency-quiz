import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'currency-flags/dist/currency-flags.css';
import CurrencyDisplay from './CurrencyDisplay';
import * as api from '../api';
// http://api.fixer.io/latest?base=THB


function ConvertResult(props) {
  const rates = props.rates;
  const thb = props.thb;
  return (
    <div className="result-container">
      {Object.keys(rates).map(k => (
        <CurrencyDisplay key={k} amount={thb * rates[k]} currency={k} />
      ))}
    </div>
  );
}

ConvertResult.propTypes = {
  rates: PropTypes.object.isRequired, // eslint-disable-line
  thb: PropTypes.number.isRequired,
};

class CurrencyConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thb: '',
      rates: null,
    };
    this.handleTHBChange = this.handleTHBChange.bind(this);
    this.handleConvert = this.handleConvert.bind(this);
  }

  componentDidMount() {
    api.getRates('THB').then((res) => {
      this.setState({ rates: res.data.rates });
    });
  }

  handleTHBChange(e) {
    const v = e.target.value;
    if (!isNaN(v) || v === '') {
      this.setState({ thb: e.target.value });
    }
  }

  handleConvert(e) {
    e.preventDefault();
    console.log('submitted', this.state.thb);
  }

  render() {
    const rates = this.state.rates;
    const thb = this.state.thb;
    return (
      <div className="converter-container">
        {!rates && <p> Loading </p>}
        {rates &&
          (<div className="thb-input">
            <form onSubmit={this.handleConvert}>
              <label htmlFor="thb">THB</label>

              <input
                type="text"
                placeholder="จำนวนเงินบาท"
                value={this.state.thb}
                onChange={this.handleTHBChange}
              />
            </form>
          </div>)
        }
        {rates &&
        (<div>
          <ConvertResult rates={rates} thb={thb} />
        </div>)}
      </div>
    );
  }

}

export default CurrencyConverter;
