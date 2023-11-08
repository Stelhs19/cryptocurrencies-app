import React, { FC } from "react";
import "./CoinsGrid.scss";
import { CoinsContext } from "../../../App";
import { Coin } from "../../../models/Coin";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import NumberInput from "../../../components/NumberInput";
import { addCoin } from "../../../utils/AddCoin";
import { formatNumber } from "../../../utils/Utils";
import { updateTotalPrice } from "../../../utils/UpdateTotalPrice";

const CoinsGrid: FC = () => {
  const { data, setSearchId, setTotalPrice } = React.useContext(CoinsContext);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedCoin, setSelectedCoin] = React.useState<Coin | null>(null);
  const [inputValue, setInputValue] = React.useState(1);
  const navigate = useNavigate();

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

  const handleRowClick = (coin: Coin) => {
    setSelectedCoin(coin);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddButtonClick = () => {
    selectedCoin && addCoin(selectedCoin, inputValue);
    setInputValue(1);
    const updatePrice = updateTotalPrice();
    setTotalPrice(updatePrice);
    localStorage.setItem("totalPrice", updatePrice.toString());
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
                  <Button label="Add" onClick={() => handleRowClick(coin)} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <div className="modal-container">
          <p>{selectedCoin?.name}</p>
          <p>{`$${selectedCoin && formatNumber(selectedCoin.priceUsd)}`}</p>
          <div className="modal-container-input">
          <NumberInput
            value={inputValue}
            onValueChange={(value: number) => setInputValue(value)}
          />  
          </div>
          <Button
            label="Add"
            onClick={handleAddButtonClick}
            onClose={handleCloseModal}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CoinsGrid;
