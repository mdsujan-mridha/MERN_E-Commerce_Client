import React, { Fragment, useEffect, useState } from 'react';
import Loader from '../Layout/Loader/Loader';
import MetaData from '../Layout/MetaData/MetaData';
import {LockOpen } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userAction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "./ResetPassword.css";


const ResetPassword = ({match}) => {
  
    const dispatch = useDispatch();
    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
      );


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const resetPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(match.params.token,myForm));
      };
      useEffect( ()=>{
         if(error){
            toast.error(error)
            console.log(error);
            dispatch(clearErrors());
         }
         if(success){
            toast.success("Password updated successful")
            navigate("/login")
         } 
      },[error,dispatch,success,navigate]);

    return (
        <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
    );
};

export default ResetPassword;