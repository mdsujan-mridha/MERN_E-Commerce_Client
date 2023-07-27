import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from '../../constant/userConstant';
import { Fragment } from 'react';
import Loader from '../Layout/Loader/Loader';
import MetaData from '../Layout/MetaData/MetaData';

import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import "./UpdatePassword.css";

const ChangePassword = () => {
    const dispatch = useDispatch();
    const {error,isUpdate,loading} = useSelector((state)=>state?.profile);
    const[oldPassword,setOldPassword] = useState("");
    const[newPassword,setNewPassword] = useState("");
    const[confirmPassword,setConfirmPassword] = useState("");

    const navigate = useNavigate();


    const updatePasswordSubmit = (e) =>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword",oldPassword);
        myForm.set("newPassword",newPassword);
        myForm.set("confirmPassword",confirmPassword);
       
        dispatch(updatePassword(myForm));

    };

     useEffect( () =>{
         if(error){
            toast.error(error);
            dispatch(clearErrors());
            console.log(error);
         }
        if(isUpdate){
            toast.success("Profile update successful");
            navigate("/account");

            dispatch({
                type:UPDATE_PASSWORD_RESET,
            });
        } 
     },[dispatch,error,navigate,isUpdate]);
    return (
        <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
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
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
    );
};

export default ChangePassword;