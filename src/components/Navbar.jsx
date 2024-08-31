import React from 'react'
import Logo from '../assets/Navbar/Logo.png'
import calenderDots from '../assets/Navbar/CalendarDots.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="Navbar">
            <div className="Logo">
                <img src={Logo} alt="" />
            </div>
            <div className="Navigation">
                <div className="Navigation_link">
                    <Link to='/'>Home</Link>
                </div>
                <div className="Navigation_link">
                    <Link to="/membership">Memberships</Link>
                </div>
                <div className="Navigation_link">
                    <Link to="/staff">Staff</Link>
                </div>
                <div className="Navigation_link">
                    <a href="">Gallery</a>
                </div>
                <div className="Navigation_link">
                    <a href="">About Us</a>
                </div>
                <div className="Navigation_link">
                    <a href="">Contact us</a>
                </div>






            </div>
            <div className="RightMenu">
                <img src={calenderDots} alt="" />
                <button>Memberships</button>
            </div>
        </div>
    )
}

export default Navbar
