import { useSharedState } from "./SharedStateProvider";

export function AvgScores({ setFilters }) {
  const { avgScoreFrom, setAvgScoreFrom, avgScoreTo, setAvgScoreTo } =
    useSharedState();

  return (
    <div className="flex flex-col gap-[17px] w-full lg:w-3/10">
      <h2 className="text-[20px] font-[300] ">میانگین امتیازات کتاب:</h2>
      <div className="flex lg:justify-between sm:justify-around justify-between 2xl:mr-[30px]">
        <div className="gap-[9px] flex items-center">
          <span className="text-[20px] font-[300] ">از:</span>
          <div className="flex items-center gap-[9px] relative group">
            <div className="flex-col absolute mb-[-5px] hidden group-hover:flex">
              <div className="flex flex-col items-center mb-[-4px]">
                <button
                  onClick={() => {
                    if (avgScoreFrom < avgScoreTo - 0.1) {
                      if (
                        (avgScoreFrom + 0.1).toFixed(1) ===
                        avgScoreTo.toFixed(1)
                      ) {
                        setFilters((filters) =>
                          filters?.filter(
                            (filter) =>
                              !filter.includes("میانگین امتیاز: از") &&
                              !filter.includes("میانگین امتیاز: تا")
                          )
                        );
                        setFilters((filters) => [
                          ...(filters || []),
                          `میانگین امتیاز: ${(avgScoreFrom + 0.1).toFixed(1)}`,
                        ]);
                      } else {
                        setFilters((filters) =>
                          filters?.filter(
                            (filter) => !filter.includes("میانگین امتیاز: از")
                          )
                        );
                        setFilters((filters) => [
                          ...(filters || []),
                          `میانگین امتیاز: از ${(avgScoreFrom + 0.1).toFixed(1)}`,
                        ]);
                      }
                      setAvgScoreFrom(avgScoreFrom + 0.1);
                    }
                  }}
                  className="rounded-full flex cursor-pointer z-2 w-[12.5px] h-[12.5px] mb-[-20px]"
                ></button>
                <img
                  src="/images/plus2.png"
                  alt="plus"
                  className="w-[25px] h-[25px]"
                />
              </div>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => {
                    if (avgScoreFrom > 1) {
                      if (avgScoreFrom.toFixed(1) === avgScoreTo.toFixed(1)) {
                        setFilters((filters) =>
                          filters?.filter(
                            (filter) => !filter.includes("میانگین امتیاز: ")
                          )
                        );
                        if (!(avgScoreTo <= 5.05 && avgScoreTo >= 5)) {
                          setFilters((filters) => [
                            ...(filters || []),
                            `میانگین امتیاز: تا ${avgScoreFrom.toFixed(1)}`,
                          ]);
                        }
                        if (!(avgScoreFrom <= 1.15 && avgScoreFrom >= 1.1)) {
                          setFilters((filters) => [
                            ...(filters || []),
                            `میانگین امتیاز: از ${(avgScoreFrom - 0.1).toFixed(1)}`,
                          ]);
                        }
                      } else {
                        setFilters((filters) =>
                          filters?.filter(
                            (filter) => !filter.includes("میانگین امتیاز: از")
                          )
                        );
                        if (!(avgScoreFrom <= 1.15 && avgScoreFrom >= 1.1))
                          setFilters((filters) => [
                            ...(filters || []),
                            `میانگین امتیاز: از ${(avgScoreFrom - 0.1).toFixed(1)}`,
                          ]);
                      }
                      setAvgScoreFrom(avgScoreFrom - 0.1);
                    }
                  }}
                  className="rounded-full flex cursor-pointer z-2 w-[12.5px] h-[12.5px] mb-[-20px]"
                ></button>
                <img
                  src="/images/minus2.png"
                  alt="minus"
                  className="w-[25px] h-[25px]"
                />
              </div>
            </div>
            <input
              dir="ltr"
              value={avgScoreFrom.toFixed(1)}
              disabled
              className="h-[40px] lg:w-[80px] md:w-[120px] w-[80px] bg-white rounded-[5px] text-center outline-[2px] outline-[#000000]/21"
            />
          </div>
        </div>
        <div className="gap-[9px] flex items-center">
          <span className="text-[20px] font-[300] ">تا:</span>
          <div className="flex items-center relative group">
            <div className="flex-col absolute mb-[-5px] hidden group-hover:flex">
              <div className="flex flex-col items-center mb-[-4px]">
                <button
                  onClick={() => {
                    if (avgScoreTo < 5) {
                      if (avgScoreFrom.toFixed(1) === avgScoreTo.toFixed(1)) {
                        setFilters((filters) =>
                          filters?.filter(
                            (filter) => !filter.includes("میانگین امتیاز: ")
                          )
                        );
                        if (!(avgScoreFrom <= 1.05 && avgScoreFrom >= 1)) {
                          setFilters((filters) => [
                            ...(filters || []),
                            `میانگین امتیاز: از ${avgScoreTo.toFixed(1)}`,
                          ]);
                        }
                        if (!(avgScoreTo <= 4.9 && avgScoreTo >= 4.85)) {
                          setFilters((filters) => [
                            ...(filters || []),
                            `میانگین امتیاز: تا ${(avgScoreTo + 0.1).toFixed(1)}`,
                          ]);
                        }
                      } else {
                        setFilters((filters) =>
                          filters?.filter(
                            (filter) => !filter.includes("میانگین امتیاز: تا")
                          )
                        );
                        if (!(avgScoreTo <= 4.9 && avgScoreTo >= 4.85))
                          setFilters((filters) => [
                            ...(filters || []),
                            `میانگین امتیاز: تا ${(avgScoreTo + 0.1).toFixed(1)}`,
                          ]);
                      }
                      setAvgScoreTo(avgScoreTo + 0.1);
                    }
                  }}
                  className="rounded-full flex cursor-pointer z-2 w-[12.5px] h-[12.5px] mb-[-20px]"
                ></button>
                <img
                  src="/images/plus2.png"
                  alt="plus"
                  className="w-[25px] h-[25px]"
                />
              </div>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => {
                    if (avgScoreTo > avgScoreFrom + 0.1) {
                      if (
                        (avgScoreTo - 0.1).toFixed(1) ===
                        avgScoreFrom.toFixed(1)
                      ) {
                        setFilters((filters) =>
                          filters?.filter(
                            (filter) =>
                              !filter.includes("میانگین امتیاز: از") &&
                              !filter.includes("میانگین امتیاز: تا")
                          )
                        );
                        setFilters((filters) => [
                          ...(filters || []),
                          `میانگین امتیاز: ${(avgScoreTo - 0.1).toFixed(1)}`,
                        ]);
                      } else {
                        setFilters((filters) =>
                          filters?.filter(
                            (filter) => !filter.includes("میانگین امتیاز: تا")
                          )
                        );
                        setFilters((filters) => [
                          ...(filters || []),
                          `میانگین امتیاز: تا ${(avgScoreTo - 0.1).toFixed(1)}`,
                        ]);
                      }
                      setAvgScoreTo(avgScoreTo - 0.1);
                    }
                  }}
                  className="rounded-full flex cursor-pointer z-2 w-[12.5px] h-[12.5px] mb-[-20px]"
                ></button>
                <img
                  src="/images/minus2.png"
                  alt="minus"
                  className="w-[25px] h-[25px]"
                />
              </div>
            </div>
            <input
              dir="ltr"
              value={avgScoreTo.toFixed(1)}
              disabled
              className="h-[40px] lg:w-[80px] md:w-[120px] w-[80px] bg-white rounded-[5px] text-center outline-[2px] outline-[#000000]/21"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
