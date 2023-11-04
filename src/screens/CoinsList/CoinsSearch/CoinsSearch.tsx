import React, { FC } from "react";
import { CoinsContext } from "../../../App";
import TextInput from "../../../components/TextInput";

const CoinsSearch: FC = () => {
  const { setData, originalData } = React.useContext(CoinsContext);

  const [query, setQuery] = React.useState("");

  const handleSearchChange = (query: string) => {
    setQuery(query);
    if (query === "") {
      setData(originalData);
    } else {
      const filteredData = originalData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setData(filteredData);
    }
  };

  return (
    <div>
      <TextInput
        placeholder="Search by name"
        value={query}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default CoinsSearch;
