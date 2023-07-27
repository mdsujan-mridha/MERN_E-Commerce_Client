import React from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Layout/Loader/Loader';
import MetaData from '../Layout/MetaData/MetaData';
import { useState } from 'react';
import { MailOutline } from '@mui/icons-material';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import "./ForgotPasswordRequest.css";

const ForgotPasswordRequest = () => {
    const dispatch = useDispatch();
    const { error, message, loading } = useSelector((state) => state?.profile);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    }

    useEffect(() => {
        if (error) {
            // console.log(error);
            toast.error(error);
            dispatch(clearErrors());
            console.log(error);
        }
        if (message) {
            toast.success("message");
            console.log(message);

        }
    }, [dispatch, error, message]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Change Password" />
                    <div className="forgotPasswordContainer">
                        <div className="forgotPasswordBox">
                            <h2 className="forgotPasswordHeading">Forgot Password</h2>
                            <form
                                className="forgotPasswordForm"
                                onSubmit={forgotPasswordSubmit}
                            >
                                <div className="forgotPasswordEmail">
                                    <MailOutline />
                                    <input
                                        type="email"
                                        placeholder='Email'
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Send"
                                    className="forgotPasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default ForgotPasswordRequest;