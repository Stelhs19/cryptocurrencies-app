import { Coin } from "../models/Coin";

export const filterData = (arr: Coin[]) => {
  const removeZeroValues = (value: string) => {
    return (
      String(formatNumber(value)) !== "0" &&
      String(formatNumber(value)) !== "0.00" &&
      String(formatNumber(value) !== "-") &&
      value !== null
    );
  };

  return arr.filter(
    (item) =>
      removeZeroValues(item.priceUsd) &&
      removeZeroValues(item.marketCapUsd) &&
      removeZeroValues(item.changePercent24Hr)
  );
};

export const formatNumber = (a: string) => {
  return Number.parseFloat(a)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
