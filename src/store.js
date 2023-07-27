import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productsReducer } from './reducers/productReducer';
import { forgotPasswordReducer, profileReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';

const reducer = combineReducers({
    // get all products  
    products:productsReducer,
    // get single products details 
    productDetails:productDetailsReducer,
    // user reducer 
    user:userReducer,
    profile: profileReducer,
    forgotPassword : forgotPasswordReducer,
    cart:cartReducer,
    
})

let initialState = {
    cart:{
        cartItems:localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    }
};

const middleware = [thunk]
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;