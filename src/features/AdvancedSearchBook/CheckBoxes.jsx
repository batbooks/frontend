import { useSharedState } from "./SharedStateProvider";

export function CheckBoxes({ addFilter, filters }) {
  const { checkedNum, setCheckedNum } = useSharedState();

  return (
    <div className="flex flex-col gap-[17px]">
      <h2 className="text-[20px] font-[300] ">وضعیت کتاب:</h2>
      <div className="flex mr-[30px] gap-[25px]">
        <div className="flex items-center gap-[5px]">
          <button
            onClick={() => {
              if (checkedNum === -1) {
                setCheckedNum(0);
                addFilter([...(filters || []), "وضعیت: در حال تالیف"]);
              } else if (checkedNum === 0) {
                setCheckedNum(-1);
                addFilter(
                  filters?.filter((filter) => filter !== "وضعیت: در حال تالیف")
                );
              } else {
                setCheckedNum(0);
                addFilter((filters) =>
                  filters?.filter(
                    (filter) =>
                      filter !== "وضعیت: به اتمام رسیده" &&
                      filter !== "وضعیت: متوقف شده"
                  )
                );
                addFilter((filters) => [
                  ...(filters || []),
                  "وضعیت: در حال تالیف",
                ]);
              }
            }}
            className="rounded-full cursor-pointer h-[30px] w-[30px] hover:bg-[#E5E5E5]/30 transition-colors duration-400 active:bg-[#E5E5E5]/50 active:duration-100"
          >
            {checkedNum === 0 ? (
              <img
                src="/images/checked.png"
                alt="checked"
                className="h-[18px] w-[18px] mx-auto"
              />
            ) : (
              <img
                src="/images/unchecked.png"
                alt="unchecked"
                className="h-[18px] w-[18px] mx-auto"
              />
            )}
          </button>
          <span className="text-[20px]  font-[400]">در حال تالیف</span>
        </div>
        <div className="flex items-center gap-[5px]">
          <button
            onClick={() => {
              if (checkedNum === -1) {
                setCheckedNum(1);
                addFilter([...(filters || []), "وضعیت: به اتمام رسیده"]);
              } else if (checkedNum === 1) {
                setCheckedNum(-1);
                addFilter(
                  filters?.filter(
                    (filter) => filter !== "وضعیت: به اتمام رسیده"
                  )
                );
              } else {
                setCheckedNum(1);
                addFilter((filters) =>
                  filters?.filter(
                    (filter) =>
                      filter !== "وضعیت: در حال تالیف" &&
                      filter !== "وضعیت: متوقف شده"
                  )
                );
                addFilter((filters) => [
                  ...(filters || []),
                  "وضعیت: به اتمام رسیده",
                ]);
              }
            }}
            className="rounded-full cursor-pointer h-[30px] w-[30px] hover:bg-[#E5E5E5]/30 transition-colors duration-400 active:bg-[#E5E5E5]/50 active:duration-100"
          >
            {checkedNum === 1 ? (
              <img
                src="/images/checked.png"
                alt="checked"
                className="h-[18px] w-[18px] mx-auto"
              />
            ) : (
              <img
                src="/images/unchecked.png"
                alt="unchecked"
                className="h-[18px] w-[18px] mx-auto"
              />
            )}
          </button>
          <span className="text-[20px]  font-[400]">به اتمام رسیده</span>
        </div>
        <div className="flex items-center gap-[5px]">
          <button
            onClick={() => {
              if (checkedNum === -1) {
                setCheckedNum(2);
                addFilter([...(filters || []), "وضعیت: متوقف شده"]);
              } else if (checkedNum === 2) {
                setCheckedNum(-1);
                addFilter(
                  filters?.filter((filter) => filter !== "وضعیت: متوقف شده")
                );
              } else {
                setCheckedNum(2);
                addFilter((filters) =>
                  filters?.filter(
                    (filter) =>
                      filter !== "وضعیت: در حال تالیف" &&
                      filter !== "وضعیت: به اتمام رسیده"
                  )
                );
                addFilter((filters) => [
                  ...(filters || []),
                  "وضعیت: متوقف شده",
                ]);
              }
            }}
            className="rounded-full cursor-pointer h-[30px] w-[30px] hover:bg-[#E5E5E5]/30 transition-colors duration-400 active:bg-[#E5E5E5]/50 active:duration-100"
          >
            {checkedNum === 2 ? (
              <img
                src="/images/checked.png"
                alt="checked"
                className="h-[18px] w-[18px] mx-auto"
              />
            ) : (
              <img
                src="/images/unchecked.png"
                alt="unchecked"
                className="h-[18px] w-[18px] mx-auto"
              />
            )}
          </button>
          <span className="text-[20px]  font-[400]">متوقف شده</span>
        </div>
      </div>
    </div>
  );
}
