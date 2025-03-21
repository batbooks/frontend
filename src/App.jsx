import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Provider } from 'react-redux';
import viteLogo from '/vite.svg'
import { store } from './redux/store'
import './App.css'
import HomePage from './HomePage';
import Book_Page from './bookpage';

function App() {

  
  return (
   <Provider store={store}>
    <Book_Page></Book_Page>
   </Provider>
  )
}

export default App
