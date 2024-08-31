import React from 'react'
import '../css/Footer.css'
import instagram from '../assets/Footer/instagram.png'
import facebook from '../assets/Footer/facebook.png'
import youtube from '../assets/Footer/youtube.png'
import logo from '../assets/Navbar/Logo.png'

const Footer = () => {
    return (
        <div className='Footer'>
            <div className="Footer_box1">
                <div className="Footer_subscribe">
                    <div className="Footer_subscribe_banner">
                        <h1>Subscribe to our newsletters!</h1>
                        <div className="Footer_subscribe_banner_form">
                            <input type="text" placeholder="Enter your email" />
                            <button>
                                Subscribe Now!
                            </button>
                        </div>
                    </div>
                    <div className="Footer_subscribe_banner_nav">
                        <div className="Footer_subscribe_banner_nav_navigation">
                            <a href="">About us</a><a href="">Memberships</a><a href="">Staff</a><a href="">Gallery</a><a href="">A+ squash</a><a href="">Contact us</a>
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
                        <p>Terms of Service</p>
                        <p>Privacy Policy</p>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Footer
