
import { Provider } from 'react-redux';

import { store } from './redux/store'
import './App.css'
import Homepage from './homepage/Homepage';

function App() {

  
  return (
   <Provider store={store}>
    <Homepage></Homepage>
    
   </Provider>
  )
}

export default App
