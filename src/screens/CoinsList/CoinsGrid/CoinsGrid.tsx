import React, { FC } from "react";
import "./CoinsGrid.scss";
import { CoinsContext } from "../../../App";


const CoinsGrid: FC = () => {
  
  const {data, setSearchId} = React.useContext(CoinsContext);

  const formatNumber = (a: string) => {
    return Number.parseFloat(a)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <div className="coins-list-container">
      <table>
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
              <tr key={coin.id} onClick={() => setSearchId(coin.id)}>
                <td>{coin.symbol}</td>
                <td><img style={{"width" : "30px", "height" : "30px"}} src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt={coin.name}/></td>
                <td>{`$${formatNumber(coin.priceUsd)}`}</td>
                <td>{`$${formatNumber(coin.marketCapUsd)}`}</td>
                <td>{`${formatNumber(coin.changePercent24Hr)} %`}</td>
                <td>
                  <button type="button">Add</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinsGrid;