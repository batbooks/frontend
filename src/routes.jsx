import { BrowserRouter as Router, Route, Routes } from "react-router";
<<<<<<< HEAD
import Signup from "./features/Auth/Sign up/signup";
import Login from "./features/Auth/Login/login";
import Otp from "./features/Auth/Sign up/otpCheck";
=======
import Signup from "./features/Auth/SignUp/signup";
import Login from "./features/Auth/Login/login";
import Profile from "./features/Profiles/UserProfile/userprofile";
import Another_User_Profile from "./features/Profiles/AnotherUserProfile/anotheruserprofile";
import BookPage from "./features/Bookpage/Bookpage";
import Forget_password from "./features/Auth/forget_password/Forget_password";
import Vf from "./features/Auth/forget_password/Vf";
>>>>>>> 228aa17fd3f1bf3008c45103cf9df45de73743f9
function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/signup" element={<Signup />}></Route>
<<<<<<< HEAD
        <Route path="/auth/otp" element={<Otp />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
=======
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/profiles/userprofile" element={<Profile />}></Route>
        <Route path="/book/:id" element={<BookPage/>}></Route>
        <Route path='/Forget_password' element={ <Forget_password/>}/>
        <Route path='/Vf' element={<Vf/>}/>
        <Route
          path="/profiles/anotheruserprofile"
          element={<Another_User_Profile />}
        ></Route>
>>>>>>> 228aa17fd3f1bf3008c45103cf9df45de73743f9
      </Routes>
    </Router>
  );
}

export default AppRoutes;
