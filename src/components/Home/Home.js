import React, { Fragment, useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProduct } from '../../actions/productAction';
import Loader from '../Layout/Loader/Loader';
import MetaData from '../Layout/MetaData/MetaData';
import "./Home.css";
import ProductCard from './ProductCard';

const Home = () => {

    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products)

    useEffect(() => {
    
        dispatch(getProduct())
        if (error) {
            return toast.error(error);
          }
    }, [dispatch,error])


  


    return (

        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title="E-Commerce Website" />
                <div className="banner">
                    <p> Welcome to E-Commerce </p>
                    <h1> Find Amazing Products Bellow </h1>
                    <a href="#container">
                        <button> scroll <CgMouse />   </button>
                    </a>
                </div>
                <h2 className="homeHeading">Featured Products</h2>
                <div className="container" id='container'>
                    {
                        products && products.map(product => (
                            <ProductCard
                                key={product._id}
                                product={product} />
                        ))
                    }

                </div>
            </Fragment>}

        </Fragment>
    );
};

export default Home;