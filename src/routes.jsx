import { BrowserRouter as Router, Route, Routes } from "react-router";
import Signup from "./features/Auth/SignUp/signup";
import Login from "./features/Auth/Login/login";
import Profile from "./features/Profiles/UserProfile/userProfile";
import Otp from "./features/Auth/SignUp/otpCheck.jsx";
import Another_User_Profile from "./features/Profiles/AnotherUserProfile/anotheruserprofile";
import BookPage from "./features/Bookpage/Bookpage";
import Forget_password from "./features/Auth/forget_password/Forget_password";
import Vf from "./features/Auth/forget_password/Vf";
import CreateBook from "./features/CreateBook/createBook.jsx";

import Comments from "./common/comments/Comments";

import Footer from "./common/Footer/footer";
import Navbar from "./common/Navbar/navbar";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/signup" element={<Signup />}></Route>
        <Route path="/auth/otp" element={<Otp />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/profiles/userprofile" element={<Profile />}></Route>
        <Route path="/book/:id" element={<BookPage />}></Route>
        <Route path="/mybooks/createbook" element={<CreateBook />}></Route>
        <Route path="/Forget_password" element={<Forget_password />} />
        <Route path="/Vf" element={<Vf />} />
        <Route
          path="/profiles/anotheruserprofile"
          element={<Another_User_Profile />}
        ></Route>

        <Route path="/comments" element={<Comments chapter={1} />}></Route>

        <Route path="/footer" element={<Footer />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
