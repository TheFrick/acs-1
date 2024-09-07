import React, { useState } from 'react';
import '../css/Home.css';
import Navbar from '../components/Navbar';
import card1 from '../assets/Home/card1.png';
import card2 from '../assets/Home/card2.png';
import card3 from '../assets/Home/card3.png';
import icon from '../assets/Home/Icon.png';
import Footer from '../components/Footer';
import { Menu } from 'lucide-react';

const HomePage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const membershipCards = [
        { img: card1, title: 'Individual', price: { monthly: 105, annually: 1100 }, features: ['Access to court reservation'] },
        { img: card2, title: 'Family', price: { monthly: 145, annually: 1380 }, features: ['Access to court reservation', '7/ Week'] },
        { img: card3, title: 'Juniors', price: { monthly: 70, annually: 660 }, features: ['Juniors 22 and below', '7/ Week'] },
    ];

    return (
        <div className="HomePage">
            <div className="HomePage_banner">
                <Navbar />
            </div>
            <div className="Homepage_desc">
                <h1>ACS is a world-class facility and Atlanta's only community-based squash facility. We are on a mission to support and empower Atlanta's diverse population.</h1>
                <p>Comprising five singles courts and one hardball doubles court, ACS provides affordable access to squash in Atlanta for all levels of play and is the new home of A+ Squash, an Atlanta-based nonprofit organization that transforms the lives of young people through the sport of squash and ongoing educational support.</p>
            </div>
            <div className="Homepage_memberships">
                <div className="Homepage_memberships_heading">
                    <h1>Featured Memberships</h1>
                    <p>Members enjoy exclusive access to camps, programs, and more.</p>
                </div>
                <div className="Homepage_memberships_cards">
                    {membershipCards.map((card, index) => (
                        <div key={index} className="Homepage_memberships_cards_card">
                            <img src={card.img} alt={card.title} />
                            <div className="Homepage_card_box1">
                                <div className="Homepage_card_box1_price1">${card.price.monthly}/Monthly</div>
                                <div className="Homepage_card_box1_price2">${card.price.annually}/Annually</div>
                            </div>
                            <div className="Homepage_card_box2">
                                <h3>{card.title}</h3>
                                <img src={icon} alt="icon" />
                            </div>
                            <div className="Homepage_card_box3">
                                {card.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="Homepage_memberships_button">
                    <button>Explore More!</button>
                </div>
            </div>
            <div className="Home_Ourstrength">
                <div className="Home_Ourstrength_heading">
                    <h1>Our strength lies in diversity</h1>
                    <h2>We organize community events with a purpose: social gatherings, tournaments, and leagues for all ages and skill levels, proceeds from these go to support our A+ program. </h2>
                    <p>Our experienced coaching staff offer personalized lessons all days of the week from beginners to college aspirants.</p>
                </div>
                <div className="Home_Ourstrength_calendar"></div>
            </div>
            <div className="Homepage_join">
                <div className="Home_join_innerBox">
                    <h1>Join us at our club, built by generous donors who envisioned an affordable community squash center.</h1>
                    <button>Sign up now</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;