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
    const [scrollDirection, setScrollDirection] = useState("up");

    useEffect(() => {
        state.currentPage = location.pathname;
    }, [location.pathname]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleScroll = () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll === 0) {
            setScrollDirection("up");
        } else if (currentScroll > prevScroll.current) {
            setScrollDirection("down");
        } else {
            setScrollDirection("up");
        }

        prevScroll.current = currentScroll;
    };

    const prevScroll = React.useRef(window.pageYOffset);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { to: "/", label: "Home" },
        { to: "/membership", label: "Memberships" },
        { to: "/staff", label: "Staff" },
        { to: "/gallery", label: "Gallery" },
        { to: "/about", label: "About Us" },
        { to: "https://www.aplussquash.org/", label: "A+ Squash", external: true }, // Mark this item as external
        { to: "/contact", label: "Contact Us" },
    ];

    return (
        <nav className={`navbar ${scrollDirection === 'down' ? 'navbar--hidden' : ''}`}>
            <div className="navbar__logo">
                <Link to="/"><img src={Logo} alt="Logo" /></Link>
            </div>
            <button className="navbar__hamburger" onClick={toggleMenu}>
                <Menu />
            </button>
            <div className={`navbar__navigation ${isMenuOpen ? 'navbar__navigation--open' : ''}`}>
                {navItems.map(({ to, label, external }) => (
                    external ? (
                        <a
                            key={to}
                            href={to}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="navbar__link"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {label}
                        </a>
                    ) : (
                        <Link
                            key={to}
                            to={to}
                            className={`navbar__link ${snap.currentPage === to ? "navbar__link--active" : ""}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {label}
                        </Link>
                    )
                ))}
            </div>
            <div className="navbar__right-menu">
                <Link to="https://atlantacommunitysquash.playbypoint.com/book/atlantacommunitysquash"><img src={calenderDots} alt="Calendar Dots" /></Link>
                <Link to="https://atlantacommunitysquash.playbypoint.com/f/atlantacommunitysquash/memberships"><button className="navbar__button">Memberships</button></Link>
            </div>
        </nav>
    );
};

export default Navbar;
