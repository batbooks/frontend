
import { Provider } from 'react-redux';

import { store } from './redux/store'
import './App.css'
import Trending_books from './Trending_books';
import Suggestions from './suggestions';
import Newest_books from './Newest_books';
import Popular_authors from './popular_authors';
function App() {

  
  return (
   <Provider store={store}>
    <Trending_books></Trending_books>
    <Suggestions></Suggestions>
    <Newest_books></Newest_books>
    <Popular_authors></Popular_authors>
   </Provider>
  )
}

export default App
