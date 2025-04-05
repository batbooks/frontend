import "./navbar.css";

function Navbar() {
  return (
    <header
      style={{ direction: "rtl" }}
      className="max-w-[1440px] m-auto font-[Vazir] flex bg-[#a3d5ff] justify-between py-[22px] pl-[50px] pr-[30px] shadow-lg shadow-[#000000]/25"
    >
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
  );
}

export default Navbar;
