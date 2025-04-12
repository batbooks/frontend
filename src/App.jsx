import "./App.css";

import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import "./App.css";
// import { decrement, increment, incrementByAmount } from "./redux/infoSlice";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import AppRoutes from "./routes";
import { logout } from "./redux/infoSlice";

function App() {
  // const user_info = useSelector((state) => state.login_info.value);

  const token = localStorage.getItem("access_token");
  const [userInfo, setUserInfo] = useState({});
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
        const data = await response.json();
        console.log(data);
        setUserInfo(data.user_info);
        //
      } catch (err) {
        console.error(err.message);
        console.log("asdad");
        setUserInfo(null);
      }
    };
    checkAuth();
    if (userInfo == null) {
      dispatch(logout());
    } else {
      let user = userInfo;
      dispatch(
        loginSuccess({
          user,
        })
      );
    }
  }, []);
  const user_info = useSelector((state) => state.login_info);
  console.log(user_info)
  return (
    <Provider >
      <AppRoutes />
    </Provider>
  );
}

export default App;
