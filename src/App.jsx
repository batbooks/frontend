
import { Provider } from 'react-redux';

import { store } from './redux/store'
import './App.css'

import Forget_password from './Forget_password';

function App() {

  
  return (
   <Provider store={store}>
    <Forget_password></Forget_password>
   </Provider>
  )
}

export default App
