import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';



const Product = ({product}) => {
    // this options fot React stars 
    const options ={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth < 600 ? 20:25,
        value:product.ratings,
        isHalf:true
    }
    // console.log(product);
    // console.log(product.images[0]?.url)
    return (
        <Link to={`/product/${product._id}`} className='productCard' >
            
             <img src={product.images[0]?.url} alt={product.name} />
              <p> {product.name} </p>
              <div>
                <ReactStars {...options}></ReactStars> 
                <span> ({product.numOfReviews} Reviews ) </span> 
              </div>
              <span> BDT {product.price} /- </span>
        </Link>
    );
};

export default Product;