import { Coin } from "../models/Coin";

export const addCoin = (coin: Coin) => {
  const coinName = coin.name;
  const coinPrice = coin.priceUsd;

  const coinData = {
    name: coinName,
    priceUsd: coinPrice,
  };

  localStorage.setItem(`CoinData_${coin.id}`, JSON.stringify(coinData));
};
