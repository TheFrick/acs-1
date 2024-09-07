import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../css/Membership.css'
import card1 from '../assets/Home/card1.png'
import icon from '../assets/Home/Icon.png'
import card2 from '../assets/Home/card2.png'
import card3 from '../assets/Home/card3.png'
import card4 from '../assets/Membership/ssm.png'
import card5 from '../assets/Membership/NRM.png'
import card6 from '../assets/Membership/gfee.png'
import card7 from '../assets/Membership/fp.png'
import staff1 from '../assets/Staff/1.png'
import staff2 from '../assets/Staff/2.png'
import staff3 from '../assets/Staff/3.png'
import staff4 from '../assets/Staff/4.png'
import ap1 from '../assets/Membership/ap1.png'
import ap2 from '../assets/Membership/ap2.png'
import ap3 from '../assets/Membership/ap3.png'
import jp1 from '../assets/Membership/jp1.png'
import jp2 from '../assets/Membership/jp2.png'
import jp3 from '../assets/Membership/jp3.png'
import sC from '../assets/Membership/summerCamp.png'
import logo1 from '../assets/Membership/logo1.png'
import logo2 from '../assets/Membership/logo2.png'
import logo3 from '../assets/Membership/logo3.png'
import logo4 from '../assets/Membership/logo4.png'
import memberBanner from '../assets/Membership/memberBanner.png'


