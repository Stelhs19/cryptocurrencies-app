import React, { FC } from "react";
import CoinsListScreen from "./screens/CoinsList/CoinsListScreen";
import { Routes, Route } from "react-router-dom";
import { Coin } from "./models/Coin";
import CoinInfo from "./screens/CoinInfo/CoinInfo";
import { filterData } from "./utils/Utils";
import Header from "./components/Header";

type SortPropertyType = {
  id: number;
  sortProperty: string;
};

type ContextTypeCoin = {
  originalData: Coin[];
  data: Coin[];
  sortType: SortPropertyType;
  offset: number;
  searchId: string;
  isLoading: boolean;
  setData: React.Dispatch<React.SetStateAction<Coin[]>>;
  setSortType: React.Dispatch<React.SetStateAction<SortPropertyType>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setSearchId: React.Dispatch<React.SetStateAction<string>>;
};

const initialContextValue: ContextTypeCoin = {
  originalData: [],
  data: [],
  sortType: { id: 0, sortProperty: "" },
  offset: 0,
  searchId: "",
  isLoading: true,
  setData: () => [],
  setSortType: () => {},
  setOffset: () => 0,
  setSearchId: () => "",
};

type ContextTypeSearchedCoin = {
  searchedCoin: Coin;
  setSearchedCoin: React.Dispatch<React.SetStateAction<Coin>>;
};

const initialContextValueSearchedCoin: ContextTypeSearchedCoin = {
  searchedCoin: {
    id: "",
    rank: "",
    symbol: "",
    name: "",
    supply: "",
    maxSupply: null,
    marketCapUsd: "",
    volumeUsd24Hr: "",
    priceUsd: "",
    changePercent24Hr: "",
    vwap24Hr: "",
  },
  setSearchedCoin: () => {},
};

export const CoinsContext = React.createContext<ContextTypeCoin>(
  initialContextValue as ContextTypeCoin
);

export const SearchedCoinContext = React.createContext<ContextTypeSearchedCoin>(
  initialContextValueSearchedCoin as ContextTypeSearchedCoin
);

const App: FC = () => {
  const [originalData, setOriginalData] = React.useState<Coin[]>([]);
  const [data, setData] = React.useState<Coin[]>([]);
  const [isLoading, setIsLosding] = React.useState(true);
  const [sortType, setSortType] = React.useState({
    id: 0,
    sortProperty: "Rating",
  });
  const [offset, setOffset] = React.useState(0);
  const [searchId, setSearchId] = React.useState("");
  const [searchedCoin, setSearchedCoin] = React.useState<Coin>({
    id: "",
    rank: "",
    symbol: "",
    name: "",
    supply: "",
    maxSupply: null,
    marketCapUsd: "",
    volumeUsd24Hr: "",
    priceUsd: "",
    changePercent24Hr: "",
    vwap24Hr: "",
  });

  const search = searchId ? `${searchId}` : "";

  const contextValue: ContextTypeCoin = {
    originalData,
    data,
    sortType,
    offset,
    searchId,
    isLoading,
    setData,
    setSortType,
    setOffset,
    setSearchId,
  };

  const contextSearchedCoinValue: ContextTypeSearchedCoin = {
    searchedCoin,
    setSearchedCoin,
  };

  React.useEffect(() => {
    setIsLosding(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coincap.io/v2/assets/${search}?&limit=100&offset=${offset}`
        );
        const result = await response.json();
        if (search !== "") {
          setSearchedCoin(result.data);
        } else {
          const filteredData = filterData(result.data);
          setOriginalData(filteredData);
          setData([...filteredData]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    setIsLosding(false);
  }, [search, offset]);

  return (
    <CoinsContext.Provider value={contextValue}>
      <SearchedCoinContext.Provider value={contextSearchedCoinValue}>
        <div>
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<CoinsListScreen />} />
          <Route path="/:id" element={<CoinInfo />} />
        </Routes>
      </SearchedCoinContext.Provider>
    </CoinsContext.Provider>
  );
};

export default App;
