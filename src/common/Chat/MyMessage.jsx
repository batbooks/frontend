export default function MyMessage({
  Message = "sdfdsfsd",
  UserId = 1,
  prevMessage = 0,
}) {
  return (
    <div className="px-3">
      <p className="text-sm">userName</p> 
      <div className="flex flex-row gap-3 ">
        {!prevMessage ? (
          <img className="w-10 h-10 rounded-full" src="./20.jpg" />
        ) : null}
        <section className="shadow-2xl max-w-[300px] bg-blue-200 px-4 py-1 rounded-lg lg:max-w-[400px] transition-all duration-200 text-right"> 
            <p className="ml-4"> تستیبلا ایبلا یبلت یتبل تیبت لتی بل تیبتل تیبل تیتبل تیبتل تیب تیبت لتی تل یتلت یت لیتل مصنبن لنین بلنیب لنیبن لینبلنیملنیمبنلمی لیم   </p>
            <p className="text-left">6:40</p>
        </section>
      </div>
    </div>
  );
}
