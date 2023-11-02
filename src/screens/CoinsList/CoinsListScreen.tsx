import React, { FC } from "react";
import CoinsGrid from "./CoinsGrid/CoinsGrid";
import CoinsSort from "./CoinsSort/CoinsSort";
import CoinsSearch from "./CoinsSearch/CoinsSearch";
import { CoinsContext } from "../../App";



const CoinsListScreen: FC = () => {

  const { offset, isLoading, setOffset, setSearchId } = React.useContext(CoinsContext);

  return (
    <>
      <CoinsSearch />
      <CoinsSort />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <CoinsGrid />
      )}
      <button onClick={() => {setOffset(offset - 20); setSearchId("")}}>Back</button>
      <button onClick={() => {setOffset(offset + 20); setSearchId("")}}>Next</button>
    </>

    
  );
};

export default CoinsListScreen;
