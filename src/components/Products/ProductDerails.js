import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';

import './ProductDetails.css';
import Loader from '../Layout/Loader/Loader';
import { Rating } from '@mui/material';
import ReviewCard from './ReviewCard';
import MetaData from '../Layout/MetaData/MetaData';
import { addItemToCart } from '../../actions/cartAction';
import { toast } from 'react-toastify';

const ProductDerails = () => {

    const dispatch = useDispatch();

    const { id } = useParams();
    const { loading, product } = useSelector((state) => state.productDetails)
    // state 
    const[quantity,setQuantity] = useState(1);
    const[open,setOpen] = useState(false);
    const[comment,setComment] = useState("");
    const[ratting,setRatting] = useState(0);

    //  increase and decrease quantity 
    const increaseQuantity = () =>{
         if(product.Stock <=quantity) return;
         const qty = quantity + 1;
         setQuantity(qty);
    }
    const decreaseQuantity = () =>{
         if(1>= quantity) return;

         const qty = quantity - 1;
         setQuantity(qty);

    }
     
    const addToCartHandler = () =>{
        dispatch(addItemToCart(id,quantity));
        toast.success("Item added to cart");
    }

    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id])

    // console.log(product);
    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <Fragment>
            {
                loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <MetaData title= {`${product?.name}`} />
                        <div className="ProductDetails">
                            <div className='row-1'>
                                <Carousel className='carousel'>
                                    {
                                        product.images &&
                                        product?.images?.map((item, i) => (

                                            // console.log(item.url)
                                            <img
                                                className='CarouselImage'
                                                key={item.url}
                                                src={item.url}
                                                alt={`${i} Slide`} />
                                        ))
                                    }
                                </Carousel>
                            </div>
                            {/* second div  */}
                            <div>
                                <div className="detailsBlock-1">
                                    <h2> {product?.name} </h2>
                                    <p> Product #{product?._id} </p>
                                </div>
                                <div className="detailsBlock-2">
                                    <Rating  {...options} />
                                    <span className='detailsBlock-2-span'>
                                        {" "}
                                        ({product?.numOfReviews} Reviews )
                                    </span>
                                </div>
                                <div className="detailsBlock-3">
                                    <h1> {`BDT ${product?.price} /-  `} </h1>
                                    <div className="detailsBlock-3-1">
                                        <div className="detailsBloc3-1-1">
                                            <button onClick={decreaseQuantity}> - </button>
                                            <input readOnly type="number" value={quantity}/>
                                            <button onClick={increaseQuantity}> + </button>
                                        </div>
                                        <button
                                            disabled={product.Stock < 1 ? true : false}
                                            onClick={addToCartHandler}
                                        >Add to cart </button>
                                    </div>
                                    <p>
                                        status : <b className={product?.Stock < 1 ? "redColor" : "greenColor"}>
                                            {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                        </b>
                                    </p>
                                </div>
                                <div className="detailsBloc-4">
                                    Description:
                                    <p> {product?.description
                                    } </p>
                                </div>

                                <button className='submitReview'> Submit Review </button>
                            </div>

                        </div>
                        <h3 className="reviewsHeading"> REVIEWS </h3>
                        <div>
                            {
                                product?.reviews && product?.reviews[0] ? (
                                    <div className="reviews">
                                        {
                                            product?.reviews &&
                                            product?.reviews?.map((review) =>(
                                                <ReviewCard
                                                key={review._id}
                                                review={review}
                                                />
                                            ))
                                        }
                                    </div>
                                ):(
                                    <p className='noReviews'>No Reviews yet  </p>
                                )
                            }
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    );
};

export default ProductDerails;