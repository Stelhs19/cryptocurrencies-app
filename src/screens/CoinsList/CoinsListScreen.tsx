import React, { FC } from "react";
import CoinsGrid from "./CoinsGrid/CoinsGrid";
import CoinsSort from "./CoinsSort/CoinsSort";
import CoinsSearch from "./CoinsSearch/CoinsSearch";
import { CoinsContext } from "../../App";
import Loading from "../../components/Loading";
import "./CoinsListScreen.scss";
import Button from "../../components/Button";

const CoinsListScreen: FC = () => {
  const { offset, isLoading, setOffset, setSearchId, setSortType } =
    React.useContext(CoinsContext);

  const onClickNext = () => {
    setOffset(offset + 20);
    setSearchId("");
    scrollToTop();
    setSortType({
      id: 0,
      sortProperty: "Rating",
    })
  };

  const onClickBack = () => {
    setOffset(offset - 20);
    setSearchId("");
    scrollToTop();
    setSortType({
      id: 0,
      sortProperty: "Rating",
    })
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="coins-list-screen">
      <div className="coins-list-screen-filter">
        <div className="search">
          <CoinsSearch />
        </div>
        <div className="sort">
          <CoinsSort />
        </div>
      </div>
      <div className="pages">
        {isLoading ? <Loading /> : <CoinsGrid />}
        <div className="pages-btns">
          <Button label="Back" onClick={onClickBack} />
          <div className="spacer"></div>
          <Button label="Next" onClick={onClickNext} />
        </div>
      </div>
    </div>
  );
};

export default CoinsListScreen;
