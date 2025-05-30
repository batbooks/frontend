import "./App.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Provider } from "react-redux";
import Loading from "./common/Loading/Loading";
import { store } from "./redux/store";
import AppRoutes from "./routes";
import { loginSuccess, logout } from "./redux/infoSlice";
// import { Navigate, useNavigate } from "react-router";

function AppContent() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(true);

  // localStorage.removeItem("access_token")
  // const navigate = useNavigate();
  useEffect(() => {
    const check_refresh = async () => {
      setLoading(true);
      if (localStorage.getItem("refresh_token")) {
        try {
          const response = await fetch(`https://www.batbooks.ir/auth/token/refresh/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refresh: localStorage.getItem("refresh_token"),
            }),
          });

          if (response.ok) {
            const data = await response.json();

            localStorage.setItem("access_token", data.access);
            if (localStorage.getItem("access_token")) {
              checkAuth();
            }
          } else {
            dispatch(logout());
          }
        } catch (err) {
          dispatch(logout());
          console.error(err.message);
        } finally {
          setLoading(false);
        }
      }
    };
    const checkAuth = async () => {
      setLoading(true);

      try {
        const response = await fetch(`https://www.batbooks.ir/auth/who/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          dispatch(
            loginSuccess({
              user: data,
            })
          );
        } else {
          dispatch(logout());
          check_refresh();
        }
      } catch (err) {
        console.error("Error:", err.message);
        dispatch(logout());

        check_refresh();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const { user, isAuthenticated } = useSelector((state) => state.auth);
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
