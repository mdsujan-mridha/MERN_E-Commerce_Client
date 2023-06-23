import { Face, LockOpen, MailOutline } from '@mui/icons-material';
import React, { Fragment, useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, login, register } from '../../actions/userAction';
import profileImage from "../../images/profile.svg";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";

import "./LoginSignUp.css";

const LoginSignUp = () => {

    const dispatch = useDispatch();

    const { error, loading, isAuthenticated } = useSelector((state) => state.user);

    //    all sate management 

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });
    const { name, email, password } = user;
    const [avatar, setAvatar] = useState(profileImage);
    const [avatarPreview, setAvatarPreview] = useState(profileImage);

    //tab
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    // navigate 
    const navigate = useNavigate();
    let location = useLocation();
    //   login 

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    }

    // register 

    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
        console.log(name,email,password);



    };
    // register data change

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[[0]]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }

    };

    //  redirect user 
    const redirect = location.search ? location.search.split("=")[1] : "/account";
    //  useEffect 
    useEffect(() => {
        if (error) {
            // console.log(error);
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            toast.success("Your Logged in")
            navigate(redirect)
        }
    }, [dispatch, error, navigate, isAuthenticated, redirect]);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");

        }

        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }


    return (
        <Fragment>
            {
                loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <div className="LoginSignUpContainer">
                            <div className="LoginSignUpBox">
                                <div>
                                    <div className="login_signUp_toggle">
                                        <p onClick={(e) => switchTabs(e, "login")}> LOGIN </p>
                                        <p onClick={(e) => switchTabs(e, "register")}> REGISTRATION </p>
                                    </div>
                                    <button ref={switcherTab}></button>
                                </div>
                                <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>

                                    <div className="loginEmail">
                                        <MailOutline />
                                        <input
                                            type="email"
                                            placeholder='Email'
                                            required
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)}

                                        />
                                    </div>
                                    <div className="loginPassword">
                                        <LockOpen />
                                        <input type="password"
                                            placeholder='password'
                                            required
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                        />
                                    </div>
                                    <Link to="/"> Forget password ? </Link>
                                    <input type="submit" value="Login" className='loginBtn' />
                                </form>
                                <form
                                    className="signUpForm"
                                    ref={registerTab}
                                    encType="multipart/form-data"
                                    onSubmit={registerSubmit}
                                >
                                    <div className="signUpName">
                                        <Face />
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            required
                                            name="name"
                                            value={name}
                                            onChange={registerDataChange}
                                        />
                                    </div>
                                    <div className="signUpEmail">
                                        <MailOutline />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            required
                                            name="email"
                                            value={email}
                                            onChange={registerDataChange}
                                        />
                                    </div>
                                    <div className="signUpPassword">
                                        <LockOpen />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            required
                                            name="password"
                                            value={password}
                                            onChange={registerDataChange}
                                        />
                                    </div>

                                    <div id="registerImage">
                                        <img src={avatarPreview} alt="Avatar Preview" />
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={registerDataChange}
                                        />
                                    </div>
                                    <input type="submit" value="Register" className="signUpBtn" />
                                </form>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    );
};

export default LoginSignUp;