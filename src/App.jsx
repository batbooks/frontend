import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./App.css";
import Profile from "./Profile";

function App() {
  return (
    <Provider store={store}>
      <Profile></Profile>
    </Provider>
  );
}

export default App;
