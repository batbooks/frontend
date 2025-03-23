
import { Provider } from 'react-redux';

import { store } from './redux/store'
import './App.css'
import { BrowserRouter,Routes,Route } from "react-router";
import Forget_password from './Forget_password';
import Forget_password_2 from './Forget_password_2';

function App() {

  
  return (
   <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/Forget_password' element={ <Forget_password/>}/>
        <Route path='/Forget_password_2' element={<Forget_password_2/>}/>
        
      </Routes>
    </BrowserRouter>
   </Provider>
  )
}

export default App
