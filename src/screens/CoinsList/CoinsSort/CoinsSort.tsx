import React, { FC } from "react";
import "./CoinsSort.scss";
import { Coin } from "../../../models/Coin";
import { CoinsContext } from "../../../App";

type ListsProps = {
  id: number,
  sortProperty: string
}

const CoinsSort: FC = () => {

  const { data, sortType, setSortType, setData} = React.useContext(CoinsContext);

  const lists = [
    { id: 0, sortProperty: "Rating" },
    { id: 1, sortProperty: "Price (ASC)" },
    { id: 2, sortProperty: "Price (DESC)" },
    { id: 3, sortProperty: "Market Cap (ASC)" },
    { id: 4, sortProperty: "Market Cap (DESC)" },
    { id: 5, sortProperty: "24h (ASC)" },
    { id: 6, sortProperty: "24h (DESC)" },
  ];

  const [isVisible, setIsVisible] = React.useState(false);


  const handleSelectedSortingOption = (
    dataTable: Coin[],
    list: ListsProps
  ) => {
    setSortType(list);
    setIsVisible(false);
    sortFunction(dataTable, list.sortProperty);
  };


  const sortFunction = (data: Coin[], key: string) => {
    switch (key) {
      case "Rating":
        setData(
          [...data].sort((a: Coin, b: Coin) => Number(a.rank) - Number(b.rank))
        );
        break;
      case "Price (ASC)":
        setData(
          [...data].sort(
            (a: Coin, b: Coin) => Number(a.priceUsd) - Number(b.priceUsd)
          )
        );
        break;
      case "Price (DESC)":
        setData(
          [...data].sort(
            (a: Coin, b: Coin) => Number(b.priceUsd) - Number(a.priceUsd)
          )
        );
        break;
      case "Market Cap (ASC)":
        setData(
          [...data].sort(
            (a: Coin, b: Coin) =>
              Number(a.marketCapUsd) - Number(b.marketCapUsd)
          )
        );
        break;
      case "Market Cap (DESC)":
        setData(
          [...data].sort(
            (a: Coin, b: Coin) =>
              Number(b.marketCapUsd) - Number(a.marketCapUsd)
          )
        );
        break;
      case "24h (ASC)":
        setData(
          [...data].sort(
            (a: Coin, b: Coin) =>
              Number(a.changePercent24Hr) - Number(b.changePercent24Hr)
          )
        );
        break;
      case "24h (DESC)":
        setData(
          [...data].sort(
            (a: Coin, b: Coin) =>
              Number(b.changePercent24Hr) - Number(a.changePercent24Hr)
          )
        );
        break;
      default:
        return data;
    }
  };

  return (
    <>
      <div>
        <p>
          Sort by:
          <span onClick={() => setIsVisible(!isVisible)}>
            {sortType.sortProperty}
          </span>
        </p>
      </div>
      {isVisible && (
        <div className="sort-container">
          <ul className="sort-container-ul">
            {lists.map((list, index) => (
              <li
                key={index}
                onClick={() => handleSelectedSortingOption(data, list)}
                className={
                  sortType.sortProperty === list.sortProperty ? "active" : ""
                }
              >
                {list.sortProperty}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default CoinsSort;
