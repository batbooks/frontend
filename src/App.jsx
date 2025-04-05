import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppRoutes from "./routes";
import { PrimeReactProvider } from "primereact/api";
import { InputOtp } from "primereact/inputotp";

function App() {
  return (
    <PrimeReactProvider>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </PrimeReactProvider>
  );
}

export default App;
