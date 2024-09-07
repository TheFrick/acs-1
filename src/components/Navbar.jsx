import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import state from '../store/state.js';
import Logo from '../assets/Navbar/Logo.png';
import calenderDots from '../assets/Navbar/CalendarDots.png';
import { Menu } from 'lucide-react';

const Navbar = () => {
    const snap = useSnapshot(state);
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        state.currentPage = location.pathname;
    }, [location.pathname]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { to: "/", label: "Home" },
        { to: "/membership", label: "Memberships" },
        { to: "/staff", label: "Staff" },
        { to: "/about", label: "About Us" },
        { to: "/contact", label: "Contact Us" },
    ];

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <img src={Logo} alt="Logo" />
            </div>
            <button className="navbar__hamburger" onClick={toggleMenu}>
                <Menu />
            </button>
            <div className={`navbar__navigation ${isMenuOpen ? 'navbar__navigation--open' : ''}`}>
                {navItems.map(({ to, label }) => (
                    <Link
                        key={to}
                        to={to}
                        className={`navbar__link ${snap.currentPage === to ? "navbar__link--active" : ""}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {label}
                    </Link>
                ))}
            </div>
            <div className="navbar__right-menu">
                <img src={calenderDots} alt="Calendar Dots" />
                <button className="navbar__button">Memberships</button>
            </div>
        </nav>
    );
};

export default Navbar;