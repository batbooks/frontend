import { BrowserRouter as Router, Route, Routes } from "react-router";
import Signup from "./features/Auth/SignUp/signup";
import Login from "./features/Auth/Login/login";
import Otp from "./features/Auth/SignUp/otpCheck.jsx";
import Profile from "./features/Profiles/UserProfile/userprofile";
import Another_User_Profile from "./features/Profiles/AnotherUserProfile/anotheruserprofile";
import BookPage from "./features/Bookpage/Bookpage";
import Forget_password from "./features/Auth/forget_password/Forget_password";
import Vf from "./features/Auth/forget_password/Vf";
import ReadingPage from "./features/ReadingChapter/chapterView";
function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/signup" element={<Signup />}></Route>
        <Route path="/auth/otp" element={<Otp />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/profiles/userprofile" element={<Profile />}></Route>
        <Route path="/book/:id" element={<BookPage />}></Route>
        <Route path="/Forget_password" element={<Forget_password />} />
        <Route path="/Vf" element={<Vf />} />
        <Route
          path="/profiles/anotheruserprofile"
          element={<Another_User_Profile />}
        ></Route>
        <Route path='/readingchapter' element={<ReadingPage/>}/>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
