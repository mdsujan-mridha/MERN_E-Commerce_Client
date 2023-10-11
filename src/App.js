
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
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OderList from './components/Admin/OderList';
import ProcessOrder from './components/Admin/ProcessOrder';
import ProductReview from './components/Admin/ProductReview';
import UserList from './components/Admin/UserList';
import UpdateUser from './components/Admin/UpdateUser';



function App() {



  const { isAuthenticated, user } = useSelector((state) => state.user)
  axios.defaults.withCredentials = true;
  // console.log(user?.role);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("https://mern-r-commerce.onrender.com/api/v1/stripeapikey");
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
  window.addEventListener("contextmenu", (e) => e.preventDefault());
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
          {/* Admin route  */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              >

                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
          {/* product list */}
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              >
                <ProductList />
              </ProtectedRoute>
            }
          ></Route>
          {/* create new product by admin  */}
          <Route
            path="/admin/product"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              >
                <NewProduct />
              </ProtectedRoute>
            }
          ></Route>
          {/* update product  */}
          <Route
            path="/admin/product/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              >
                <UpdateProduct />
              </ProtectedRoute>
            }
          ></Route>
          {/* get all orders by admin  */}
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              >
                <OderList />
              </ProtectedRoute>
            }
          ></Route>

          {/* process order by admin  */}
          <Route
            path="/admin/order/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              >
                <ProcessOrder />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin/review"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              >
                <ProductReview />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              >
                <UserList />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin/user/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              >
                <UpdateUser />
              </ProtectedRoute>
            }
          ></Route>
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
                      <Payment stripeApiKey={stripeApiKey} />
                    </Elements>
                  }
                >

                </Route>
              )}
            </Route>
            <Route path='/success' element={<OrderSuccess />}></Route>
            <Route path='/orders' element={<MyOrder />}></Route>
            <Route path='/order/:id' element={<OrderDetails />}></Route>

          </Route>
          {/* admin  */}

          {/* <ProtectedRoute path="/account" element={<Profile/>}></ProtectedRoute> */}

        </Routes>

        <Footer />
      </Router>

    </>
  );
}

export default App;
