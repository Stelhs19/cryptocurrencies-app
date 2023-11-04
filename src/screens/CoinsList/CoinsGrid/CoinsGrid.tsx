import React, { FC } from "react";
import "./CoinsGrid.scss";
import { CoinsContext } from "../../../App";
import { Coin } from "../../../models/Coin";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { addCoin } from "../../../utils/AddCoin";

const CoinsGrid: FC = () => {
  const { data, setSearchId } = React.useContext(CoinsContext);
  const navigate = useNavigate();

  const formatNumber = (a: string) => {
    return Number.parseFloat(a)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const redirectToCoinInfo = (
    coin: Coin,
    e: React.MouseEvent<HTMLTableRowElement>
  ) => {
    const target = e.target as HTMLTableCellElement;
    if (target.parentElement) {
      const row = target.parentElement as HTMLTableRowElement;
      if (row.cells) {
        const isLastColumn = target.cellIndex === row.cells.length - 1;

        if (!isLastColumn) {
          setSearchId(coin.id);
          navigate(`${coin.id}`);
        }
      }
    }
  };

  return (
    <div className="coins-list">
      <table className="coins-list-container">
        <thead>
          <tr>
            <td>Symbol</td>
            <td>Logo</td>
            <td>Price</td>
            <td>Market Cap</td>
            <td>Price changes in 24h</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((coin) => (
              <tr key={coin.id} onClick={(e) => redirectToCoinInfo(coin, e)}>
                <td>{coin.symbol}</td>
                <td>
                  <img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    alt={coin.name}
                  />
                </td>
                <td>{`$${formatNumber(coin.priceUsd)}`}</td>
                <td>{`$${formatNumber(coin.marketCapUsd)}`}</td>
                <td>{`${formatNumber(coin.changePercent24Hr)} %`}</td>
                <td>
                  <Button label="Add" onClick={() => addCoin(coin)} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinsGrid;
