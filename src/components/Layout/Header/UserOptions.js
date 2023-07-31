import { Dashboard, ExitToApp, ListAlt, Person,ShoppingCart } from '@mui/icons-material';
import { Backdrop, SpeedDial, SpeedDialAction } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { logout } from '../../../actions/userAction';
import "./Header.css";

const UserOptions = ({user}) => {
    const{cartItems} = useSelector((state) =>state.cart);
    const[open,setOpen] = useState(false);
    const navigate = useNavigate();
       
    const dispatch = useDispatch();


    const options =[
        {icon:<ListAlt />,name:"Orders",func:orders },
        {icon:<Person />,name:"Profile",func:account },
        {
            icon:(
                <ShoppingCart 
                style={{color:cartItems.length >0 ? "tomato":"unset"}}
                />
            ),
            name:`Cart(${cartItems.length})`,
            func:cart,   
        },
        {icon:<ExitToApp />,name:"Logout",func:logoutUser },
    ];
    if(user.role === "admin"){
        options.unshift({
            icon:<Dashboard/>,
            name:"Dashboard",
            func:dashboard
        })
    }
    function dashboard(){
        navigate("/dashboard")
     }

     function account(){
        navigate("/account")
     }

     function orders(){
        navigate("/orders")
     }
     function logoutUser(){
        dispatch(logout());
        toast.success("Logout Successfully");
        
     }
     function cart(){
        navigate("/cart");
     }

    return (
        <Fragment>
            <Backdrop open={open} style={{zIndex:"10"}} />
           <SpeedDial
            ariaLabel='SpeedDial tooltip example'
            onClose={()=>setOpen(false)}
            onOpen={()=>setOpen(true)}
            open={open}
            direction="down"
            className='speedDial'
            style={{zIndex:"11" }}
            icon={
                <img 
                className='speedDialIcon'
                src={user.avatar.url ? user.avatar.url : "../../../images/profile.svg"}
                alt="Profile"
                />
            }
           >
            {
                options.map((item) =>(
                    <SpeedDialAction
                    key={item?.name} 
                    icon={item?.icon} 
                    onClick={item?.func}
                    tooltipTitle = {item?.name}
                    tooltipOpen={window.innerWidth <= 600 ? true : false}
                     />
                ))
            }
           </SpeedDial>
        </Fragment>
    );
};

export default UserOptions;