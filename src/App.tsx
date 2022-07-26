import React from 'react';
import './App.scss';
import { Converter } from './components/Converter/Converter';
import { Header } from './components/Header/Header';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Converter />
    </>
  );
};
