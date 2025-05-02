import { useState } from "react";
import LongParagraphInput from "../../../common/LongParagraphInput/longParagraphInput";
import Loading from "../../../common/Loading/Loading";
import Swal from "sweetalert2";

export default function EditProfile({ setEditClicked }) {
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectValue, setIsSelectValue] = useState("--انتخاب کنید--");
  const [selectedFile, setSelectedFile] = useState(null);
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeInfo = async () => {
    setLoading(true);
    const token = localStorage.getItem("access_token");
    try {
      const formData = new FormData();
      const formData2 = new FormData();
      if (bio) formData.append("bio", bio);
      if (selectValue === "مرد") formData.append("gender", "male");
      else if (selectValue === "زن") formData.append("gender", "female");
      if (selectedFile) formData.append("image", selectedFile);
      if (userName) formData2.append("username", userName);
      if (formData) {
        const response = await fetch(`/api/user/info/change/update/`, {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("درخواست موفق نبود");
        }
      }

      if (formData2) {
        const response = await fetch(`/api/user/info/change/username/`, {
          method: "PUT",
          body: formData2,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("درخواست موفق نبود");
        }
      }

      if (!formData && !formData2) throw new Error("هیچ تغییراتی انجام نشده!");
    } catch (error) {
      console.error("خطا در ارسال به سرور:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  if (loading) {
    return (
      <div className="h-[100vh] grid place-items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="z-1 absolute m-auto w-[806px] h-[747.6px] rounded-[36px] bg-[#A4C0ED] shadow-lg shadow-[#000000]/25 border-[2px] border-[#000000]/21 pl-[69.4px] pr-[69px] pt-[49px] pb-[87.6px]"
    >
      <img
        className="absolute w-[420px] h-[594px] bottom-0 left-0 ml-[10.2px] z-2"
        src="/src/assets/images/mid_left.png"
        alt="midleft"
      />
      <button
        onClick={() => setEditClicked(false)}
        className="absolute rounded-full cursor-pointer h-[44px] w-[44px] right-[15px] top-[15px] hover:bg-[#E5E5E5]/40 pl-[2px] transition-colors duration-400 active:bg-[#E5E5E5]/90 active:duration-100"
      >
        <img
          src="/src/assets/images/X_sign.svg"
          alt="X"
          className="z-2 w-[22px] h-[22px] m-auto"
        />
      </button>
      <div className="z-2">
        <h1 className="text-[24px] font-[700] text-[#1A365D] mb-[43.4px] z-3">
          ویرایش پروفایل
        </h1>

        <form className="flex flex-col gap-[28.8px] z-3">
          <div className="flex gap-[36px] z-4">
            <div className="flex flex-col z-5">
              <label className="text-[#000000]/70 text-[16.8px] font-[400] mb-[0.3px] z-6">
                نام کاربری
              </label>
              <input
                value={userName}
                onChange={(e) => {
                  e.preventDefault();
                  setUserName(e.target.value);
                }}
                className="bg-[#ffffff] w-[315.6px] h-[52.8px] text-[15px] rounded-[12px] px-[25.6px] outline-[2px] outline-[#000000]/21 z-6"
              ></input>
            </div>
            <div className="flex flex-col z-5">
              <label className="text-[#000000]/70 text-[16.8px] font-[400] mb-[0.3px] z-6">
                جنسیت
              </label>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsSelectOpened(!isSelectOpened);
                }}
                onBlur={(e) => {
                  e.preventDefault();
                  setTimeout(() => {
                    setIsSelectOpened(false);
                  }, 250);
                }}
                className={`z-6 flex bg-[#ffffff] w-[315.6px] h-[52.8px] ${isSelectOpened ? "rounded-t-[12px]" : "rounded-[12px]"} pl-[25.6px] pr-[20.6px] text-[15px] ${selectValue !== "--انتخاب کنید--" ? "text-[#000000]" : "text-[#000000]/50"} cursor-pointer outline-[2px] outline-[#000000]/21`}
              >
                <div className="flex items-center hover:cursor-pointer z-7">
                  <img
                    src="/images/arrow.png"
                    alt="arrow"
                    className="w-[24px] h-[24px] z-8"
                  ></img>
                  <span className="z-8">{selectValue}</span>
                </div>
              </button>
              <ul
                className={`flex flex-col justify-between absolute bg-[#ffffff] w-[315.6px] mt-[78.1px] h-[105.6px] outline-[2px] outline-[#000000]/21 z-9 divide-y divide-[#2F4F4F]/50 rounded-b-[12px] ${isSelectOpened ? "visible" : "hidden"}`}
              >
                <li className="grow-1 flex z-10">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSelectValue("مرد");
                    }}
                    className="flex pr-[20.6px] text-[15px] text-[#000000]/70 w-full h-full cursor-pointer hover:bg-[#2663cd]/90 hover:cursor-pointer active:outline-none z-11"
                  >
                    <span className="left-auto my-auto font-bold z-12">
                      مرد
                    </span>
                  </button>
                </li>
                <li className="grow-1 flex z-10 rounded-b-[12px]">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSelectValue("زن");
                    }}
                    className="z-11 flex pr-[20.6px] text-[15px] rounded-b-[12px] text-[#000000]/70 w-full h-full cursor-pointer hover:bg-[#2663cd]/90 hover:cursor-pointer active:outline-none"
                  >
                    <span className="z-12 left-auto my-auto font-bold">زن</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col z-2">
            <label className="text-[#000000]/70 text-[16.8px] font-[400] mb-[0.3px] z-3">
              عکس پروفایل
            </label>
            <div className="bg-[#ffffff] w-[667.2px] py-[8.5px] text-[15px] rounded-[12px] px-[25.6px] outline-[2px] outline-[#000000]/21 z-3 flex items-center gap-[10px]">
              <label
                htmlFor="image-input"
                className="bg-[#DDDDDD] rounded-[5px] py-[5px] px-[22.5px] border-[2px] border-[#000000]/31 cursor-pointer text-[17px] font-[400] z-4"
              >
                انتخاب فایل
              </label>
              <input
                className="hidden z-4"
                id="image-input"
                type="file"
                onChange={handleFileChange}
                accept=".png,.jpg,.jpeg"
              />

              {selectedFile ? (
                <span className="text-[17px] font-[400] z-4">
                  {selectedFile.name}
                </span>
              ) : (
                <span className="text-[17px] font-[400] z-4">
                  فایلی انتخاب نشده است
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col z-2">
            <label className="text-[#000000]/70 text-[16.8px] font-[400] mb-[0.3px] z-3">
              درباره من
            </label>
            <div className="w-[667.2px] h-[211.2px]">
              <LongParagraphInput
                placeholder={"چند جمله درباره خودتان بنویسید..."}
                setinputValue={setBio}
              />
            </div>
          </div>

          <button
            onClick={async (e) => {
              await e.preventDefault();
              await handleChangeInfo();
              Swal.fire({
                title: "موفقیت",
                text: "اطلاعات کاربری با موفقیت تغییر یافت",
                icon: "success",
                confirmButtonText: "بنازم",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            }}
            className="z-4 bg-[#2663cd] text-[#ffffff] items-center text-[16.8px] font-[400] w-[213.6px] outline-[2px] outline-[#000000]/21 py-[13.9px] rounded-[12px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
          >
            اعمال تغییرات
          </button>
        </form>
      </div>
    </div>
  );
}
