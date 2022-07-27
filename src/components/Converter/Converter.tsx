import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Alert,
} from '@mui/material';

import './Converter.scss';
import { getCurrencyList, getExchangeRate } from '../../api';

export const Converter: React.FC = () => {
  const [currentRate, setCurrentRate] = useState(0);
  const [currencyNames, setCurrencyNames] = useState<string[]>([]);
  const [amountFrom, setAmountFrom] = useState(1);
  const [amountTo, setAmountTo] = useState(1);
  const [currencyFrom, setCurrencyFrom] = useState('');
  const [currencyTo, setCurrencyTo] = useState('');

  useEffect(() => {
    getCurrencyList()
      .then(response => {
        const keys = Object.keys(response.rates);

        setCurrencyNames(keys);
        setCurrencyFrom('USD');
        setCurrencyTo('UAH');

        getExchangeRate('USD', 'UAH')
          .then(result => {
            setCurrentRate(result.info.rate);
            setAmountTo(amountFrom * result.info.rate);
          });
      });
  }, []);

  useEffect(() => {
    getExchangeRate(currencyFrom, currencyTo)
      .then(result => {
        setCurrentRate(result.info.rate);
        setAmountTo(amountFrom * result.info.rate);
      });
  }, [currencyFrom, currencyTo]);

  const handleAmountFrom = (amount: number) => {
    if (!amount.toString().match(/[0-9]/)) {
      return;
    }

    setAmountTo(amount * currentRate);
    setAmountFrom(amount);
  };

  const handleCurrencyFrom = (currency: string) => {
    setAmountTo(amountFrom * currentRate);
    setCurrencyFrom(currency);
  };

  const handleAmountTo = (amount: number) => {
    if (!amount.toString().match(/[0-9]/)) {
      return;
    }

    setAmountFrom(amount / currentRate);
    setAmountTo(amount);
  };

  const handleCurrencyTo = (currency: string) => {
    setAmountTo(amountFrom * currentRate);
    setCurrencyTo(currency);
  };

  return (
    <section className="converter">
      <h1 className="converter__title">
        Currency Converter
      </h1>
      <div className="converter__form">
        <div className="converter__form-item converter__form-item--from">
          <Box>
            <TextField
              name="amountFrom"
              id="outlined-basic"
              type="text"
              label="Amount"
              variant="outlined"
              value={amountFrom}
              onChange={(event) => handleAmountFrom(+event.target.value)}
              helperText="Please enter amount"
            />
          </Box>
          <Box>
            <TextField
              name="currencyFrom"
              id="outlined-select-currency"
              select
              label="Currency"
              value={currencyFrom}
              onChange={(event) => handleCurrencyFrom(event.target.value)}
              helperText="Please select your currency"
            >
              {currencyNames.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </div>

        <div className="converter__form-item converter__form-item--to">
          <Box>
            <TextField
              name="amountTo"
              id="outlined-basic"
              type="text"
              label="Amount"
              variant="outlined"
              value={amountTo}
              onChange={(event) => handleAmountTo(+event.target.value)}
              helperText="Please enter amount"
            />
          </Box>
          <Box>
            <TextField
              name="currencyTo"
              id="outlined-select-currency"
              select
              label="Currency"
              value={currencyTo}
              onChange={(event) => handleCurrencyTo(event.target.value)}
              helperText="Please select your currency"
            >
              {currencyNames.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </div>
      </div>

      <Alert severity="info">
        {`Current rate ${currentRate}`}
      </Alert>
    </section>
  );
};
