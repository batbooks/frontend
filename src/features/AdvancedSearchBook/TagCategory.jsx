export function TagCategory({
  Obj,
  selected,
  addSelected,
  unselected,
  deleteUnselected,
}) {
  return (
    <button
      onClick={() => {
        addSelected([...selected, Obj]);
        deleteUnselected(
          unselected.filter((unselected) => unselected.title !== Obj.title)
        );
      }}
      title={Obj.description}
      className="btn !bg-[#2663CD]/80 !w-full !h-fit !mb-0 !mx-0 !rounded-[10px] py-[10px]"
    >
      <span className="span-btn !text-[12px] lg:!text-[14px] !font-[300]">{Obj.title}</span>
    </button>
  );
}
