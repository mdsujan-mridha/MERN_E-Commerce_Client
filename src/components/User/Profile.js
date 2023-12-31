import React from 'react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../Layout/Loader/Loader';
import MetaData from '../Layout/MetaData/MetaData';
import "./Profile.css";
import { useNavigate,Link } from "react-router-dom";
import { useEffect } from 'react';

const Profile = () => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);


    const navigate = useNavigate();
     
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [navigate, isAuthenticated]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${user.name}'s Profile`} />
                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            <img src={user?.avatar?.url} alt={user.name} />
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{String(user.createdAt).substr(0, 10)}</p>
                            </div>

                            <div>
                                <Link to="/orders">My Orders</Link>
                                <Link to="/update/password">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Profile;