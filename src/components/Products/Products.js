import React from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../Layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import "./Products.css";
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { useState } from 'react';
import { Slider, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import MetaData from '../Layout/MetaData/MetaData';

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];

const Products = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");

    const {
        loading,
        products,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount


    } = useSelector((state) => state.products)

    const keyword = useParams();

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
            toast.error(error, "You got some error");

        }
        dispatch(getProduct(keyword, currentPage, price, category));
    }, [dispatch, keyword, currentPage, price, category, error]);


    let count = filteredProductsCount;
    // console.log(filteredProductsCount);

    //  pagination 
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    //  set Price 
    const priceHandler = (e, newPrice) => {

        setPrice(newPrice);
    }
//    refresh Page
    function refreshPage() {
        window.location.reload(false);
      }

    return (
        <Fragment>
            {
                loading ? (
                    <Loader />
                ) :
                    (
                        <Fragment>
                            <MetaData title={"Product page"} />
                            <h2 className='productsHeading'> Products  </h2>
                            <div className="products">
                                {
                                    products &&
                                    products?.map((product) => (
                                        <ProductCard
                                            key={product?._id}
                                            product={product}
                                        />
                                    ))
                                }
                            </div>

                            {/* filter product  */}
                            <div className="filterBox">
                                <Typography> Filter by Price </Typography>
                                <Slider
                                    value={price}
                                    onChange={priceHandler}
                                    valueLabelDisplay="auto"
                                    aria-labelledby='range-slider'
                                    min={0}
                                    max={25000}
                                >

                                </Slider>

                                <Typography> Filter by Category </Typography>
                                <ul className='categoryBox'>
                                    {
                                        categories.map((category) => (
                                            <li
                                                className='category-link'
                                                key={category}
                                                onClick={() => setCategory(category)}
                                            >
                                                {category}
                                            </li>
                                        ))

                                    }
                                    <li
                                        className='category-link'
                                        onClick={refreshPage}
                                    > All </li>

                                </ul>

                            </div>

                            {
                                resultPerPage < count && (
                                    <div className='paginationBox'>
                                        <Pagination
                                            activePage={currentPage}

                                            itemsCountPerPage={resultPerPage}
                                            totalItemsCount={productsCount}
                                            onChange={setCurrentPageNo}
                                            nextPageText="Next"
                                            prevPageText="Prev"
                                            firstPageText="First"
                                            lastPageText="Last"
                                            itemClass='page-item'
                                            linkClass='page-link'
                                            activeClass='pageItemActive'
                                            activeLinkClass='pageLinkActive'
                                        ></Pagination>
                                    </div>
                                )
                            }


                        </Fragment>
                    )
            }
        </Fragment>
    );
};

export default Products;