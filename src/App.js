
import { useEffect } from 'react';
import WebFont from 'webfontloader';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import Home from './components/Home/Home';
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDerails from './components/Products/ProductDerails';
import Products from './components/Products/Products';
import Search from './components/Products/Search';
import LoginSignUp from './components/User/LoginSignUp';
import { loadUser } from './actions/userAction';
import store from "./store";
import { useSelector } from 'react-redux';
import UserOptions from './components/Layout/Header/UserOptions';
import axios from 'axios';
import Profile from './components/User/Profile';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile';
import ChangePassword from './components/User/ChangePassword';
import ForgotPasswordRequest from './components/User/ForgotPasswordRequest';
import ResetPassword from './components/User/ResetPassword';



function App() {



  const { isAuthenticated, user } = useSelector((state) => state.user)
  axios.defaults.withCredentials = true;
  // console.log(user);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser())
  }, [])

  return (
    <>

      <Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='home' element={<Home />}></Route>
          <Route path='/product/:id' element={<ProductDerails />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/products/:keyword' element={<Products />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/login' element={<LoginSignUp />}></Route>
          <Route path='/forgot/password' element={<ForgotPasswordRequest/>}></Route>
          <Route  path="/password/reset/:token" element={<ResetPassword/>} />
          {/* <Route path='/account' element={<ProtectedRoute/>}> */}



          {/* </Route> */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path='/account' element={<Profile />}></Route>
            <Route path='/me/update' element={<UpdateProfile/>}></Route>
            <Route path='/update/password' element={<ChangePassword/>}></Route>
            
          </Route>
          {/* <ProtectedRoute path="/account" element={<Profile/>}></ProtectedRoute> */}

        </Routes>

        <Footer />
      </Router>

    </>
  );
}

export default App;
