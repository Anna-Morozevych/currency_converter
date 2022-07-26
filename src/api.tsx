const BASE_URL = 'https://api.exchangerate.host/convert';
const CURRENCY_LIST_URL = 'https://api.exchangerate.host/latest';

export const getExchangeRate = (from: string, to: string, amount = 1) => {
  return fetch(`${BASE_URL}?from=${from}&to=${to}&amount=${amount}`)
    .then(response => response.json());
};

export const getCurrencyList = () => {
  return fetch(CURRENCY_LIST_URL)
    .then(response => response.json());
};
