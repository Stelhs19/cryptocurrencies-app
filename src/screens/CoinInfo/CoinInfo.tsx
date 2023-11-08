import React, { FC } from "react";
import { SearchedCoinContext, CoinsContext } from "../../App";
import { formatNumber } from "../../utils/Utils";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import "./CoinInfo.scss";
import Modal from "../../components/Modal";
import { addCoin } from "../../utils/AddCoin";
import NumberInput from "../../components/NumberInput";
import { updateTotalPrice } from "../../utils/UpdateTotalPrice";

const CoinInfo: FC = () => {
  const { setTotalPrice } = React.useContext(CoinsContext);
  const { searchedCoin } = React.useContext(SearchedCoinContext);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(1);
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate("/");
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleAddButtonClick = () => {
    addCoin(searchedCoin, inputValue);
    setInputValue(1);
    const updatePrice = updateTotalPrice();
    setTotalPrice(updatePrice);
    localStorage.setItem("totalPrice", updatePrice.toString());
  };

  return (
    <>
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
                  Max Supply:{" "}
                  <span>{formatNumber(searchedCoin.maxSupply)}</span>
                </p>
              )}
            </div>
            <div className="coin-info-container-coin-btn">
              <Button label="Add" onClick={handleOpenModal} />
            </div>
          </div>
        ) : (
          <h1>Error</h1>
        )}
        <Modal isOpen={modalOpen} onClose={handleCloseModal}>
          <div className="modal-container">
            <p>{searchedCoin.name}</p>
            <p>{`$${searchedCoin && formatNumber(searchedCoin.priceUsd)}`}</p>
            <div className="modal-container-input">
              <NumberInput
                value={inputValue}
                onValueChange={(value: number) => setInputValue(value)}
              />
            </div>
            <div className="modal-container-add">
              <Button
                label="Add"
                onClick={handleAddButtonClick}
                onClose={handleCloseModal}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default CoinInfo;
