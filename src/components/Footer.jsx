import React from 'react'
import '../css/Footer.css'
import instagram from '../assets/Footer/instagram.png'
import facebook from '../assets/Footer/facebook.png'
import youtube from '../assets/Footer/youtube.png'
import logo from '../assets/Navbar/Logo.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import emailjs from 'emailjs-com';


const Footer = () => {

    const [from, setFrom] = useState("");
    const handleClick = () => {
        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_SUBS_ID,
            {
                message: from
            },
            import.meta.env.VITE_EMAILJS_USER_ID
        )
            .then((response) => {
                alert("Message sent successfully!");
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    }

    return (
        <div className='Footer'>
            <div className="Footer_box1">
                <div className="Footer_subscribe">
                    <div className="Footer_subscribe_banner">
                        <h1>Subscribe to our newsletters!</h1>
                        <div className="Footer_subscribe_banner_form">
                            <input type="text" placeholder="Enter your email" onChange={(e) => setFrom(e.target.value)} />
                            <button onClick={handleClick}>
                                Subscribe Now!
                            </button>
                        </div>
                    </div>
                    <div className="Footer_subscribe_banner_nav">
                        <div className="Footer_subscribe_banner_nav_navigation">
                            <Link to="/">Home</Link><Link to="/membership">Memberships</Link><Link to="/staff">Staff</Link><Link to="/gallery">Gallery</Link><Link to="/about">About us</Link><a href='https://www.aplussquash.org/' target="_blank">A+ Squash</a><Link to="/contact">Contact us</Link>
                        </div>
                        <div className="Footer_subscribe_banner_nav_socials">
                            <img src={instagram} alt="" /><img src={facebook} alt="" /><img src={youtube} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="Footer_box2">
                <div className="Footer_box2_innerBox">
                    <div className="Footer_box2_box1">
                        © 2024 ACS. All rights reserved.
                    </div>
                    <div className="Footer_box2_box2">
                        <img src={logo} alt="" />
                    </div>
                    <div className="Footer_box2_box3">
                        Terms of Service &nbsp;&nbsp;&nbsp;&nbsp; Privacy Policy
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Footer
