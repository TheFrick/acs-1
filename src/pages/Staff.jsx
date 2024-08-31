import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../css/Staff.css'
import staff1 from '../assets/Staff/1.png'
import staff2 from '../assets/Staff/2.png'
import staff3 from '../assets/Staff/3.png'
import staff4 from '../assets/Staff/4.png'
import ellipse from '../assets/Staff/Ellipse.png'


const Staff = () => {
    return (
        <div className='staffPage'>
            <div className="StaffPage_banner">
                <Navbar />
                <div className="StaffPage_banner_heading">
                    <h1>Our Staff</h1>
                </div>
            </div>
            <div className="staffPage_box">
                <div className="staffPage_box_image">
                    <img src={staff1} alt="" />
                </div>
                <div className="staffPage_box_content">
                    <div className="staffPage_box_content_headers">
                        <h1>MARK HEATHER</h1>
                        <h3>General Manager & Squash Director</h3>
                    </div>
                    <div className="staffPage_box_content_list">
                        <div className="staffPage_box_content_list_listItem">
                            <img src={ellipse} alt="image" />
                            <p>US & British certified squash professional</p>

                        </div>
                        <div className="staffPage_box_content_list_listItem">
                            <img src={ellipse} alt="image" />
                            <p>Former world ranked #36</p>

                        </div>
                        <div className="staffPage_box_content_list_listItem">
                            <img src={ellipse} alt="image" />
                            <p>US national 25+ and 30+ singles champion</p>

                        </div>
                        <div className="staffPage_box_content_list_listItem">
                            <img src={ellipse} alt="image" />
                            <p>US national 40+ doubles champion</p>

                        </div>
                        <div className="staffPage_box_content_list_listItem">
                            <img src={ellipse} alt="image" />
                            <p>US national 40+ doubles champion</p>

                        </div>
                    </div>
                    <div className="staffPage_box_content_button">
                        <button>Sign up Now</button>
                    </div>
                </div>
            </div>
            <div className="staffPage_box_right">
                <div className="staffPage_box_right_content">
                    <div className="staffPage_box_right_outerListBox">
                        <div className="staffPage_box_right_content_headers">
                            <h1>TOM PASHELY</h1>
                            <h3>Squash Professional</h3>
                        </div>

                        <div className="staffPage_box_right_list">
                            <div className="staffPage_box_right_list_listItem">
                                <img src={ellipse} alt="image" />
                                <p>Former Director of Middle school squash at Sacred Heart Greenwich</p>

                            </div>
                            <div className="staffPage_box_right_list_listItem">
                                <img src={ellipse} alt="image" />
                                <p>2019 National Middle School champions with Sacred Heart Greenwich</p>

                            </div>
                            <div className="staffPage_box_right_list_listItem">
                                <img src={ellipse} alt="image" />
                                <p>2 x PSA tour title</p>

                            </div>
                            <div className="staffPage_box_right_list_listItem">
                                <img src={ellipse} alt="image" />
                                <p>Former world #105</p>

                            </div>
                            <div className="staffPage_box_right_list_listItem">
                                <img src={ellipse} alt="image" />
                                <p>Former England #1 Junior and Captain </p>

                            </div>
                            <div className="staffPage_box_right_list_listItem">
                                <img src={ellipse} alt="image" />
                                <p>US Squash certified coach  </p>

                            </div>
                        </div>
                        <div className="staffPage_box_right_content_button">
                            <button>Sign up Now</button>
                        </div>
                    </div>
                </div>
                <div className="staffPage_box_right_image">
                    <img src={staff2} alt="" />
                </div>
            </div>
            <div className="staffPage_box">
                <div className="staffPage_box_image">
                    <img src={staff3} alt="" />
                </div>
                <div className="staffPage_box_content">
                    <div className="staffPage_box_content_headers">
                        <h1>Rodney Durbach</h1>
                        <h3>Squash Professional</h3>
                    </div>
                    <div className="staffPage_box_content_list">
                        <div className="staffPage_box_content_list_listItem">
                            <img src={ellipse} alt="image" />
                            <p>Current Pro at McCallie High School</p>

                        </div>
                        <div className="staffPage_box_content_list_listItem">
                            <img src={ellipse} alt="image" />
                            <p>Former world #23</p>

                        </div>
                        <div className="staffPage_box_content_list_listItem">
                            <img src={ellipse} alt="image" />
                            <p>7 PSA titles, 1994-2005 (11 years)</p>

                        </div>
                        <div className="staffPage_box_content_list_listItem">
                            <img src={ellipse} alt="image" />
                            <p>Former Head Pro at Fish Hoek Squash Club, SA</p>

                        </div>
                    </div>
                    <div className="staffPage_box_content_button">
                        <button>Sign up Now</button>
                    </div>
                </div>
            </div>
            <div className="staffPage_box_right">
                <div className="staffPage_box_right_content">
                    <div className="staffPage_box_right_outerListBox">
                        <div className="staffPage_box_right_content_headers">
                            <h1>EMILY TERRY</h1>
                            <h3>Director of Academics and Squash at A+ Squash</h3>
                        </div>

                        <div className="staffPage_box_right_list">
                            <div className="staffPage_box_right_list_listItem">
                                <img src={ellipse} alt="image" />
                                <p>US Squash Level I Coach</p>

                            </div>
                            <div className="staffPage_box_right_list_listItem">
                                <img src={ellipse} alt="image" />
                                <p>Former Assistant Men's and Women's Squash Coach at St. Lawrence University</p>

                            </div>
                            <div className="staffPage_box_right_list_listItem">
                                <img src={ellipse} alt="image" />
                                <p>Four-year varsity squash player and two-year captain for St. Lawrence University</p>

                            </div>

                        </div>
                        <div className="staffPage_box_right_content_button">
                            <button>Sign up Now</button>
                        </div>
                    </div>
                </div>
                <div className="staffPage_box_right_image">
                    <img src={staff4} alt="" />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Staff
