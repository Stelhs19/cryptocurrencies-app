import React, { FC } from "react";
import { CoinsContext } from "../App";
import { formatNumber } from "../utils/Utils";
import { Coin } from "../models/Coin";
import "./Header.scss";

const Header: FC = () => {
  const { originalData, totalPrice } = React.useContext(CoinsContext);

  const popularCoins: Coin[] = originalData
    .sort((a: Coin, b: Coin) => Number(a.rank) - Number(b.rank))
    .slice(0, 3);

  return (
    <div className="header">
      <div className="header-container">
        <ul className="header-container-coins">
          {popularCoins.map((item) => (
            <li key={item.id}>
              <div className="header-container-coins-coin">
                <p className="bold-symbol">{item.symbol}</p>
                <p>{`$${formatNumber(item.priceUsd)}`}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="header-container-portfolio">
        <p className="header-container-portfolio-balance">{`${formatNumber(
          totalPrice.toString()
        )} USD`}</p>
      </div>
    </div>
  );
};

export default Header;
