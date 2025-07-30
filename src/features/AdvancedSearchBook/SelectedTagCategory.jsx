export function SelectedTagCategory({
  Obj,
  selected,
  addSelected,
  unselected,
  deleteUnselected,
}) {
  return (
    <button
      onClick={() => {
        deleteUnselected([...unselected, Obj]);
        addSelected(
          selected.filter((selected) => selected.title !== Obj.title)
        );
      }}
      title={Obj.description}
      className="btn !bg-[#4D8AFF] !text-black hover:!text-white before:!bg-[#2663CD] !w-full !h-fit !mb-0 !mx-0 !rounded-[10px] py-[10px] !justify-center"
    >
      <span className="span-btn !text-[12px] lg:!text-[14px]   !font-[300]">{Obj.title}</span>
    </button>
  );
}
