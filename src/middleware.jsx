import { Navigate } from "react-router";

export default function Middleware({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  } else {
    return children;
  }
}
