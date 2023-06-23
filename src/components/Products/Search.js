import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layout/MetaData/MetaData';

import "./search.css";


const Search = () => {

    const [keyword, setKeyword] = useState(" ");

    const navigate = useNavigate();
  

    const searchSubmitHandler = (e) => {

        e.preventDefault();
           if(keyword.trim()){
            navigate(`/products/${keyword}`);
           } else{
            navigate("/products");

           }
    };
    return (
        <Fragment>
            <MetaData title={'Search your products'}/>
            <form className='searchBox' onSubmit={searchSubmitHandler}>
                <input type="text" placeholder='Search a product...' onChange={(e) => setKeyword(e.target.value)} />
                <input type="submit" value="Search" />
            </form>
        </Fragment>
    );
};

export default Search;