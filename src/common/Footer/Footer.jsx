import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <div style={{ display: "flex" }}>
        <div
          style={{
            marginTop: "35px",
            marginRight: "80px",
            marginBottom: "121px",
            marginLeft: "101px",
          }}
        >
          <h1
            style={{
              fontSize: "16px",
              fontWeight: "bolder",
              color: "#265073",
              marginBottom: "10px",
            }}
          >
            شرکت BatBooks
          </h1>
          <ul>
            <li style={{ marginBottom: "10px" }}>
              <a
                style={{
                  fontSize: "14px",
                  color: "#000000",
                }}
              >
                درباره ما
              </a>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <a
                style={{
                  fontSize: "14px",
                  color: "#000000",
                  marginBottom: "10px",
                }}
              >
                قوانین و مقررات
              </a>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <a
                style={{
                  fontSize: "14px",
                  color: "#000000",
                  marginBottom: "10px",
                }}
              >
                پیشنهادات و انتقادات
              </a>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <a
                style={{
                  fontSize: "14px",
                  color: "#000000",
                  marginBottom: "10px",
                }}
              >
                پرسش های متداول
              </a>
            </li>
            <li>
              <a
                style={{
                  fontSize: "14px",
                  color: "#000000",
                  marginBottom: "10px",
                }}
              >
                ارتباط با ما
              </a>
            </li>
          </ul>
        </div>
        <div
          style={{
            marginTop: "35px",
            marginLeft: "104px",
          }}
        >
          <h1
            style={{
              fontSize: "16px",
              fontWeight: "bolder",
              color: "#265073",
              marginBottom: "10px",
            }}
          >
            همکاری با ما
          </h1>
          <ul>
            <li style={{ marginBottom: "10px" }}>
              <a
                style={{
                  fontSize: "14px",
                  color: "#000000",
                  marginBottom: "10px",
                }}
              >
                ارتباط با ناشران و چاپ اثر
              </a>
            </li>
            <li>
              <a
                style={{
                  fontSize: "14px",
                  color: "#000000",
                }}
              >
                ما را در شبکه های اجتماعی
              </a>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <a
                style={{
                  fontSize: "14px",
                  color: "#000000",
                }}
              >
                به دیگران معرفی کنید...
              </a>
            </li>
          </ul>
        </div>
        <div
          style={{
            marginTop: "35px",
            marginLeft: "220px",
          }}
        >
          <h1
            style={{
              fontSize: "16px",
              fontWeight: "bolder",
              color: "#265073",
              marginBottom: "10px",
            }}
          >
            مسیرهای ارتباطی
          </h1>
          <ul>
            <li style={{ marginBottom: "10px" }}>
              <span
                style={{
                  fontSize: "14px",
                  color: "#000000",
                  marginBottom: "10px",
                }}
              >
                تلفن ثابت: 53227747 - (021)
              </span>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <span
                style={{
                  fontSize: "14px",
                  color: "#000000",
                }}
              >
                آدرس ایمیل: Email.iust.ac.ir
              </span>
            </li>
            <li>
              <span
                style={{
                  fontSize: "14px",
                  color: "#000000",
                }}
              >
                نشانی: تهران، میدان رسالت،
              </span>
            </li>
            <li>
              <span
                style={{
                  fontSize: "14px",
                  color: "#000000",
                }}
              >
                خیابان هنگام، خیابان دانشگاه،{" "}
              </span>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <span
                style={{
                  fontSize: "14px",
                  color: "#000000",
                }}
              >
                دانشگاه علم و صنعت ایران
              </span>
            </li>
            <li style={{ display: "flex", gap: "5px", marginRight: "-7px" }}>
              <button className="whatsapp-button"></button>
              <button className="telegram-button"></button>
              <button className="instagram-button"></button>
            </li>
          </ul>
        </div>
        <div>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bolder",
              color: "#000000",
              marginRight: "86px",
              marginTop: "37px",
              marginBottom: "39px",
            }}
          >
            BatBooks
          </h1>
          <button
            style={{
              width: "150px",
              height: "52px",
              backgroundColor: "#001F54",
              color: "#FFFFFF",
              marginLeft: "11px",
              borderRadius: "12px",
            }}
          >
            <div style={{ display: "flex", gap: "18px", marginRight: "8px" }}>
              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "10px",
                    marginBottom: "-7px",
                  }}
                >
                  GET IT ON
                </span>
                <span
                  style={{
                    fontSize: "20px",
                  }}
                >
                  myket
                </span>
              </div>
              <img
                style={{ width: "30px", height: "30px" }}
                src="/photos/myket.png"
                alt="Myket"
              />
            </div>
          </button>
          <button
            style={{
              width: "150px",
              height: "52px",
              backgroundColor: "#001F54",
              color: "#FFFFFF",
              marginRight: "11px",
              borderRadius: "12px",
            }}
          >
            <div style={{ display: "flex", gap: "18px", marginRight: "8px" }}>
              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "10px",
                    marginBottom: "-7px",
                  }}
                >
                  GET IT ON
                </span>
                <span
                  style={{
                    fontSize: "20px",
                  }}
                >
                  Bazzar
                </span>
              </div>
              <img
                style={{ width: "30px", height: "30px" }}
                src="/photos/bazzar.png"
                alt="Bazzar"
              />
            </div>
          </button>
        </div>
      </div>
      <p
        style={{ fontSize: "12px", textAlign: "center", marginBottom: "23px" }}
      >
        Copyright © 73b4 - m485 BatBooks. All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
