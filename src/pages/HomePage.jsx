import React from 'react'
import '../css/Home.css'
import Navbar from '../components/Navbar'
import card1 from '../assets/Home/card1.png'
import card2 from '../assets/Home/card2.png'
import card3 from '../assets/Home/card3.png'
import icon from '../assets/Home/icon.png'
import Calender1 from '../assets/Home/Calendar1.png'
import Footer from '../components/Footer'

const HomePage = () => {
    return (
        <div className="HomePage">
            <div className="HomePage_banner">
                <Navbar />
            </div>
            <div className="Homepage_desc">
                <h1>ACS Is a world-class facility and Atlanta's only community-based squash facility. We are on a mission to support and empower Atlanta's diverse population.</h1>
                <p>Comprising five singles courts and one hardball doubles court, ACS provides affordable access to squash in Atlanta for all levels of play and is the new home of A+ Squash, an Atlanta-based nonprofit organization that transforms the lives of young people through the sport of squash and ongoing educational support.</p>
            </div>
            <div className="Homepage_memberships">
                <div className="Homepage_memberships_heading">
                    <h1>Featured Memberships</h1>
                    <p>Members enjoy exclusive access to camps, programs, and more.</p>
                </div>
                <div className="Homepage_memberships_cards">
                    <div className="Homepage_memberships_cards_card">
                        <img src={card1} alt="" />
                        <div className="Homepage_card_box1">
                            <div className="Homepage_card_box1_price1">
                                $105/Monthly
                            </div>
                            <div className="Homepage_card_box1_price2">
                                $1100/Annually
                            </div>
                        </div>
                        <div className="Homepage_card_box2">
                            <h3>Individual</h3>
                            <img src={icon} alt="" />
                        </div>
                        <div className="Homepage_card_box3">

                            <li>Access to court reservation</li>

                        </div>
                    </div>
                    <div className="Homepage_memberships_cards_card">
                        <img src={card2} alt="" />
                        <div className="Homepage_card_box1">
                            <div className="Homepage_card_box1_price1">
                                $145/Monthly
                            </div>
                            <div className="Homepage_card_box1_price2">
                                $1380/Annually
                            </div>
                        </div>
                        <div className="Homepage_card_box2">
                            <h3>Family</h3>
                            <img src={icon} alt="" />
                        </div>
                        <div className="Homepage_card_box3">

                            <li>Access to court reservation</li>
                            <li> 7/ Week</li>

                        </div>
                    </div>
                    <div className="Homepage_memberships_cards_card">
                        <img src={card3} alt="" />
                        <div className="Homepage_card_box1">
                            <div className="Homepage_card_box1_price1">
                                $70/Monthly
                            </div>
                            <div className="Homepage_card_box1_price2">
                                $660/Annually
                            </div>
                        </div>
                        <div className="Homepage_card_box2">
                            <h3>Juniors</h3>
                            <img src={icon} alt="" />
                        </div>
                        <div className="Homepage_card_box3">

                            <li>Juniors 22 and below</li>
                            <li> 7/ Week</li>

                        </div>
                    </div>
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
                <div className="Home_Ourstrength_calendar">

                </div>
            </div>
            <div className="Homepage_join">
                <div className="Home_join_innerBox">
                    <h1>Join us at our club, built by generous donors who envisioned an affordable community squash center.</h1>
                    <button>Sign up now</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage
