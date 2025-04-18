import { useSelector } from "react-redux";
import { Navigate } from "react-router";
useSelector;

export default function Middleware({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  } else {
    return children;
  }
}
