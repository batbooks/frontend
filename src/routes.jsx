import { BrowserRouter as Router, Route, Routes } from "react-router";
import Signup from "./features/Auth/SignUp/signup.jsx";
import Login from "./features/Auth/Login/login.jsx";
import Otp from "./features/Auth/SignUp/otpCheck.jsx";
import Another_User_Profile from "./features/Profiles/AnotherUserProfile/anotheruserprofile.jsx";
import BookPage from "./features/Bookpage/Bookpage.jsx";
import Forget_password from "./features/Auth/forget_password/Forget_password.jsx";
import Vf from "./features/Auth/forget_password/Vf.jsx";
import CreateBook from "./features/CreateBook/createBook.jsx";
import Profile from "./features/Profiles/UserProfile/userprofile.jsx";
import Homepage from "./homepage/Homepage.jsx";
import MyBooks from "./features/MyBooks/myBooks.jsx";
import Middleware from "./middleware.jsx";
import SearchResults from "./features/SearchResults/searchResults.jsx";
import EditChapter from "./features/EditChapter/editChapter.jsx";
import ModifiedChapter from "./features/CreateChapter/modifiedChapter.jsx";
import ReadingPage from "./features/ReadingChapter/chapterView.jsx";
import CreateChapter from "./features/CreateChapter/createChapter.jsx";
import Threads from "./features/Threads/threads.jsx";
import ShowAllBooks from "./features/ShowAllBooks/ShowAllBooks.jsx";
import Comments from "./features/Comments/Comment.jsx";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/auth/signup" element={<Signup />}></Route>
        <Route path="/auth/otp" element={<Otp />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/comment" element={<Comments />}></Route>
        <Route path="/userprofile" element={<Profile />}></Route>
        <Route path="/book/:bookId" element={<BookPage />}></Route>
        <Route
          path="/mybooks/createbook"
          element={
            <Middleware>
              <CreateBook />
            </Middleware>
          }
        ></Route>
        <Route path="/Forget_password" element={<Forget_password />} />
        <Route path="/Vf" element={<Vf />} />
        <Route
          path="/anotheruserprofile/:userId"
          element={<Another_User_Profile />}
        ></Route>
        <Route
          path="/forums"
          element={<SearchResults searchingItem="forum" />}
        />
        <Route path="/readingchapter" element={<ReadingPage chapterId={1} />} />
        <Route
          path="/createAndEditChapter/:chapterId"
          element={
            <Middleware>
              <CreateChapter />
            </Middleware>
          }
        />
        <Route
          path="/editChapter/:bookId"
          element={
            <Middleware>
              <EditChapter />
            </Middleware>
          }
        />
        <Route path="/chapter/:chapterId" element={<ReadingPage />} />
        <Route path="/showallbooks" element={<ShowAllBooks />} />
        <Route
          path="/modifiedChapter/:id"
          element={
            <Middleware>
              <ModifiedChapter />
            </Middleware>
          }
        />
        <Route
          path="/mybooks"
          element={
            <Middleware>
              <MyBooks />
            </Middleware>
          }
        />
        <Route path="/threads/:forumId" element={<Threads forumId={3} />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
