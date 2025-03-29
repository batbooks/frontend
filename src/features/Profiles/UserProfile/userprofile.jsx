import React from "react";
import "./userprofile.css";
import Footer from "C:/Users/edwrd/Desktop/Tahlil Project/frontend/src/common/Footer/footer";

function Profile() {
  return (
    <div className="profile-container">
      <header className="header">
        <nav className="nav">
          <img
            className="user-image"
            src="/photos/user_image2.png"
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
                <img className="arrow" src="/photos/arrow.png" alt="Arrow" />
                <a href="#lists">پنل ارتباطی</a>
              </div>
            </li>
            <li>
              <a href="#contact">ارتباط با ما</a>
            </li>
          </ul>
        </nav>
        <div className="logo">
          <img src="/photos/logo.png" alt="Logo" />
        </div>
      </header>

      <main style={{ padding: "13px 80px 116px 80px" }}>
        <div style={{ display: "flex" }}>
          <div style={{ marginTop: "28px", marginBottom: "24px" }}>
            <button className="edit-profile-button">
              <img style={{ marginRight: "8px" }} src="/photos/edit_sign.png" />
              <span style={{ marginLeft: "18px" }}>ویرایش پروفایل</span>
            </button>
          </div>
          <h1 className="page-title">پروفایل کاربری</h1>
        </div>

        <div className="profile-info-section">
          <div className="user-profile-image">
            <img
              style={{ width: "236px", height: "267px" }}
              src="/photos/user_image.png"
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
                src="/photos/gift_sign.png"
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
                <span className="number">8</span>
                <span className="label">نفر دنبال شده</span>
              </button>
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
              margin: "52px 177px 52px 52px",
              borderRadius: "20px",
              width: "242px",
              height: "368px",
            }}
          >
            <img
              style={{ width: "208px", height: "299px", margin: "41px 17px" }}
              src="/photos/favorite_book.png"
              alt="Favorite Book"
            />
          </div>
        </div>

        <h6
          style={{ fontSize: "24px", color: "#265073", marginBottom: "25px" }}
        >
          اخیرا مطالعه میکرده ام...
        </h6>
        <div className="reading-book">
          <img
            style={{
              width: "153px",
              height: "189px",
              margin: "26px",
            }}
            src="/photos/book_sample.png"
            alt="Book"
          ></img>
          <div style={{ marginLeft: "89px" }}>
            <h6
              style={{
                fontSize: "30px",
                margin: "53px 0px 5px 0px",
                color: "#000000",
              }}
            >
              نام کتاب
            </h6>
            <p
              style={{
                fontSize: "20px",
                margin: "0px 0px 5px 0px",
                color: "#000000",
              }}
            >
              نام نویسنده
            </p>
            <div style={{ display: "flex", gap: "13.39px" }}>
              <img src="/photos/rated.png" alt="Rated"></img>
              <img src="/photos/rated.png" alt="Rated"></img>
              <img src="/photos/rated.png" alt="Rated"></img>
              <img src="/photos/rated.png" alt="Rated"></img>
              <img src="/photos/unrated.png" alt="Unrated"></img>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "109px" }}>
            <div className="progress-bar">
              <div className="progress"></div>
            </div>
            <p className="progress-percent">83%</p>
          </div>
          <button
            style={{
              backgroundColor: "#2663CD",
              width: "138px",
              height: "42px",
              borderRadius: "10px",
              margin: "100px 70px 99px 41px",
              color: "#ffffff",
            }}
          >
            ادامه دادن
          </button>
        </div>

        <h6
          style={{ fontSize: "24px", color: "#265073", marginBottom: "25px" }}
        >
          در حال تالیف هستم...
        </h6>
        <div style={{ display: "flex", gap: "42px" }}>
          <div className="writing-book">
            <img
              style={{
                width: "159px",
                height: "189px",
                margin: "26px",
              }}
              src="/photos/book_sample.png"
              alt="Book"
            ></img>
            <div style={{ marginLeft: "140px" }}>
              <h6
                style={{
                  fontSize: "30px",
                  margin: "53px 0px 5px 0px",
                  color: "#000000",
                }}
              >
                نام کتاب
              </h6>
              <p
                style={{
                  fontSize: "20px",
                  color: "#000000",
                }}
              >
                فصل فلان ام
              </p>
            </div>
            <button
              style={{
                backgroundColor: "#2663CD",
                width: "138px",
                height: "42px",
                borderRadius: "10px",
                marginLeft: "20px",
                marginTop: "100px",
                color: "#ffffff",
              }}
            >
              ادامه دادن
            </button>
          </div>
          <div className="writing-book">
            <img
              style={{
                width: "159px",
                height: "189px",
                margin: "26px",
              }}
              src="/photos/book_sample.png"
              alt="Book"
            ></img>
            <div style={{ marginLeft: "140px" }}>
              <h6
                style={{
                  fontSize: "30px",
                  margin: "53px 0px 5px 0px",
                  color: "#000000",
                }}
              >
                نام کتاب
              </h6>
              <p
                style={{
                  fontSize: "20px",
                  color: "#000000",
                }}
              >
                فصل فلان ام
              </p>
            </div>
            <button
              style={{
                backgroundColor: "#2663CD",
                width: "138px",
                height: "42px",
                borderRadius: "10px",
                marginLeft: "20px",
                marginTop: "100px",
                color: "#ffffff",
              }}
            >
              ادامه دادن
            </button>
          </div>
        </div>
        <button
          style={{
            backgroundColor: "#2663CD",
            fontWeight: "bold",
            color: "#FFFFFF",
            borderRadius: "46px",
            marginRight: "1027px",
            width: "253px",
            height: "48px",
          }}
        >
          خروج از حساب کاربری
        </button>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
