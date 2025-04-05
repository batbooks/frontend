import { BrowserRouter as Router, Route, Routes } from "react-router";
import Signup from "./features/Auth/Sign up/signup";
import Login from "./features/Auth/Login/login";
import Otp from "./features/Auth/Sign up/otpCheck";
function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/signup" element={<Signup />}></Route>
        <Route path="/auth/otp" element={<Otp />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
