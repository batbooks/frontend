import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./App.css";
import Another_User_Profile from "./Another_User_Profile";

function App() {
  return (
    <Provider store={store}>
      <Another_User_Profile></Another_User_Profile>
    </Provider>
  );
}

export default App;
