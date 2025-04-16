import { BrowserRouter as Router, Route, Routes } from "react-router";
import Signup from "./features/Auth/SignUp/signup.jsx";
import Login from "./features/Auth/Login/login.jsx";
import Otp from "./features/Auth/SignUp/otpCheck.jsx";
import Another_User_Profile from "./features/Profiles/AnotherUserProfile/anotheruserprofile.jsx";
import BookPage from "./features/Bookpage/Bookpage.jsx";
import Forget_password from "./features/Auth/forget_password/Forget_password.jsx";
import Vf from "./features/Auth/forget_password/Vf.jsx";
import CreateBook from "./features/CreateBook/createBook.jsx";
import ReadingPage from "./features/ReadingChapter/chapterView.jsx";
import Comments from "./common/comments/Comments.jsx";
import Footer from "./common/Footer/Footer.jsx";
import Navbar from "./common/Navbar/navbar.jsx";
import Profile from "./features/Profiles/UserProfile/userprofile.jsx";
import CreateChapter from "./features/CreateChapter/createChapter.jsx";
import Homepage from "./homepage/Homepage.jsx";
import VoteAndReview from "./common/comments/voteAndReview.jsx";
import MyBooks from "./features/MyBooks/myBooks.jsx";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/auth/signup" element={<Signup />}></Route>
        <Route path="/auth/otp" element={<Otp />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/userprofile" element={<Profile />}></Route>
        <Route path="/book/:id" element={<BookPage />}></Route>
        <Route path="/mybooks/createbook" element={<CreateBook />}></Route>
        <Route path="/Forget_password" element={<Forget_password />} />
        <Route path="/Vf" element={<Vf />} />
        <Route
          path="/anotheruserprofile"
          element={<Another_User_Profile />}
        ></Route>
        <Route path="/readingchapter" element={<ReadingPage />} />
        <Route path="/createChapter" element={<CreateChapter />} />
        <Route path="/chapterview" element={<ReadingPage />} />
        <Route path="/mybooks" element={<MyBooks />} />
        <Route path="/comments" element={<Comments chapter={1} />}></Route>
        <Route path="/footer" element={<Footer />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/voteandreview" element={<VoteAndReview />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
