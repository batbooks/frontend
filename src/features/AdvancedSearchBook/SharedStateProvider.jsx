import { createContext, useState, useContext } from "react";

const SharedStateContext = createContext();
export function SharedStateProvider({ children }) {
  const [isVisibleDescription, setIsVisibleDescription] = useState(false);
  const [checkedNum, setCheckedNum] = useState(-1);
  const [avgScoreFrom, setAvgScoreFrom] = useState(1.0);
  const [avgScoreTo, setAvgScoreTo] = useState(5.0);
  const [writerName, setWriterName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  return (
    <SharedStateContext.Provider
      value={{
        isVisibleDescription,
        setIsVisibleDescription,
        checkedNum,
        setCheckedNum,
        avgScoreFrom,
        setAvgScoreFrom,
        avgScoreTo,
        setAvgScoreTo,
        writerName,
        setWriterName,
        keyword,
        setKeyword,
        dateFrom,
        setDateFrom,
        dateTo,
        setDateTo,
      }}
    >
      {children}
    </SharedStateContext.Provider>
  );
}
export function useSharedState() {
  return useContext(SharedStateContext);
}
