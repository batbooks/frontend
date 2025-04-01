
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Provider } from 'react-redux';
import viteLogo from '/vite.svg'
import { store } from './redux/store'
import './App.css'

import Bookpage from './features/Bookpage/Bookpage';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount } from './redux/infoSlice';


    
  



import { Provider } from "react-redux";
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
