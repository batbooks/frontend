import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Provider } from 'react-redux';
import viteLogo from '/vite.svg'
import { store } from './redux/store'
import './App.css'

import Bookpage from './Bookpage/Bookpage';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount } from './redux/infoSlice';


    
  


function App() {

  // const count = useSelector((state) => state.counter.value);
  // const dispatch = useDispatch();
  
  return (
   <Provider store={store}>
    <Bookpage></Bookpage>
    
    {/* <>
        <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <span>{count}</span>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
        <div>
        <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
      </div>
        
        
        </> */}
   </Provider>
  )
}

export default App
