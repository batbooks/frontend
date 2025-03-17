import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Provider } from 'react-redux';
import viteLogo from '/vite.svg'
import { store } from './redux/store'
import './App.css'
import HomePage from './trending_books';

function App() {

  
  return (
   <Provider store={store}>
    <HomePage></HomePage>
   </Provider>
  )
}

export default App
