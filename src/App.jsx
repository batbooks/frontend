




import './App.css'


import React from 'react';
import {} from 'react-redux';
import { decrement, increment, incrementByAmount } from './redux/infoSlice';


    
  



import { useSelector, useDispatch , Provider } from "react-redux";
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
