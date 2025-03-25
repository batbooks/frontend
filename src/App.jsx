
import { Provider } from 'react-redux';

import { store } from './redux/store'
import './App.css'
import { BrowserRouter,Routes,Route } from "react-router";
import Forget_password from './Forget_password';
import  Vf from './Vf';

function App() {

  
  return (
   <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/Forget_password' element={ <Forget_password/>}/>
        <Route path='/Vf' element={<Vf/>}/>
        
      </Routes>
    </BrowserRouter>
   </Provider>
  )
}

export default App
