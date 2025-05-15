import React, { useEffect, useState } from "react";
import Navbar from "../../common/Navbar/navbar";
import Footer from "../../common/Footer/Footer";
import Card from "../../common/forum/Card";
import LongParagraphInput from "../../common/LongParagraphInput/longParagraphInput";
import { useParams } from "react-router";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import CustomModal from "./modal";
// import DatePicker from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";

const Threads = () => {
  const [forumData, setForumData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [input1, setInput1] = useState("");
  //const [input2, setInput2] = useState("");
  //const [date, setDate] = useState(null);
  const [paginationLinks, setPaginationLinks] = useState({
    next: null,
    previous: null,
  });
  const { forumId } = useParams();

  const itemsPerPage = 10;

  const onSearch = () => {
    console.log("searched");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Input 1:", input1);
    //console.log("Input 2:", input2);
    //console.log("Date:", date?.format());
  };
  // Fetch forum data
  useEffect(() => {
    if (!forumId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        let url = `http://45.158.169.198/forum/${forumId}/`;
        if (currentPage > 1) {
          url += `?page=${currentPage}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        if (data.results && Array.isArray(data.results)) {
          setForumData(data.results);
          setTotalItems(data.count);
          setPaginationLinks({
            next: data.links.next,
            previous: data.links.previous,
          });
        } else {
          setForumData([]);
          setTotalItems(0);
          setPaginationLinks({
            next: null,
            previous: null,
          });
        }

        console.log("API Response:", data);
      } catch (error) {
        console.error("Failed to load forum data:", error);
        setForumData([]);
        setTotalItems(0);
        setPaginationLinks({
          next: null,
          previous: null,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [forumId, currentPage]);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  // Calculate total pages based on server-side count
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      <Navbar />
      <div>
        <h1 className="text-center text-[#265073] font-bold text-3xl mt-[14px]">
          تالار گفتگو
        </h1>

        {/* Search Box */}
        <div className="flex items-center justify-center bg-[#D9F0FF] p-6">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="نام کتاب ، نام تالار ، نام نویسنده"
              dir="rtl"
              className="bg-white w-full px-12 py-2 rounded-full border border-gray-300 shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            />
            <svg
              onClick={onSearch}
              className="absolute left-3 top-2 w-6 h-6 text-black cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              fill="currentColor"
            >
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
            </svg>
          </div>
        </div>
        <div className=" flex justify-end">
          <Button
            className="flex items-center gap-2 mr-20  bg-[#2663CD] rounded-[10px] text-[#ffffff] text-[16px] font-[400] py-[9px] px-[32px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto "
            onClick={handleOpen}
            variant="gradient"
          >
            <img src="/src/assets/images/add_sign.svg" alt="add" />
            <span>ایجاد ترد</span>
          </Button>
        </div>

        {/* Results Section */}
        <h1 dir="rtl" className="mr-21 my-3.5 font-semibold text-xl">
          نتایج جستجو
        </h1>
        <div className="bg-transparent">
          <CustomModal
            open={open}
            setOpen={setOpen}
            handleSubmit={handleSubmit}
            input1={input1}
            setInput1={setInput1}
           // input2={input2}
            //setInput2={setInput2}
            //date={date}
            //setDate={setDate}
          />
        </div>
        <div
          dir="rtl"
          className="bg-[#a3d5ff] p-[20px] w-[90%] mx-auto rounded-2xl"
        >
          {loading ? (
            <p className="text-center text-[#265073] text-lg">
              در حال بارگذاری...
            </p>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 place-items-end ">
                {forumData.length > 0 ? (
                  forumData.map((item) => <Card key={item.id} data={item} />)
                ) : (
                  <p className="col-span-2 text-center text-[#265073] text-lg">
                    هیچ پستی یافت نشد.
                  </p>
                )}
              </div>

              {/* Pagination - Only show if more than 1 page */}
              {totalPages > 1 && (
                <div dir="rtl" className="flex justify-center mt-6">
                  <nav className="inline-flex rounded-md shadow">
                    <button
                      onClick={() =>
                        paginate(currentPage > 1 ? currentPage - 1 : 1)
                      }
                      disabled={!paginationLinks.previous}
                      className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      قبلی
                    </button>

                    {[...Array(totalPages).keys()].map((number) => (
                      <button
                        key={number + 1}
                        onClick={() => paginate(number + 1)}
                        className={`px-3 py-1 border-t border-b border-gray-300 ${currentPage === number + 1 ? "bg-blue-500 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                      >
                        {number + 1}
                      </button>
                    ))}

                    <button
                      onClick={() =>
                        paginate(
                          currentPage < totalPages
                            ? currentPage + 1
                            : totalPages
                        )
                      }
                      disabled={!paginationLinks.next}
                      className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      بعدی
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Threads;
