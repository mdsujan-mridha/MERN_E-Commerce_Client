
import { Launch } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { clearErrors, myOrders } from '../../actions/orderAction';
import MetaData from "../Layout/MetaData/MetaData";
import Loader from "../Layout/Loader/Loader";
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import "./MyOrder.css";


const MyOrder = () => {
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector((state) => state.myOrders);

    const { user } = useSelector((state) => state.user);
    const columns = [
        { field: "id", headerName: "OrderID", minWidth: "300", flex: 1 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.row.status === "Delivered" // Corrected: Access status from params.row
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3
        },
        {
            field: "amount",
            headerName: "Amount",
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
                const orderId = params.row.id; // Corrected: Access row.id instead of getValue(params.id, "id")
                return (
                    <Link to={`/order/${orderId}`}>
                        <Launch />
                    </Link>
                );
            },
        },
    ]
    const rows = [];
    orders &&
        orders.forEach((item, index) => {
            console.log(item);
            rows.push({
                itemsQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            });
        });


    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, error])
    return (
        <Fragment>
            <MetaData title={`${user?.name} - Orders`} />
            {
                loading ? (
                    <Loader />
                ) : (
                    <div className="myOrdersPage">
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
                            className='myOrdersTable'
                            autoHeight
                        ></DataGrid>

                        <Typography id="myOrdersHeading"> {user?.name}'s Orders </Typography>
                    </div>
                )
            }
        </Fragment>
    );
};

export default MyOrder;