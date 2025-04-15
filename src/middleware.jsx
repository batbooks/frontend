import { Navigate } from "react-router";

export default function Middleware({ children }) {
  var accessTokenObj = localStorage.getItem("access_token");
  console.log(accessTokenObj);
  if (!accessTokenObj) {
    return <Navigate to="/auth/login" replace />;
  } else {
    return children;
  }
}
