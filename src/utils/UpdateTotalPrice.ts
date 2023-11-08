type ReceivedData = {
  name: string;
  priceUsd: string;
  quantity: number;
};

export const updateTotalPrice = () => {
  return Object.keys(localStorage).reduce((acc, key) => {
    if (key.includes("CoinData_")) {
      const received = localStorage.getItem(key);
      if (received) {
        const parsedData: ReceivedData = JSON.parse(received);
        if (parsedData.priceUsd && parsedData.quantity) {
          acc += Number(parsedData.priceUsd) * parsedData.quantity;
        }
      }
    }
    return acc;
  }, 0);
};
