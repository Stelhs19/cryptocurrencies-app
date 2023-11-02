import React, { FC } from "react";
import CoinsListScreen from "./screens/CoinsList/CoinsListScreen";
import { Routes, Route } from "react-router-dom";
import CoinInfo from "./screens/CoinInfo/CoinInfo";
import { Coin } from "./models/Coin";
import { filterData } from "./utils/Utils";

  type SortPropertyType = {
  id: number;
  sortProperty: string;
};

type ContextType = {
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

const initialContextValue: ContextType = {
  originalData: [],
  data: [],
  sortType: {id: 0, sortProperty: ""},
  offset: 0,
  searchId: "",
  isLoading: true,
  setData: () => [],
  setSortType: () => {},
  setOffset: () => 0,
  setSearchId: () => ""
};

export const CoinsContext = React.createContext<ContextType>(initialContextValue as ContextType);


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
  const search = searchId ? `/search=${searchId}` : "";

  const contextValue: ContextType = { originalData, data, sortType, offset, searchId, isLoading, setData, setSortType, setOffset, setSearchId };

  React.useEffect(() => {
    setIsLosding(true)
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets/${search}?&limit=100&offset=${offset}`);
        const result = await response.json();
        const filteredData = filterData(result.data);
        setOriginalData(filteredData);
        setData([...filteredData]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    setIsLosding(false);
  }, [search, offset]);


  return (
    <CoinsContext.Provider
      value={contextValue}
    >
      <Routes>
        <Route path="/" element={<CoinsListScreen />} />
        <Route path="/:id" element={<CoinInfo />} />
      </Routes>
    </CoinsContext.Provider>
  );
};

export default App;
