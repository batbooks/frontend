import { BrowserRouter as Router, Route, Routes } from "react-router";
import Signup from "./features/Auth/SignUp/signup";
import Login from "./features/Auth/Login/login";
import Profile from "./features/Profiles/UserProfile/userprofile";
import Another_User_Profile from "./features/Profiles/AnotherUserProfile/anotheruserprofile";
import BookPage from "./features/Bookpage/Bookpage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/signup" element={<Signup />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/profiles/userprofile" element={<Profile />}></Route>
        <Route path="/book/:id" element={<BookPage/>}></Route>
        <Route
          path="/profiles/anotheruserprofile"
          element={<Another_User_Profile />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
