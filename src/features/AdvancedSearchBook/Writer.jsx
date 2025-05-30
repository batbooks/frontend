import { useSharedState } from "./SharedStateProvider";

export function Writer({ filters, setFilters }) {
  const { writerName, setWriterName } = useSharedState();

  return (
    <div className="flex flex-col gap-[17px]">
      <h2 className="text-[20px] font-[300]">نام نویسنده:</h2>
      <div className="relative group">
        <input
          onChange={(e) => setWriterName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && writerName.length >= 3) {
              setFilters([...(filters || []), "نویسنده: " + writerName]);
              setWriterName("");
              e.target.blur();
            }
          }}
          value={writerName}
          placeholder="نام نویسنده"
          className=" mr-[30px] px-[18px] bg-white w-[287px] h-[43px]  rounded-[6px] outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663CD] placeholder:text-[16px] placeholder:font-[300] placeholder:text-[#265073]"
        />
        <p className="text-[14px] text-green-700 mr-[48px] absolute pt-[10px] group-focus-within:block hidden">
          جهت اعمال فیلتر Enter را بزنید
        </p>
      </div>
    </div>
  );
}
