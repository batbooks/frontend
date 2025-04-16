import "./App.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Provider } from "react-redux";
import Loading from "./common/Loading/Loading";
import { store } from "./redux/store";
import AppRoutes from "./routes";
import { loginSuccess, logout } from "./redux/infoSlice";

function AppContent() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://batbooks.liara.run/auth/who/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          dispatch(
            loginSuccess({
              user: data.user_info,
            })
          );
        } else {
          dispatch(logout());
          console.log("na");
        }
      } catch (err) {
        console.error("Error:", err.message);
        dispatch(logout());
        console.log("na");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  console.log(user);
  console.log(token);
  console.log(isAuthenticated);
  return !loading ? (
    <AppRoutes />
  ) : (
    <div className="h-[100vh] grid place-items-center">
      <Loading />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
