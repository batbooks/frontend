import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppRoutes from "./routes";
import HomePage from "../HomePage";
import Footer from "./Footer";

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
