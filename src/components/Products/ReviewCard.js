import { Rating } from '@mui/material';
import React from 'react';
import profilePng from "../../images/profile.svg";
import { Star } from '@mui/icons-material';

const ReviewCard = ({ review }) => {
    const options = {

        value: review.rating,
        readOnly: true,
        precision: 0.5,


    }
    return (
        <div className='reviewCard'>
            <img src={profilePng} alt="User" />
            <p> {review?.name} </p>
            <Rating
                name="text-feedback"
                emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                {...options}
            ></Rating>
            <span className='reviewCardComment'> {review?.comment} </span>

        </div>
    );
};

export default ReviewCard;