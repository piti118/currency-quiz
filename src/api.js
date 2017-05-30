import axios from 'axios';


export function getRates(base) {
  return axios.get(`https://api.fixer.io/latest?base=${base.toUpperCase()}`);
}

export function getConversion(from, to) {
  if (from === to) {
    return Promise.resolve(1.0);
  }
  return axios.get(`https://api.fixer.io/latest?base=${from.toUpperCase()}&symbols=${to.toUpperCase()}`)
  .then(res => res.data.rates[to]);
}
