import React, { useEffect, useState } from "react";
import Navbar from "../../pages/Navbar";
import Footer from "../../common/Footer/Footer";
import Card from "../../common/forum/Card";
import { useParams } from "react-router";
import { Button } from "@material-tailwind/react";
import CustomModal from "./modal";
import Swal from "sweetalert2";

const Threads = () => {
  const [forumData, setForumData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const handleSubmitThread = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "http://127.0.0.1:8000/forum/threads/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: input1,
            text: input2,
            forum: forumId,
            status: "O",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("!!!مشکلی پیش اومد");
      }
      setTimeout(() => {
        Swal.fire({
          title:"ترد شما با موفقیت ایجاد شد",
          icon: "success",
          confirmButtonText: "باشه",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }, 100);
    } catch (err) {
      setTimeout(() => {
        Swal.fire({
          title: `${err.message}`,
          icon: "error",
          showCloseButton: true,
          showCancelButton: false,
          showConfirmButton: false,
        });
      }, 100);
    }
  };

  const [paginationLinks, setPaginationLinks] = useState({
    next: null,
    previous: null,
  });
  const { forumId } = useParams();

  const itemsPerPage = 10;

  const onSearch = () => {
    console.log("searched");
  };

  useEffect(() => {
    if (!forumId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        let url = `http://127.0.0.1:8000/forum/${forumId}/`;
        if (currentPage > 1) {
          url += `?page=${currentPage}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-center text-[#265073] font-bold text-2xl md:text-3xl mt-4 md:mt-[14px]">
          تالار گفتگو
        </h1>

        {/* Search Box */}

        <div className="flex justify-center md:justify-end px-4 mt-4 ">
          <Button
            className="flex items-center gap-2 mx-auto md:mr-20 bg-[#2663CD] rounded-[10px] text-[#ffffff] text-sm md:text-[16px] font-[400] py-2 md:py-[9px] px-4 md:px-[32px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
            onClick={handleOpen}
            variant="gradient"
          >
            <img
              src="/images/add_sign.svg"
              alt="add"
              className="w-4 h-4 md:w-5 md:h-5"
            />
            <span>ایجاد ترد</span>
          </Button>
        </div>

        {/* Results Section */}
        <h1
          dir="rtl"
          className="mr-4 md:mr-21 my-3 font-semibold text-lg md:text-xl"
        >
          نتایج جستجو:
        </h1>
        <div className="bg-transparent">
          <CustomModal
            open={open}
            setOpen={setOpen}
            handleSubmit={handleSubmitThread}
            input1={input1}
            setInput1={setInput1}
            input2={input2}
            setInput2={setInput2}
          />
        </div>
        <div
          dir="rtl"
          className="bg-[#a3d5ff] p-4 md:p-[20px] w-full md:w-[90%] mx-auto rounded-2xl"
        >
          {loading ? (
            <p className="text-center text-[#265073] text-base md:text-lg">
              در حال بارگذاری...
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-end">
                {forumData.length > 0 ? (
                  forumData.map((item) => <Card key={item.id} data={item} />)
                ) : (
                  <p className="col-span-1 md:col-span-2 text-center font-semibold text-base md:text-lg">
                    هیچ پستی یافت نشد.
                  </p>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div dir="rtl" className="flex justify-center mt-4 md:mt-6">
                  <nav className="inline-flex rounded-md shadow">
                    <button
                      onClick={() =>
                        paginate(currentPage > 1 ? currentPage - 1 : 1)
                      }
                      disabled={!paginationLinks.previous}
                      className="px-2 py-1 md:px-3 md:py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                    >
                      قبلی
                    </button>

                    {[...Array(totalPages).keys()].map((number) => (
                      <button
                        key={number + 1}
                        onClick={() => paginate(number + 1)}
                        className={`px-2 py-1 md:px-3 md:py-1 border-t border-b border-gray-300 text-sm md:text-base ${
                          currentPage === number + 1
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-500 hover:bg-gray-50"
                        }`}
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
                      className="px-2 py-1 md:px-3 md:py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
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
