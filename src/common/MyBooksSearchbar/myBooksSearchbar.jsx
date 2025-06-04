export default function MyBooksSearchbar() {
  return (
    <div className="flex items-center">
      <input
        dir="rtl"
        className="w-[332px] py-[14px] pr-[26px] pl-[50px] z-1 outline-[2px] outline-[#000000]/7 bg-white rounded-[25px] placeholder:text-[14px] placeholder:font-[300] placeholder:text-[#265073] focus:outline-[2px] focus:outline-[#2663cd]"
        placeholder="جستجوی کتاب های شما"
      />
      <img
        src="/images/search.png"
        alt="search"
        className="w-[24px] h-[24px] z-2 ml-[15px] absolute"
      />
    </div>
  );
}
