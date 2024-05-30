import React, { useState } from 'react';
import axios from 'axios';

const StockQuote = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);
  const token = "&token=eA7S7srDXKWzAoqif1S9HB";

  const fetchStockData = async () => {
    try {
      const response = await axios.get(`https://brapi.dev/api/quote/${stockSymbol}?modules=summaryProfile${token}`);
      setStockData(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar dados da ação');
      setStockData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStockData();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
            <h1>Pesquisar Ação/Fii</h1>
            <input 
            type="text" 
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
            placeholder="Digite o codigo da ação/fii" 
            />
            <button type="submit">Buscar</button>
            </form>
      {error && <p>{error}</p>}
      {stockData && (
        <div>
          <h2>Dados da Ação</h2>
          <p>Nome: {stockData.results[0].longName}</p>
          <p>Preço: R${stockData.results[0].regularMarketPrice}</p>
          <p>Topo hoje: R${stockData.results[0].regularMarketDayHigh}</p>
          <p>Sede: {stockData.results[0].summaryProfile.city} - {stockData.results[0].summaryProfile.state}</p>
          <p>Setor: {stockData.results[0].summaryProfile.sector}</p>
        </div>
      )}
    </div>
  );
};

export default StockQuote;
