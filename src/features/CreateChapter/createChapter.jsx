import React from "react";
import Navbar from "/src/common/Navbar/navbar"
import Footer from "../../common/Footer/footer";

const CreateChapter = () => {
    return ( 
        <>  

        <Navbar hasLogined={true}/>
        <div className="m-auto pt-[126px] pb-[117px] bg-[#D9F0FF]">
            <div dir="rtl" style={{backgroundColor:"#A4C0ED", width: "1170px", borderRadius: "30px"}} className="mx-auto flex flex-col px-[75px] pt-[27px] pb-[72px] shadow-lg border-[2px] border-[#000000]/21">
                    <div className="flex justify-around">
                    <button className="mb-[27px] flex items-center w-[225px] h-[38px] bg-[#2663CD] rounded-[40px] gap-[10px] justify-center text-[#ffffff] text-[15px] font-[400] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                        <span>اضافه کردن فصل جدید</span>
                        <img src="/src/assets/images/add_sign.svg" alt="add" className="w-[22px] h-[22px]" />
                    </button>
                    <div className="flex gap-[10px]">
                    <button className="mb-[27px] flex items-center w-[135px] h-[38px] bg-[#2663CD] rounded-[40px] gap-[10px] justify-center text-[#ffffff] text-[15px] font-[400] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                        <span>ویرایش </span>
                        <img src="/src/assets/images/add_sign.svg" alt="add" className="w-[22px] h-[22px]" />
                    </button>
                    <select dir="ltr" className="h-[38px] w-[200px] rounded-[40px] bg-[#ffffff] z-1">
                    <option value="NaN" disabled selected className="text-center text-[#000000]">
                        <span className="text-[#000000] ">
                        --انتخاب فصل--
                        </span>
                    </option>
                    <option value="n" selected className="text-center text-[#000000]">
                        <span className="text-[#000000] ">
                        ام n فصل
                        </span>
                    </option>
                    </select>
                    </div>
                    </div>
                    <h2 style={{}} className="text-[26px] text-[#265073] font-[700]" >فصل nام:</h2>
                    <div>
                        <br/>
                       <label className="text-[#333333] font-[400] text-[20px] ml-[190px]" > نام فصل : </label> 
                       <input type="text" className="bg-[#ffffff] rounded-[12px] w-[492px] h-[54px] mb-[27px] border-[2px] border-[#000000]/21"/>
                       
                    </div>
                    <div className="flex flex-col">
                        <br />
                        <label className="text-[#333333] font-[400] text-[20px] mb-[1px]" >  محتوای فصل : </label>
                        <input type="text" style={{width: "1020px", height:"286px"}} className="bg-[#ffffff] rounded-[12px] w-[1020px] h-[286px] border-[2px] border-[#000000]/21" />
                    </div>
                    <div className="mx-auto">
                        <button className="mt-[36px] text-[16.8px] font-[400] text-[#ffffff] rounded-[12px] border-[2px] border-[#000000]/21 px-[86px] py-[13.5px] bg-[#2663CD] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">انتشار</button>
                    </div>
            </div>
        </div>
        <Footer/>
        </>


     );
}
 
export default CreateChapter;