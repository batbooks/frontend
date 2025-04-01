import React from 'react';
import './App.css'
import { decrement, increment, incrementByAmount } from './redux/infoSlice';
import { Provider,useSelector, useDispatch  } from "react-redux";
import { store } from "./redux/store";
import AppRoutes from "./routes";


function App() {
  return (

   

    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );


}

export default App;
