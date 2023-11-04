import { Coin } from "./Coin";
import React from "react";

export type SortPropertyType = {
  id: number;
  sortProperty: string;
};

export type ContextTypeCoin = {
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

export type ContextTypeSearchedCoin = {
  searchedCoin: Coin;
  setSearchedCoin: React.Dispatch<React.SetStateAction<Coin>>;
};

export const initialContextValueSearchedCoin: ContextTypeSearchedCoin = {
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

export const initialContextValue: ContextTypeCoin = {
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

export const CoinsContext = React.createContext<ContextTypeCoin>(
  initialContextValue as ContextTypeCoin
);

export const SearchedCoinContext = React.createContext<ContextTypeSearchedCoin>(
  initialContextValueSearchedCoin as ContextTypeSearchedCoin
);
