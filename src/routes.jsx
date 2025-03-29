import { BrowserRouter as Router, Route, Routes } from "react-router";
import Signup from "../features/Auth/Sign up/signup";
import Login from "../features/Auth/Login/login";
function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/signup" element={<Signup />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
