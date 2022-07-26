import React, { useEffect, useState } from 'react';
import { getExchangeRate } from '../../api';
import './Header.scss';

export const Header = React.memo(() => {
  const [usdRate, setUsdRate] = useState();
  const [eurRate, setEurRate] = useState();

  useEffect(() => {
    getExchangeRate('USD', 'UAH')
      .then(response => setUsdRate(response.info.rate));
  }, [usdRate]);

  useEffect(() => {
    getExchangeRate('EUR', 'UAH')
      .then(response => setEurRate(response.info.rate));
  }, [eurRate]);

  return (
    <header className="header">
      <p className="header__item">
        {`USD: ₴${usdRate}`}
      </p>
      <p className="header__item">
        {`EUR: ₴${eurRate}`}
      </p>
    </header>
  );
});
