import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/Membership.css';
import client, { urlFor } from '../sanity/sanityClient';
import icon from '../assets/Home/Icon.png';
import Loading from '../components/Loading';



const Memberships = () => {
    const [pageData, setPageData] = useState(null);

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

        <div className='membershipPage'>

            <div className="membershipPage_banner" style={{ backgroundImage: `url(${urlFor(pageData.banner.backgroundImage).url()})` }}>
                <Navbar />
                <div className="membershipPage_banner_heading">
                    <h1>{pageData.banner.heading}</h1>
                </div>
            </div>

            <div className="membershipPage_box1">
                <div className="membershipPage_box1_box1">
                    {pageData.membershipPlans.map((plan, index) => (
                        <div key={index} className="membershipPage_box1_card">
                            <div className="membershipPage_box1_card_img">
                                <img src={urlFor(plan.image).url()} alt={plan.title} />
                            </div>
                            <div className="membershipPage_box1_card_content">

                                <div className="membershipPage_box1_card_content_price">
                                    {
                                        plan.monthlyPrice ? <div className="membershipPage_box1_card_content_price1">

                                            ${plan.monthlyPrice}/Monthly

                                        </div> : null
                                    }
                                    {
                                        plan.annualPrice ? <div className='membershipPage_box1_card_content_price2'>
                                            ${plan.annualPrice}/Annually
                                        </div> : null
                                    }
                                </div>
                                <div className="membershipPage_box1_card_content_heading">
                                    <h1>{plan.title}</h1>
                                    <img src={icon} alt="" />
                                </div>
                                <div className="membershipPage_box1_card_content_list">
                                    {plan?.features.map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="membershipPage_wps">
                <div className="membershipPage_wps_heading">
                    <h1>{pageData.weeklyPrivateSessions.heading}</h1>
                </div>
                <div className="membershipPage_wps_cards">
                    {pageData?.weeklyPrivateSessions.coaches.map((coach, index) => (
                        <div key={index} className="membershipPage_wps_cards_card">
                            <div className="membershipPage_wps_cards_card_img">
                                <img src={urlFor(coach.image).url()} alt={coach.name} />
                            </div>
                            <div className="membershipPage_wps_cards_card_caption">
                                {coach.caption}
                            </div>
                            <div className="membershipPage_wps_cards_card_name">
                                {coach.name}
                            </div>
                            <div className="membershipPage_wps_cards_card_price">
                                <div className="membershipPage_wps_cards_card_price1">
                                    ${coach.prices.hourly}/hr
                                </div>
                                <div className="membershipPage_wps_cards_card_price2">
                                    ${coach.prices['forty_five_minutes']}/45 min
                                </div>
                                <div className="membershipPage_wps_cards_card_price3">
                                    ${coach.prices['thirty_minutes']}/30 min
                                </div>
                            </div>
                            <div className="membershipPage_wps_cards_card_button">
                                <h1>View Coach</h1>
                                <img src={icon} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="membershipPage_wps_button">
                    <button>{pageData.weeklyPrivateSessions.learnMoreButton}</button>
                </div>
            </div>

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
                                <h1>{program.title}</h1>
                            </div>
                            <div className="membershipPage_ap_cards_prices">
                                <div className="membershipPage_ap_cards_prices_priceBox">
                                    {program.price}
                                </div>
                            </div>
                            <div className="membershipPage_ap_cards_list">
                                {
                                    program?.details?.map((detail, index) => (
                                        <li key={index}>{detail}</li>
                                    ))
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='membershipPage_jp'>
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
                                <h1>{program.title}</h1>
                            </div>
                            <div className="membershipPage_jp_cards_list">
                                <li>{program.description}</li>
                            </div>
                            <div className="membershipPage_jp_cards_button">
                                <h3>{program.buttonText}</h3>
                                <img src={icon} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="membershipPage_Sc">
                <div className="membershipPage_Sc_heading">
                    <h1>{pageData.summerCamp.heading}</h1>
                </div>
                <div className="membershipPage_Sc_content">
                    <div className="membershipPage_Sc_content_img">
                        <img src={urlFor(pageData.summerCamp.image).url()} alt="Summer Camp" />
                    </div>
                    <div className="membershipPage_Sc_content_list">
                        {pageData?.summerCamp.features.map((feature, index) => (
                            <div key={index} className="membershipPage_Sc_content_list_item">
                                <img src={urlFor(feature.icon).url()} alt="" />
                                <p>{feature.description}</p>
                            </div>
                        ))}
                        <h1>{pageData.summerCamp.SubHeading}</h1>
                        <button>{pageData.summerCamp.registerButtonText}</button>
                    </div>
                </div>
            </div>

            <div className="membershipPage_SQ">
                <div className="membershipPage_SQ_internalBox" style={{ backgroundImage: `url(${urlFor(pageData.callToAction.background).url()})` }}>
                    <h1>{pageData.callToAction.text}</h1>
                    <button>{pageData.callToAction.buttonText}</button>
                </div>
            </div>

            <div className="memberShip_junioCamp">
                <div className="memberShip_junioCamp_internalBox" style={{ backgroundImage: `url(${urlFor(pageData.juniorCampBanner.backgroundImage).url()})` }}>
                    <div className="memberShip_junioCamp_internalBox_button">
                        <button>{pageData.juniorCampBanner.buttonText}</button>
                    </div>
                </div>
                <div className="memberShip_junioCamp_internalBox_button1">
                    <button>{pageData.juniorCampBanner.buttonText}</button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Memberships;