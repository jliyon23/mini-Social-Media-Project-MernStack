import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "./App.css";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import MyJournals from "./components/MyJournals";
import PostDetails from "./components/PostDetails";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5005";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/myjournals" element={<MyJournals />}></Route>
          <Route path="/posts/:postId" element={<PostDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
