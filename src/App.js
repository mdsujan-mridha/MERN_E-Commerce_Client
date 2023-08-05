
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
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './components/Cart/Payment';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrder from './components/Order/MyOrder';
import OrderDetails from './components/Order/OrderDetails';



function App() {



  const { isAuthenticated, user } = useSelector((state) => state.user)
  axios.defaults.withCredentials = true;
  // console.log(user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("http://localhost:5000/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
    // console.log(data);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
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
          <Route path='/forgot/password' element={<ForgotPasswordRequest />}></Route>
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          {/* <Route path='/account' element={<ProtectedRoute/>}> */}



          {/* </Route> */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path='/account' element={<Profile />}></Route>
            <Route path='/me/update' element={<UpdateProfile />}></Route>
            <Route path='/update/password' element={<ChangePassword />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/shipping' element={<Shipping />}></Route>
            <Route path='/order/confirm' element={<ConfirmOrder />}></Route>
            <Route>
              {stripeApiKey && (
                <Route
                  path="/process/payment"
                  
                  element={
                    <Elements stripe={loadStripe(stripeApiKey)} >
                      <Payment stripeApiKey = {stripeApiKey}/>
                    </Elements>
                  }
                ></Route>
              )}
            </Route>
            <Route path='/success' element={<OrderSuccess/>}></Route>
            <Route path='/orders' element={<MyOrder/>}></Route>
            <Route path='/order/:id' element={<OrderDetails/>}></Route>
          </Route>
          {/* <ProtectedRoute path="/account" element={<Profile/>}></ProtectedRoute> */}

        </Routes>

        <Footer />
      </Router>

    </>
  );
}

export default App;
