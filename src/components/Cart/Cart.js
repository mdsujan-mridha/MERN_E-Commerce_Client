import React from 'react';
import "./Cart.css";
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemsFromCart } from '../../actions/cartAction';
import { Fragment } from 'react';
import {  Typography } from '@mui/material';
import {Link, useNavigate} from "react-router-dom";
import CartItem from "./CartItem";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const{cartItems} = useSelector((state) =>state.cart);
    // console.log(cartItems);
    const increaseQuantity = (id,quantity,stock)=>{
         const newQty = quantity +1 ;
         if(stock <=quantity){
            return
         }
         dispatch(addItemToCart(id,newQty));
    };

    const decreaseQuantity = (id,quantity)=>{
         const newQty = quantity -1;
          if(1>=quantity){
            return;
          }
          dispatch(addItemToCart(id,newQty));
    };

     const deleteCartItems =(id)=>{
        dispatch(removeItemsFromCart(id));
     }
    const checkoutHandler = (id)=>{
        navigate("/shipping");
    } 

    return (
        <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon/>

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                
                <div className="cartContainer" key={item.product}>
                  <CartItem item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
    );
};

export default Cart;