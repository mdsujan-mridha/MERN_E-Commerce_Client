import React from 'react';
import { Link } from 'react-router-dom';
import "./footer.css";
const Footer = () => {
    const date = new Date().getFullYear()
    return (
        <footer>
            <div className='main'>
                <div className="left">
                    <h1> About us </h1>
                    <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia laudantium sequi labore! </p>
                </div>
                <div className="middle">
                    <h1> E-Commerce </h1>
                    <p> High Quality is our priority </p>
                    <p> copyright  {date} @SUJAN </p>
                </div>
                <div className="right">
                    <h3> Quick Link </h3>
                    <ul>
                        <li><Link href="#">Home</Link></li>
                        <li><Link href="#">Product</Link></li>
                        <li><Link href="#">About</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;