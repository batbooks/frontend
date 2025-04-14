import "./App.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import AppRoutes from "./routes";
import { loginSuccess, logout } from "./redux/infoSlice";

function AppContent() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const checkAuth = async () => {
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
          dispatch(
            loginSuccess({
              user:data.user_info
            })
          );
        } else {
          dispatch(logout());
        }
      } catch (err) {
        console.error("Error:", err.message);
        dispatch(logout());
      }
    };

    checkAuth();
  }, []);

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  // console.log(user)
  // console.log(token)

  return <AppRoutes />;
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
