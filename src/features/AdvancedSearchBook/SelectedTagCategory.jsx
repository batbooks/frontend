import { useState } from "react";

export function SelectedTagCategory({
  Obj,
  selected,
  addSelected,
  unselected,
  deleteUnselected,
}) {
  const [isVisibleDescription, setIsVisibleDescription] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`flex flex-col items-center absolute top-[-71px] ${isVisibleDescription ? "visible" : "hidden"}`}
      >
        <div className="text-nowrap bg-white flex flex-col items-center rounded-[20px] shadow-[0_10px_6px_-5px_rgba(0,0,0,0.1),10px_0_4px_-8px_rgba(0,0,0,0.1)] py-[15px] px-[30px]">
          <p className="text-[14px] font-[300]">{Obj.description}</p>
        </div>
        <div className="flex">
          <div className="h-[20px] w-[40px] bg-white">
            <div className="bg-[#fff] h-[20px] w-[40px] rounded-tl-[100%_100%] shadow-[inset_0_10px_6px_-5px_rgba(0,0,0,0.12),inset_10px_0_4px_-8px_rgba(0,0,0,0.12)]"></div>
          </div>
          <div className={`h-[20px] w-[40px] bg-white`}>
            <div
              className={`bg-[#fff] h-[20px] w-[40px] rounded-tr-[100%_100%] shadow-[inset_0_10px_6px_-5px_rgba(0,0,0,0.12),inset_-10px_0_4px_-8px_rgba(0,0,0,0.12)]`}
            ></div>
          </div>
        </div>
      </div>
      <button
        onMouseEnter={() => setIsVisibleDescription(true)}
        onMouseLeave={() => setIsVisibleDescription(false)}
        onClick={() => {
          deleteUnselected([...unselected, Obj]);
          addSelected(
            selected.filter((selected) => selected.title !== Obj.title)
          );
        }}
        title={Obj.description}
        className="btn !bg-[#4D8AFF] !text-black hover:!text-white before:!bg-[#2663CD] !w-full !h-fit !mb-0 !mx-0 !rounded-[10px] py-[10px]"
      >
        <span className="span-btn !text-[14px] !font-[300]">{Obj.title}</span>
      </button>
    </div>
  );
}
