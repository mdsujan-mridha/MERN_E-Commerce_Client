import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, deleteProduct, getAdminProduct } from '../../actions/productAction';
import { Fragment } from 'react';
import { Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link,useNavigate } from "react-router-dom";
import MetaData from '../Layout/MetaData/MetaData';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import "./ProductList.css";
import { DELETE_ORDER_RESET } from '../../constant/orderConstant';

const ProductList = () => {

    const dispatch = useDispatch();
    const { error, products } = useSelector((state) => state.products);
    // console.log(products);
    //  delete product 
    const {error:deleteError,isDeleted} = useSelector((state)=>state.product);

   const navigate = useNavigate()
     
    const deleteProductHandler = (id) => {
          dispatch(deleteProduct(id));
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }
       if(deleteError){
        toast.warn(deleteError)
        dispatch(clearErrors())
       }
       if(isDeleted){
        toast.success("Product deleted successfully")
        navigate("/admin/dashboard")
        dispatch({type:DELETE_ORDER_RESET})
       }
        dispatch(getAdminProduct())
    }, [error, dispatch,isDeleted,deleteError,navigate]);

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/product/${params.row.id}`}> 
                            <Edit />
                        </Link>

                        <Button
                            onClick={() => deleteProductHandler(params.row.id)} 
                        >
                            <Delete />
                        </Button>
                    </Fragment>
                );
            },
        },
    ]

    const rows = [];
    products &&
        products.forEach((item) => {
            rows.push({
                id: item?._id,
                stock: item?.Stock,
                price: item?.price,
                name: item?.name,
            })
        })
    return (
        <Fragment>
            <MetaData title={`ALL Products - Admin`} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[10]}
                        disableRowSelectionOnClick
                        autoHeight
                        className='productListTable'
                    >
                    </DataGrid>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductList;