import React, { FC } from "react";
import { SearchedCoinContext } from "../../App";
import { formatNumber } from "../../utils/Utils";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import "./CoinInfo.scss";

const CoinInfo: FC = () => {
  const { searchedCoin } = React.useContext(SearchedCoinContext);
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate("/");
  };

  const handleClick = () => {
    console.log("Button Clicked");
  };

  return (
    <div className="coin-info-container">
      <div className="coin-info-container-back">
        <Button label="Back" onClick={onClickBack} />
      </div>

      {searchedCoin ? (
        <div className="coin-info-container-coin">
          <div className="coin-info-container-coin-header">
            <div className="coin-info-container-coin-header-symbol">
              <div className="symbol-img">
                <img
                  src={`https://coinicons-api.vercel.app/api/icon/${searchedCoin.symbol.toLowerCase()}`}
                  alt={searchedCoin.name}
                  className=""
                />
              </div>
              <div className="symbol-sym">
                <p>{searchedCoin.symbol}</p>
              </div>
            </div>
            <div className="coin-info-container-coin-header-price">
              <div className="name">
                <p>{searchedCoin.name}</p>
              </div>
              <div className="price">
                <p>{`$ ${formatNumber(searchedCoin.priceUsd)}`}</p>
              </div>
            </div>
          </div>
          <div className="coin-info-container-coin-info">
            <p className="coin-info-container-coin-info">
              Rank : <span>{searchedCoin.rank}</span>
            </p>
            <p className="coin-info-container-coin-info">
              Supply : <span>{formatNumber(searchedCoin.supply)}</span>
            </p>
            <p className="coin-info-container-coin-info">
              Market Cap :{" "}
              <span>{`$ ${formatNumber(searchedCoin.marketCapUsd)}`}</span>
            </p>
            {searchedCoin.maxSupply && (
              <p className="coin-info-container-coin-info">
                Max Supply: <span>{formatNumber(searchedCoin.maxSupply)}</span>
              </p>
            )}
          </div>
          <div className="coin-info-container-coin-btn">
            <Button label="Add" onClick={handleClick} />
          </div>
        </div>
      ) : (
        <h1>Error</h1>
      )}
    </div>
  );
};

export default CoinInfo;
