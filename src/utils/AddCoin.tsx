import { Coin } from "../models/Coin";

export const addCoin = (coin: Coin, coinsQuantity: number) => {
  const coinName = coin.name;
  const coinPrice = coin.priceUsd;

  const coinData = {
    name: coinName,
    priceUsd: coinPrice,
    quantity: coinsQuantity,
  };

  const existingData = localStorage.getItem(`CoinData_${coin.id}`);

  if (existingData) {
    const parsedData = JSON.parse(existingData);
    parsedData.quantity += coinData.quantity;
    localStorage.setItem(`CoinData_${coin.id}`, JSON.stringify(parsedData));
  } else {
    localStorage.setItem(`CoinData_${coin.id}`, JSON.stringify(coinData));
  }
};
