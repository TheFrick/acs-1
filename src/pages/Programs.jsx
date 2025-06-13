import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/Staff.css';
import ellipse from '../assets/Staff/Ellipse.png';
import client, { urlFor } from '../sanity/sanityClient';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import icon from '../assets/Home/Icon.png';

const Staff = () => {
    const [pageData, setPageData] = useState(null);
    const [selectedTab, setSelectedTab] = useState('adult'); // default to adult

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch('*[_type == "membershipsPage"][0]');
                setPageData(result);
            } catch (error) {
                console.error('Error fetching data from Sanity:', error);
            }
        };

        fetchData();

        const subscription = client.listen(`*[_type == "membershipsPage"]`).subscribe((update) => {
            if (update.result) {
                setPageData(update.result);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    if (!pageData) return <Loading />;

    return (
        <div className='staffPage'>
            <div
                className="StaffPage_banner"
                style={{ backgroundImage: `url(${urlFor(pageData?.banner?.backgroundImage).url()})` }}
            >
                <Navbar />
                <div className="StaffPage_banner_heading">
                    <h1>PROGRAMS</h1>
                </div>
            </div>

            {/* Toggle Buttons */}
            <div className="program_toggle_buttons" style={{ textAlign: 'center', margin: '2rem 0' }}>
                {pageData.showAdultProgramming && (
                    <button
                        onClick={() => setSelectedTab('adult')}
                        className={`program_btn ${selectedTab === 'adult' ? 'active' : ''}`}
                    >
                        Adult Programming
                    </button>
                )}
                {pageData.showJuniorProgramming && (
                    <button
                        onClick={() => setSelectedTab('junior')}
                        className={`program_btn ${selectedTab === 'junior' ? 'active' : ''}`}
                    >
                        Junior Programming
                    </button>
                )}
            </div>

            {/* Adult Programming Section */}
            {selectedTab === 'adult' && pageData.showAdultProgramming && (
                <div className="membershipPage_ap">
                    <div className="membershipPage_ap_heading">
                        <h1>{pageData.adultProgramming.heading}</h1>
                    </div>
                    <div className="membershipPage_ap_cards">
                        {pageData?.adultProgramming.programs.map((program, index) => (
                            <div key={index} className="membershipPage_ap_cards_card">
                                <div className="membershipPage_ap_cards_img">
                                    <img src={urlFor(program.image).url()} alt={program.title} />
                                </div>
                                <div className="membershipPage_ap_cards_title">
                                    <h3>{program.title}</h3>
                                </div>
                                {program.price && (
                                    <div className="membershipPage_ap_cards_prices">
                                        <div className="membershipPage_ap_cards_prices_priceBox">
                                            {program.price}
                                        </div>
                                    </div>
                                )}
                                <div className="membershipPage_ap_cards_list">
                                    {program?.details?.map((detail, i) => (
                                        <li key={i}>{detail}</li>
                                    ))}
                                </div>
                                <div className="membershipPage_ap_cards_button">
                                    <Link to={program.link}>
                                        <p>Register
                                        <img style={{ marginLeft: '0.5rem' }} src={icon} alt="" />
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Junior Programming Section */}
            {selectedTab === 'junior' && pageData.showJuniorProgramming && (
                <div className="membershipPage_jp">
                    <div className="membershipPage_jp_heading">
                        <h1>{pageData.juniorProgramming.heading}</h1>
                    </div>
                    <div className="membershipPage_jp_cards">
                        {pageData.juniorProgramming.programs.map((program, index) => (
                            <div key={index} className="membershipPage_jp_cards_card">
                                <div className="membershipPage_jp_cards_img">
                                    <img src={urlFor(program.image).url()} alt={program.title} />
                                </div>
                                <div className="membershipPage_jp_cards_title">
                                    <h3>{program.title}</h3>
                                </div>
                                <div className="membershipPage_jp_cards_list">
                                    <li>{program.description}</li>
                                </div>
                                <div className="membershipPage_jp_cards_button">
                                    <Link to={program.link}>
                                        <p>{program.buttonText}</p>
                                        <img src={icon} alt="" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Staff;
