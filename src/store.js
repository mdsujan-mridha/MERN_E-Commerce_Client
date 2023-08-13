import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewReducer, productsReducer, reviewReducer } from './reducers/productReducer';
import { allUserReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
    // get all products  
    products: productsReducer,
    // get single products details 
    productDetails: productDetailsReducer,
    // user reducer 
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    // product:productsReducer,
    product: productReducer,
    newProduct: newProductReducer,
    // all orders for admin 
    allOrders: allOrdersReducer,
    // update & delete order by admin 
    order: orderReducer,
    productReviews: productReviewReducer,
    review: reviewReducer,
    
    allUsers:allUserReducer,
    userDetails:userDetailsReducer,
    


})

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ?
            JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    }
};

const middleware = [thunk]
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;