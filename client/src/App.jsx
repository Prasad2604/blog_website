import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Header from "./components/Header"
import FooterCom from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import CreatePost from "./pages/CreatePost"
import PrivateAdminRoute from "./components/PrivateAdminRoute"
import UpdatePost from "./pages/UpdatePost"
import PostPage from "./pages/PostPage"
import Search from "./pages/Search"
// import Login from "./pages/LandingPage"

export default function App() {
  return (
    <BrowserRouter>
    <Header></Header>
    <Routes>
      
      <Route path="/" element={<Home/>}></Route>
      {/* <Route path="/landing" element={<Login/>}></Route> */}
      <Route path="/about" element={<About/>}></Route>
      <Route path="/sign-in" element={<SignIn/>}></Route>
      <Route path="/sign-up" element={<SignUp/>}></Route>
      <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Route>
      <Route element={<PrivateAdminRoute/>}>
          <Route path="/create-post" element={<CreatePost/>}></Route>
          <Route path="/update-post/:postId" element={<UpdatePost/>}></Route>
      </Route>
      <Route path="/projects" element={<Projects/>}></Route>
      <Route path='/post/:postSlug' element={<PostPage/>}></Route>
      <Route path='/search' element={<Search/>}></Route>

    </Routes>
    <FooterCom></FooterCom>
    </BrowserRouter>
  )
}