import { useEffect, useRef } from "react";
import { useSharedState } from "./SharedStateProvider";

export function AvgScores({ setFilters, avg_from, avg_to }) {
  const { avgScoreFrom, setAvgScoreFrom, avgScoreTo, setAvgScoreTo } =
    useSharedState();
  const didRun = useRef(false);
  useEffect(() => {
    if (!didRun.current && avg_from) {
      setAvgScoreFrom(avg_from);
      if (avg_to && avg_from == avg_to) {
        setFilters((filters) => [
          ...(filters || []),
          `میانگین امتیاز: ${avg_from}`,
        ]);
      } else {
        setFilters((filters) => [
          ...(filters || []),
          `میانگین امتیاز: از ${avg_from}`,
        ]);
      }
    }
    if (!didRun.current && avg_to) {
      setAvgScoreTo(avg_to);
      setFilters((filters) => [
        ...(filters || []),
        `میانگین امتیاز: تا ${avg_to}`,
      ]);
    }
    didRun.current = true;
  }, []);
  const handleFromFilters = (score) => {
    setFilters((filters) =>
      filters?.filter((filter) => !filter.includes("میانگین امتیاز: "))
    );
    if (score === avgScoreTo) {
      setFilters((filters) => [...(filters || []), `میانگین امتیاز: ${score}`]);
    } else {
      if (score !== "1.0") {
        setFilters((filters) => [
          ...(filters || []),
          `میانگین امتیاز: از ${score}`,
        ]);
      }
      if (avgScoreTo !== "5.0") {
        setFilters((filters) => [
          ...(filters || []),
          `میانگین امتیاز: تا ${avgScoreTo}`,
        ]);
      }
    }
  };
  const handleToFilters = (score) => {
    setFilters((filters) =>
      filters?.filter((filter) => !filter.includes("میانگین امتیاز: "))
    );
    if (avgScoreFrom === score) {
      setFilters((filters) => [...(filters || []), `میانگین امتیاز: ${score}`]);
    } else {
      if (score !== "5.0") {
        setFilters((filters) => [
          ...(filters || []),
          `میانگین امتیاز: تا ${score}`,
        ]);
      }
      if (avgScoreFrom !== "1.0") {
        setFilters((filters) => [
          ...(filters || []),
          `میانگین امتیاز: از ${avgScoreFrom}`,
        ]);
      }
    }
  };
  return (
    <div className="flex flex-col gap-[17px] w-full  mb-3 sm:mb-0">
      <h2 className="text-[17px] font-[300] ">میانگین امتیازات کتاب:</h2>
      <div className="w-1/2 md:w-7/10 flex  lg:justify-between gap-3 justify-between sm:justify-start">
        <div className="gap-[9px] flex items-center ">
          <span className="text-[17px] font-[300] ">از:</span>
          <input
            dir="ltr"
            value={avgScoreFrom}
            onChange={(e) => {
              if (
                e.target.value === "" ||
                (!isNaN(parseFloat(e.target.value)) &&
                  e.target.value.length <= 3)
              ) {
                setAvgScoreFrom(e.target.value);
              }
            }}
            onBlur={() => {
              if (
                parseFloat(parseFloat(avgScoreFrom).toFixed(1)) < 1 ||
                avgScoreFrom.trim() === ""
              ) {
                setAvgScoreFrom("1.0");
                handleFromFilters("1.0");
              } else if (
                parseFloat(parseFloat(avgScoreFrom).toFixed(1)) >
                Number(avgScoreTo).toFixed(1)
              ) {
                setAvgScoreFrom(String(Number(avgScoreTo).toFixed(1)));
                handleFromFilters(String(Number(avgScoreTo).toFixed(1)));
              } else {
                setAvgScoreFrom(String(Number(avgScoreFrom).toFixed(1)));
                handleFromFilters(String(Number(avgScoreFrom).toFixed(1)));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (
                  parseFloat(parseFloat(avgScoreFrom).toFixed(1)) < 1 ||
                  avgScoreFrom.trim() === ""
                ) {
                  setAvgScoreFrom("1.0");
                  handleFromFilters("1.0");
                } else if (
                  parseFloat(parseFloat(avgScoreFrom).toFixed(1)) >
                  Number(avgScoreTo).toFixed(1)
                ) {
                  setAvgScoreFrom(String(Number(avgScoreTo).toFixed(1)));
                  handleFromFilters(String(Number(avgScoreTo).toFixed(1)));
                } else {
                  setAvgScoreFrom(String(Number(avgScoreFrom).toFixed(1)));
                  handleFromFilters(String(Number(avgScoreFrom).toFixed(1)));
                }
                e.target.blur();
              }
            }}
            className="h-[30px] lg:w-[60px] md:w-[120px] w-[80px] bg-white rounded-[5px] text-center outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663CD]"
          />
        </div>
        <div className="gap-[9px] flex items-center">
          <span className="text-[17px] font-[300] ">تا:</span>
          <input
            dir="ltr"
            value={avgScoreTo}
            onChange={(e) => {
              if (
                e.target.value === "" ||
                (!isNaN(parseFloat(e.target.value)) &&
                  e.target.value.length <= 3)
              ) {
                setAvgScoreTo(e.target.value);
              }
            }}
            onBlur={() => {
              if (
                parseFloat(parseFloat(avgScoreTo).toFixed(1)) > 5 ||
                avgScoreTo.trim() === ""
              ) {
                setAvgScoreTo("5.0");
                handleToFilters("5.0");
              } else if (
                parseFloat(parseFloat(avgScoreTo).toFixed(1)) <
                Number(avgScoreFrom).toFixed(1)
              ) {
                setAvgScoreTo(String(Number(avgScoreFrom).toFixed(1)));
                handleToFilters(String(Number(avgScoreFrom).toFixed(1)));
              } else {
                setAvgScoreTo(String(Number(avgScoreTo).toFixed(1)));
                handleToFilters(String(Number(avgScoreTo).toFixed(1)));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (
                  parseFloat(parseFloat(avgScoreTo).toFixed(1)) > 5 ||
                  avgScoreTo.trim() === ""
                ) {
                  setAvgScoreTo("5.0");
                  handleToFilters("5.0");
                } else if (
                  parseFloat(parseFloat(avgScoreTo).toFixed(1)) <
                  Number(avgScoreFrom).toFixed(1)
                ) {
                  setAvgScoreTo(String(Number(avgScoreFrom).toFixed(1)));
                  handleToFilters(String(Number(avgScoreFrom).toFixed(1)));
                } else {
                  setAvgScoreTo(String(Number(avgScoreTo).toFixed(1)));
                  handleToFilters(String(Number(avgScoreTo).toFixed(1)));
                }
                e.target.blur();
              }
            }}
            className="h-[30px] lg:w-[60px] md:w-[120px] w-[80px] bg-white rounded-[5px] text-center outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663CD]"
          />
        </div>
      </div>
    </div>
  );
}
