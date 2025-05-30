import { useSharedState } from "./SharedStateProvider";

export function KeyWord({ filters, setFilters }) {
  const { keyword, setKeyword } = useSharedState();

  return (
    <div className="flex items-center gap-[9px] grow-1">
      <h2 className="text-[20px] font-[300]">عبارت کلیدی:</h2>
      <div className="relative group grow-1">
        <input
          className="p-[12px] w-[100%] bg-white text-[16px] font-[300] max-h-[40px] rounded-[6px] outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663CD] placeholder:text-[16px] placeholder:font-[300] placeholder:text-[#265073]"
          placeholder="جستجوی داستان براساس عبارت کلیدی خلاصه آن..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && keyword.length >= 3) {
              setFilters([...(filters || []), "کلید: " + keyword]);
              setKeyword("");
              e.target.blur();
            }
          }}
        />
        <p className="text-[14px] mt-[10px] mr-[12px] text-green-700 absolute group-focus-within:block hidden">
          جهت اعمال فیلتر Enter را بزنید
        </p>
      </div>
    </div>
  );
}
