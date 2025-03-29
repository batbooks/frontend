import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./App.css";
import Footer from "./Footer";

function App() {
  return (
    <Provider store={store}>
      <Footer></Footer>
    </Provider>
  );
}

export default App;
