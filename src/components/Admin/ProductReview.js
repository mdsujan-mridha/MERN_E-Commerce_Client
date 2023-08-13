import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, deleteReviews, getAllReviews } from '../../actions/productAction';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { DELETE_REVIEW_RESET } from '../../constant/productConstant';
import { useNavigate } from "react-router-dom";
import { Delete, Star } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Fragment } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from './Sidebar';
import MetaData from '../Layout/MetaData/MetaData';
import "./productReview.css";

const ProductReview = () => {

    const dispatch = useDispatch();

    const { error: deleteError, isDeleted } = useSelector((state) => state.review);

    const { loading, error, reviews } = useSelector((state) => state.productReviews);
    console.log(reviews);


    const navigate = useNavigate();

    const [productId, setProductId] = useState("")

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews(reviewId, productId));

    }

    const productReviewSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    }

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success("Review Delete Successfully");
            navigate("/admin/dashboard");
            dispatch({ type: DELETE_REVIEW_RESET });
        }
        // dispatch(getAllReviews())
    }, [dispatch, isDeleted, deleteError, error, navigate, productId]);

    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

        {
            field: "user",
            headerName: "User",
            minWidth: 200,
            flex: 0.6,
        },

        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 1,
        },

        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 180,
            flex: 0.4,

            cellClassName: (params) => {
                return params.row.rating >= 3 // Corrected: Access rating from params.row
                    ? "greenColor"
                    : "redColor";
            },
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
                        <Button
                            onClick={() => deleteReviewHandler(params.row.id)}
                        >
                            <Delete />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    reviews &&
        reviews.forEach((item) => {
            rows.push({
                id: item._id,
                rating: item.rating,
                comment: item.comment,
                user: item.name,
            });
        });
    return (
        <Fragment>
            <MetaData title={`ALL REVIEWS - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productReviewsContainer">
                    <form
                        className="productReviewsForm"
                        onSubmit={productReviewSubmitHandler}
                    >
                        <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

                        <div>
                            <Star />
                            <input
                                type="text"
                                placeholder="Product Id"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={
                                loading ? true : false || productId === "" ? true : false
                            }
                        >
                            Search
                        </Button>
                    </form>

                    {reviews && reviews.length > 0 ? (
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
                        />
                    ) : (
                        <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ProductReview;