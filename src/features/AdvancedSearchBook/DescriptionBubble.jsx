import { useSharedState } from "./SharedStateProvider";

export function DescriptionBubble({ Obj }) {
  const { isVisibleDescription } = useSharedState();

  return (
    <div
      className={`flex flex-col items-center -mt-[71px] z-50 ${isVisibleDescription ? "visible" : "hidden"}`}
    >
      <div className="text-nowrap bg-white flex flex-col items-center rounded-[20px] shadow-[0_10px_6px_-5px_rgba(0,0,0,0.1),10px_0_4px_-8px_rgba(0,0,0,0.1)] py-[15px] px-[30px]">
        <p className="text-[14px] font-[300]">{Obj.description}</p>
      </div>
      <div className="flex">
        <div className="h-[20px] w-[40px] bg-white">
          <div className="bg-[#fff] h-[20px] w-[40px] rounded-tl-[100%_100%] shadow-[inset_0_10px_6px_-5px_rgba(0,0,0,0.12),inset_10px_0_4px_-8px_rgba(0,0,0,0.12)]"></div>
        </div>
        <div className="h-[20px] w-[40px] bg-white">
          <div className="bg-[#fff] h-[20px] w-[40px] rounded-tr-[100%_100%] shadow-[inset_0_10px_6px_-5px_rgba(0,0,0,0.12),inset_-10px_0_4px_-8px_rgba(0,0,0,0.12)]"></div>
        </div>
      </div>
    </div>
  );
}
