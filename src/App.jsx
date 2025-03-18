
import { Provider } from 'react-redux';

import { store } from './redux/store'
import './App.css'
import Trending_books from './Trending_books';
import Suggestions from './suggestions';

function App() {

  
  return (
   <Provider store={store}>
    <Trending_books></Trending_books>
    <Suggestions></Suggestions>
   </Provider>
  )
}

export default App
