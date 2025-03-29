import React from "react";
import "./Another_User_Profile.css";
import "./Footer";
import Footer from "./Footer";

function Another_User_Profile() {
  return (
    <div className="profile-container">
      <header className="header">
        <nav className="nav">
          <img
            className="user-image"
            src="./photos/user_image2.png"
            alt="User Image 2"
          />
          <ul>
            <li>
              <a href="#home">صفحه اصلی</a>
            </li>
            <li>
              <a href="#mybooks">کتاب‌های من</a>
            </li>
            <li>
              <div style={{ display: "flex" }}>
                <img className="arrow" src="./photos/arrow.png" alt="Arrow" />
                <a href="#lists">پنل ارتباطی</a>
              </div>
            </li>
            <li>
              <a href="#contact">ارتباط با ما</a>
            </li>
          </ul>
        </nav>
        <div className="logo">
          <span>BatBooks</span>
          <img src="./photos/logo.png" alt="Logo" />
        </div>
      </header>

      <main style={{ padding: "13px 80px 107px 80px" }}>
        <div style={{ display: "flex" }}>
          <div style={{ marginTop: "28px", marginBottom: "24px" }}>
            <button className="edit-profile-button">
              <span>دنبال کردن/نکردن</span>
            </button>
          </div>
          <h1 className="page-title">پروفایل کاربری</h1>
        </div>

        <div className="profile-info-section">
          <div className="user-profile-image">
            <img
              style={{ width: "236px", height: "267px" }}
              src="./photos/user_image.png"
              alt="User Image"
            />
            <h1
              style={{
                fontSize: "24px",
                margin: "8px 6px 12px",
                color: "#000000",
              }}
            >
              جزئیات
            </h1>
            <span style={{ fontSize: "16px", margin: "6px", color: "#000000" }}>
              جنسیت ذکر نشده، شهر
            </span>
            <div style={{ display: "flex", margin: "12px 6px", gap: "7.5px" }}>
              <img
                style={{ width: "25px", height: "25px" }}
                src="./photos/gift_sign.png"
                alt="Gift"
              />
              <span style={{ fontSize: "16px", color: "#000000" }}>
                روز تولد: روز/ماه/سال
              </span>
            </div>
          </div>

          <div style={{ margin: "28px 0px" }}>
            <h2 className="username">نام کاربری</h2>
            <div className="stats">
              <button className="stat">
                <span className="number">10</span>
                <span className="label">کتاب تالیف شده</span>
              </button>
              <button className="stat">
                <span className="number">100</span>
                <span className="label">کتاب موردعلاقه</span>
              </button>
            </div>
            <div>
              <h3 style={{ fontSize: "24px", color: "#000000" }}>جزئیات:</h3>
              <p
                style={{
                  fontSize: "16px",
                  marginBottom: "18px",
                  color: "#000000",
                }}
              >
                ملحق شده در روز/ماه/سال
              </p>
              <h4 style={{ fontSize: "16px", color: "#000000" }}>
                ژانرهای موردعلاقه:
              </h4>
              <p
                style={{
                  color: "#000000",
                  opacity: "0.7",
                  fontSize: "14px",
                  marginBottom: "18px",
                }}
              >
                علمی-تخیلی، رمان(داستانی)، معمایی
              </p>
              <h5 style={{ fontSize: "16px", color: "#000000" }}>درباره من:</h5>
              <p
                style={{
                  color: "#000000",
                  opacity: "0.7",
                  fontSize: "14px",
                }}
              >
                این متن صرفا جهت تست میباشد...
              </p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#FFFFFF",
              margin: "52px 356px 52px 52px",
              borderRadius: "20px",
              width: "242px",
              height: "368px",
            }}
          >
            <img
              style={{ width: "208px", height: "299px", margin: "41px 17px" }}
              src="./photos/favorite_book.png"
              alt="Favorite Book"
            />
          </div>
        </div>
        <h6
          style={{ fontSize: "24px", color: "#265073", marginBottom: "25px" }}
        >
          کتاب های موردعلاقه
        </h6>
        <img
          style={{ marginBottom: "42px" }}
          src="./photos/books.png"
          alt="Books"
        />
        <h6
          style={{ fontSize: "24px", color: "#265073", marginBottom: "25px" }}
        >
          کتاب های تالیف شده
        </h6>
        <img
          style={{ marginBottom: "42px" }}
          src="./photos/books.png"
          alt="Books"
        />
      </main>

      <Footer />
    </div>
  );
}

export default Another_User_Profile;
