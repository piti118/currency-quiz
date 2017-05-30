import React from 'react';
import PropTypes from 'prop-types';


function CurrencyDisplay(props) {
  const { currency, amount } = props;
  return (<div>
    <div className={`currency-flag currency-flag-${currency.toLowerCase()}`} />
    <span style={{ padding: 10 }}>{(amount).toFixed(2)} {currency}</span>
  </div>);
}

CurrencyDisplay.propTypes = {
  currency: PropTypes.string.isRequired,
  amount: PropTypes.number,
};

CurrencyDisplay.defaultProps = {
  amount: 0.0,
};


export default CurrencyDisplay;
