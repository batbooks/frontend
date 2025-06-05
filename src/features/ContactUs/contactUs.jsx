import Footer from "/src/common/Footer/Footer";
import Navbar from "../../common/Navbar/navbar.jsx";
import Navbar from "../../pages/Navbar";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
function ContactUs() {
  return (
    <>
      <Navbar />
      <main
        className="flex flex-col items-center gap-5 my-3 justify-center"
        dir="rtl"
      >
        <h1 className="font-bold text-[#1A365D] text-2xl md:text-3xl">
          ارتباط با ما
        </h1>
        <div className="bg-[#A4C0ED] text-sm md:text-base rounded-xl p-4 flex flex-col gap-5 mx-3 md:mx-6 shadow-[0_0_5px_#000]">
          <p>
            اگر پرسش، پیشنهاد یا انتقادی دارید، حتما با ما در میان
            بگذارید.کارشناسان ما در اسرع وقت پاسخگوی شما خواهند بود.
          </p>
          <div className="flex flex-row gap-1.5">
            <FiPhone className="mt-0.5" color="blue" />
            <p className="font-bold"> تلفن: </p>
            <span className=" ">53227747 - (021)</span>
          </div>
          <div className="flex flex-row gap-1.5">
            <FiMail className="mt-0.5" color="blue" />
            <p className="font-bold">ایمیل: </p>
            <span className=" ">info@batbooks.ir</span>
          </div>
          <div className="flex flex-row gap-1.5">
            <div className="flex flex-row gap-1.5">
              <FiMapPin className="mt-0.5" color="blue" />
              <p className="font-bold">آدرس:</p>
            </div>
            <span className=" ">
              تهران، میدان رسالت، دانشگاه علم و صنعت ایران، خیابان هنگام، خیابان
              دانشگاه
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
export default ContactUs;
