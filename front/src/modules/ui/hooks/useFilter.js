import { useState, useEffect } from "react";

export const useFilter = (data, searchText, fields) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    let records = [...data];
    if (searchText.trim() !== "") {
      records = records.filter((record) =>
        fields.some((field) =>
          record[field]
            ?.toString()
            .toLowerCase()
            .includes(searchText.toLowerCase())
        )
      );
    }
    setFilteredData(records);
  }, [data, searchText, fields]);

  return {
    filteredData,
  };
};