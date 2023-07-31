
import React from 'react';
import "./CartItem.css";
import { Link } from "react-router-dom";

const CartItem = ({item, deleteCartItems}) => {
    console.log(item.name);
    return (
        <div className="CartItemCard">
            <img src={item.image} alt="ssa" />
            <div>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`Price: ${item.price}`}</span>
                <p onClick={() => deleteCartItems(item.product)}>Remove</p>
            </div>
        </div>
    );
};

export default CartItem;