const Memberships = () => {
    return (
        <div className='membershipPage'>
            <div className="membershipPage_banner">
                <Navbar />
                <div className="membershipPage_banner_heading">
                    <h1>Membership Plans</h1>
                </div>
            </div>
            <div className="membershipPage_box1">
                <div className="membershipPage_box1_box1">
                    <div className="membershipPage_box1_card">
                        <div className="membershipPage_box1_card_img">
                            <img src={card1} alt="" />
                        </div>
                        <div className="membershipPage_box1_card_content">
                            <div className="membershipPage_box1_card_content_price">
                                <div className="membershipPage_box1_card_content_price1">
                                    $105/Monthly
                                </div>
                                <div className="membershipPage_box1_card_content_price2">
                                    $1100/Annually
                                </div>
                            </div>
                            <div className="membershipPage_box1_card_content_heading">
                                <h1>Individual</h1>
                                <img src={icon} alt="" />
                            </div>
                            <div className="membershipPage_box1_card_content_list">
                                <li>Access to court reservation</li>
                            </div>
                        </div>
                    </div>
                    <div className="membershipPage_box1_card">
                        <div className="membershipPage_box1_card_img">
                            <img src={card2} alt="" />
                        </div>
                        <div className="membershipPage_box1_card_content">
                            <div className="membershipPage_box1_card_content_price">
                                <div className="membershipPage_box1_card_content_price1">
                                    $145/Monthly
                                </div>
                                <div className="membershipPage_box1_card_content_price2">
                                    $1380/Annually
                                </div>
                            </div>
                            <div className="membershipPage_box1_card_content_heading">
                                <h1>Family</h1>
                                <img src={icon} alt="" />
                            </div>
                            <div className="membershipPage_box1_card_content_list">
                                <li>Access to court reservation</li>
                                <li>7/Week</li>
                            </div>
                        </div>
                    </div>
                    <div className="membershipPage_box1_card">
                        <div className="membershipPage_box1_card_img">
                            <img src={card3} alt="" />
                        </div>
                        <div className="membershipPage_box1_card_content">
                            <div className="membershipPage_box1_card_content_price">
                                <div className="membershipPage_box1_card_content_price1">
                                    $75/Monthly
                                </div>
                                <div className="membershipPage_box1_card_content_price2">
                                    $660/Annually
                                </div>
                            </div>
                            <div className="membershipPage_box1_card_content_heading">
                                <h1>Juniors</h1>
                                <img src={icon} alt="" />
                            </div>
                            <div className="membershipPage_box1_card_content_list">
                                <li>Juniors 22 and below</li>
                                <li>7/Week</li>
                            </div>
                        </div>
                    </div>
                    <div className="membershipPage_box1_card">
                        <div className="membershipPage_box1_card_img">
                            <img src={card4} alt="" />
                        </div>
                        <div className="membershipPage_box1_card_content">
                            <div className="membershipPage_box1_card_content_price">
                                <div className="membershipPage_box1_card_content_price1">
                                    $300/ 3 Months
                                </div>

                            </div>
                            <div className="membershipPage_box1_card_content_heading">
                                <h1>Summer Student Membership</h1>
                                <img src={icon} alt="" />
                            </div>
                            <div className="membershipPage_box1_card_content_list">
                                <li>June - August</li>
                                <li>Access to the Member Perks</li>
                                <li>No initiation fee</li>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mebershipPage_box1_box2">
                    <div className="membershipPage_box1_card">
                        <div className="membershipPage_box1_card_img">
                            <img src={card5} alt="" />
                        </div>
                        <div className="membershipPage_box1_card_content">
                            <div className="membershipPage_box1_card_content_price">
                                <div className="membershipPage_box1_card_content_price2">
                                    $660/Annually
                                </div>

                            </div>
                            <div className="membershipPage_box1_card_content_heading">
                                <h1>Non-Resident
                                    Membership</h1>
                                <img src={icon} alt="" />
                            </div>
                            <div className="membershipPage_box1_card_content_list">
                                <li>No initiation fee</li>
                                <li>Must reside a minimum of 50 miles away from the club.</li>

                            </div>
                        </div>
                    </div>
                    <div className="membershipPage_box1_card">
                        <div className="membershipPage_box1_card_img">
                            <img src={card6} alt="" />
                        </div>
                        <div className="membershipPage_box1_card_content">
                            <div className="membershipPage_box1_card_content_price">


                            </div>
                            <div className="membershipPage_box1_card_content_heading">
                                <h1>Guest Fee</h1>
                                <img src={icon} alt="" />
                            </div>
                            <div className="membershipPage_box1_card_content_list">
                                <li>With Member (4x per year): $25 Per Visit</li>

                            </div>
                        </div>
                    </div>
                    <div className="membershipPage_box1_card">
                        <div className="membershipPage_box1_card_img">
                            <img src={card7} alt="" />
                        </div>
                        <div className="membershipPage_box1_card_content">
                            <div className="membershipPage_box1_card_content_price">
                                <div className="membershipPage_box1_card_content_price1">
                                    $25/Monthly
                                </div>

                            </div>
                            <div className="membershipPage_box1_card_content_heading">
                                <h1>Freeze Policy</h1>
                                <img src={icon} alt="" />
                            </div>
                            <div className="membershipPage_box1_card_content_list">
                                <li>Freeze your membership for $25/month, ensuring flexibility for up to 90 days per year.</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="membershipPage_wps">
                <div className="membershipPage_wps_heading">
                    <h1>WEEKLY PRIVATE SESSIONS</h1>
                </div>
                <div className="membershipPage_wps_cards">
                    <div className="membershipPage_wps_cards_card">
                        <div className="membershipPage_wps_cards_card_img">
                            <img src={staff1} alt="" />
                        </div>
                        <div className="membershipPage_wps_cards_card_caption">
                            FORMER WORLD  #36
                        </div>
                        <div className="membershipPage_wps_cards_card_name">
                            Coach Mark Heather
                        </div>
                        <div className="membershipPage_wps_cards_card_price">
                            <div className="membershipPage_wps_cards_card_price1">
                                $110/1 hr
                            </div>
                            <div className="membershipPage_wps_cards_card_price2">
                                $85/45 min
                            </div>
                            <div className="membershipPage_wps_cards_card_price3">
                                $60/30 min
                            </div>
                        </div>
                        <div className="membershipPage_wps_cards_card_button">
                            <h1>View Coach</h1>
                            <img src={icon} alt="" />
                        </div>
                    </div>
                    <div className="membershipPage_wps_cards_card">
                        <div className="membershipPage_wps_cards_card_img">
                            <img src={staff2} alt="" />
                        </div>
                        <div className="membershipPage_wps_cards_card_caption">
                            FORMER WORLD  #105
                        </div>
                        <div className="membershipPage_wps_cards_card_name">
                            Coach Tom Pashely
                        </div>
                        <div className="membershipPage_wps_cards_card_price">
                            <div className="membershipPage_wps_cards_card_price1">
                                $105/1 hr
                            </div>
                            <div className="membershipPage_wps_cards_card_price2">
                                $80/45 min
                            </div>
                            <div className="membershipPage_wps_cards_card_price3">
                                $55/30 min
                            </div>
                        </div>
                        <div className="membershipPage_wps_cards_card_button">
                            <h1>View Coach</h1>
                            <img src={icon} alt="" />
                        </div>
                    </div>
                    <div className="membershipPage_wps_cards_card">
                        <div className="membershipPage_wps_cards_card_img">
                            <img src={staff3} alt="" />
                        </div>
                        <div className="membershipPage_wps_cards_card_caption">
                            FORMER WORLD  #23
                        </div>
                        <div className="membershipPage_wps_cards_card_name">
                            Coach Rodney Durbach
                        </div>
                        <div className="membershipPage_wps_cards_card_price">
                            <div className="membershipPage_wps_cards_card_price1">
                                $105/1 hr
                            </div>
                            <div className="membershipPage_wps_cards_card_price2">
                                $80/45 min
                            </div>
                            <div className="membershipPage_wps_cards_card_price3">
                                $55/30 min
                            </div>
                        </div>
                        <div className="membershipPage_wps_cards_card_button">
                            <h1>View Coach</h1>
                            <img src={icon} alt="" />
                        </div>
                    </div>
                    <div className="membershipPage_wps_cards_card">
                        <div className="membershipPage_wps_cards_card_img">
                            <img src={staff4} alt="" />
                        </div>
                        <div className="membershipPage_wps_cards_card_caption">
                            US SQUASH LEVEL I COACH
                        </div>
                        <div className="membershipPage_wps_cards_card_name">
                            Coach Emily Terry
                        </div>
                        <div className="membershipPage_wps_cards_card_price">
                            <div className="membershipPage_wps_cards_card_price1">
                                $100/1 hr
                            </div>
                            <div className="membershipPage_wps_cards_card_price2">
                                $75/45 min
                            </div>
                            <div className="membershipPage_wps_cards_card_price3">
                                $50/30 min
                            </div>
                        </div>
                        <div className="membershipPage_wps_cards_card_button">
                            <h1>View Coach</h1>
                            <img src={icon} alt="" />
                        </div>
                    </div>
                </div>
                <div className="membershipPage_wps_button">
                    <button>Learn More</button>
                </div>
            </div>
            <div className="membershipPage_ap">
                <div className="membershipPage_ap_heading">
                    <h1>Adult Programming</h1>
                </div>
                <div className="membershipPage_ap_cards">
                    <div className="membershipPage_ap_cards_card">
                        <div className="membershipPage_ap_cards_img">
                            <img src={ap1} alt="" />
                        </div>
                        <div className="membershipPage_ap_cards_title">
                            <h1>Hardball Doubles</h1>
                        </div>

                        <div className="membershipPage_ap_cards_prices">
                            <div className="membershipPage_ap_cards_prices_priceBox">
                                $25/30 min
                            </div>

                        </div>
                        <div className="membershipPage_ap_cards_list">
                            <li>Learn from the masters</li>
                        </div>
                    </div>
                    <div className="membershipPage_ap_cards_card">
                        <div className="membershipPage_ap_cards_img">
                            <img src={ap2} alt="" />
                        </div>
                        <div className="membershipPage_ap_cards_title">
                            <h1>Box League</h1>
                        </div>

                        <div className="membershipPage_ap_cards_prices">
                            <div className="membershipPage_ap_cards_prices_priceBox">
                                $10/Monthly
                            </div>

                        </div>
                        <div className="membershipPage_ap_cards_list">

                        </div>
                    </div>
                    <div className="membershipPage_ap_cards_card">
                        <div className="membershipPage_ap_cards_img">
                            <img src={ap3} alt="" />
                        </div>
                        <div className="membershipPage_ap_cards_title">
                            <h1>Ladies' Night: Group Clinics</h1>
                        </div>

                        <div className="membershipPage_ap_cards_prices">
                            <div className="membershipPage_ap_cards_prices_priceBox">
                                $25/1.5 Hr
                            </div>

                        </div>
                        <div className="membershipPage_ap_cards_list">
                            <li>Tuesday | 6:30pm - 8:00pm </li>
                            <li>Ladies' Night (Hardball & Softball) </li>
                        </div>
                    </div>
                </div>
            </div>
            <div className='membershipPage_jp'>
                <div className="membershipPage_jp_heading">
                    <h1>Junior Programming</h1>
                </div>
                <div className="membershipPage_jp_cards">
                    <div className="membershipPage_jp_cards_card">
                        <div className="membershipPage_jp_cards_img">
                            <img src={jp1} alt="" />
                        </div>
                        <div className="membershipPage_jp_cards_title">
                            <h1>Clinics</h1>
                        </div>
                        <div className="membershipPage_jp_cards_list">
                            <li>Clinics are open to all levels and limited to 6 juniors per session. More information will be available soon.</li>
                        </div>
                        <div className="membershipPage_jp_cards_button">
                            <h3>Register</h3>
                            <img src={icon} alt="" />
                        </div>
                    </div>
                    <div className="membershipPage_jp_cards_card">
                        <div className="membershipPage_jp_cards_img">
                            <img src={jp2} alt="" />
                        </div>
                        <div className="membershipPage_jp_cards_title">
                            <h1>Tournaments</h1>
                        </div>
                        <div className="membershipPage_jp_cards_list">
                            <li>Take part in an exciting competitive experience—join us for US Squash-sanctioned tournaments! Download the app for more information.</li>
                        </div>
                        <div className="membershipPage_jp_cards_button">
                            <h3>Register</h3>
                            <img src={icon} alt="" />
                        </div>
                    </div>
                    <div className="membershipPage_jp_cards_card">
                        <div className="membershipPage_jp_cards_img">
                            <img src={jp3} alt="" />
                        </div>
                        <div className="membershipPage_jp_cards_title">
                            <h1>Camps</h1>
                        </div>
                        <div className="membershipPage_jp_cards_list">
                            <li>Download the app for more information.</li>
                        </div>
                        <div className="membershipPage_jp_cards_button">
                            <h3>Register</h3>
                            <img src={icon} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="membershipPage_Sc">
                <div className="membershipPage_Sc_heading">
                    <h1>Summer Camp</h1>
                </div>
                <div className="membershipPage_Sc_content">
                    <div className="membershipPage_Sc_content_img">
                        <img src={sC} alt="" />
                    </div>
                    <div className="membershipPage_Sc_content_list">
                        <div className="membershipPage_Sc_content_list_item">
                            <img src={logo1} alt="" />
                            <p>Players should expect daily fitness training, as well as additional enrichment offered throughout the summer, including but not limited to video analysis, yoga, nutritional and mental workshops.</p>
                        </div>
                        <div className="membershipPage_Sc_content_list_item">
                            <img src={logo2} alt="" />
                            <p>Players should expect daily fitness training, as well as additional enrichment offered throughout the summer, including but not limited to video analysis, yoga, nutritional and mental workshops.</p>
                        </div>
                        <div className="membershipPage_Sc_content_list_item">
                            <img src={logo3} alt="" />
                            <p>Players should expect daily fitness training, as well as additional enrichment offered throughout the summer, including but not limited to video analysis, yoga, nutritional and mental workshops.</p>
                        </div>
                        <div className="membershipPage_Sc_content_list_item">
                            <img src={logo4} alt="" />
                            <p>Players should expect daily fitness training, as well as additional enrichment offered throughout the summer, including but not limited to video analysis, yoga, nutritional and mental workshops.</p>
                        </div>
                        <h1>Register For Summer Camp</h1>
                        <button>Sign up now</button>
                    </div>
                </div>
            </div>
            <div className="membershipPage_SQ">
                <div className="membershipPage_SQ_internalBox">
                    <h1>Start squashing — become a member today!</h1>
                    <button>Sign up now</button>
                </div>
            </div>
            <div className="memberShip_junioCamp">
                <div className="memberShip_junioCamp_internalBox">
                    <div className="memberShip_junioCamp_internalBox_button">
                        <button>Sign up now</button>
                    </div>
                </div>
                <div className="memberShip_junioCamp_internalBox_button1">
                    <button>Sign up now</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Memberships
