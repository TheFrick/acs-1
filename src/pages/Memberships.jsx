import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/Membership.css';
import client, { urlFor } from '../sanity/sanityClient';
import icon from '../assets/Home/Icon.png';
import Loading from '../components/Loading';
import eventPointer from '../assets/Membership/Vector.png';
import { Link } from 'react-router-dom';


const Memberships = () => {
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch('*[_type == "membershipsPage"][0]');
                setPageData(result);
                console.log('Fetched data from Sanity:', result);
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
                    <h1>{pageData.banner.heading.toUpperCase()}</h1>
                </div>
            </div>
            {
                pageData.showMembershipPlans &&
                <div className="membershipPage_box1">
                    <div className="membershipPage_box1_box1">
                        {pageData.membershipPlans.map((plan, index) => (
                            <a href={plan.link} target='/blank'>
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
                                            {
                                                plan.initiationFee ? <div className="membershipPage_box1_card_content_price_price3">

                                                    {plan.title == "Summer Student Membership" ? `Fee - ${plan.initiationFee}` : `Initiation Fee - ${plan.initiationFee}`}

                                                </div> : null

                                            }
                                        </div>
                                        <div className="membershipPage_box1_card_content_heading">
                                            <h3>{plan.title}</h3>
                                            <Link to={plan.link}><img src={icon} alt="" /></Link>

                                        </div>
                                        <div className="membershipPage_box1_card_content_list">
                                            {plan?.features.map((feature, i) => (
                                                <li key={i}>{feature}</li>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </a>
                        ))}

                    </div>
                </div>
            }
            {pageData.showWeeklyPrivateSessions && (

                <div className="membershipPage_wps">
                    <div className="membershipPage_wps_heading">
                        <h1>{pageData.weeklyPrivateSessions.heading}</h1>
                    </div>
                    <div className="membershipPage_wps_cards">
                        {pageData?.weeklyPrivateSessions.coaches.map((coach, index) => (
                            <a href={coach.link} target='/blank'>
                                <div key={index} className="membershipPage_wps_cards_card">
                                    <div className="membershipPage_wps_cards_card_img">
                                        <img src={urlFor(coach.image).url()} alt={coach.name} />
                                    </div>
                                    {coach.caption && (
                                        <div className="membershipPage_wps_cards_card_caption">
                                            <p>{coach.caption}</p>
                                        </div>
                                    )}
                                    {coach.name && (
                                        <div className="membershipPage_wps_cards_card_name">
                                            <h3>{coach.name}</h3>
                                        </div>
                                    )}
                                    <div className="membershipPage_wps_cards_card_price">
                                        {coach.prices?.hourly && (
                                            <div className="membershipPage_wps_cards_card_price1">
                                                ${coach.prices.hourly}/hr
                                            </div>
                                        )}
                                        {coach.prices?.['forty_five_minutes'] && (
                                            <div className="membershipPage_wps_cards_card_price2">
                                                ${coach.prices['forty_five_minutes']}/45 min
                                            </div>
                                        )}
                                        {coach.prices?.['thirty_minutes'] && (
                                            <div className="membershipPage_wps_cards_card_price3">
                                                ${coach.prices['thirty_minutes']}/30 min
                                            </div>
                                        )}
                                    </div>
                                    <div className="membershipPage_wps_cards_card_button">
                                        <Link to={coach.link}>
                                            <p>View Coach</p>
                                            <img src={icon} alt="" />
                                        </Link>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                    <div className="membershipPage_wps_button">
                        <Link to={pageData.weeklyPrivateSessions.learnMoreLink}>
                            <button>{pageData.weeklyPrivateSessions.learnMoreButton}</button>
                        </Link>
                    </div>
                </div>
            )
            }
            {/* {
                pageData.showAdultProgramming && <div className="membershipPage_ap">
                    <div className="membershipPage_ap_heading">
                        <h1>{pageData.adultProgramming.heading}</h1>
                    </div>
                    <div className="membershipPage_ap_cards">
                        {pageData?.adultProgramming.programs.map((program, index) => (
                            <a >
                                <div key={index} className="membershipPage_ap_cards_card">
                                    <div className="membershipPage_ap_cards_img">
                                        <img src={urlFor(program.image).url()} alt={program.title} />
                                    </div>
                                    <div className="membershipPage_ap_cards_title">
                                        <h3>{program.title}</h3>
                                    </div>
                                    {
                                        program.price && <div className="membershipPage_ap_cards_prices">
                                            <div className="membershipPage_ap_cards_prices_priceBox">
                                                {program.price}
                                            </div>
                                        </div>
                                    }

                                    <div className="membershipPage_ap_cards_list">
                                        {
                                            program?.details?.map((detail, index) => (
                                                <li key={index}>{detail}</li>
                                            ))
                                        }
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            }
            {
                pageData.showJuniorProgramming && <div className='membershipPage_jp'>
                    <div className="membershipPage_jp_heading">
                        <h1>{pageData.juniorProgramming.heading}</h1>
                    </div>
                    <div className="membershipPage_jp_cards">
                        {pageData.juniorProgramming.programs.map((program, index) => (
                            <a href={program.link} target='_blank'>
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
                            </a>
                        ))}
                    </div>
                </div>
            } */}
            {
                pageData.showSummerCamp &&
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
                            <h2>{pageData.summerCamp.SubHeading}</h2>

                            <Link to={pageData.summerCamp.registerButtonLink}><button>{pageData.summerCamp.registerButtonText}</button></Link>
                        </div>
                    </div>
                </div>
            }
            {
                pageData.showCallToAction && <div className="membershipPage_SQ">
                    <div className="membershipPage_SQ_internalBox" style={{ backgroundImage: `url(${urlFor(pageData.callToAction.background).url()})` }}>
                        <h1>{pageData.callToAction.text}</h1>
                        <Link to={pageData.callToAction.buttonLink}><button>{pageData.callToAction.buttonText}</button></Link>
                    </div>
                </div>
            }
            {
                pageData.showEventBanner &&
                <div className="membershipPage_event_banner">
                    <div className="membershipPage_event_banner_internalBox" style={{ backgroundImage: `url(${urlFor(pageData.eventBanner.eventBannerImage).url()})` }}>
                        <div className="membershipPage_event_banner_internalBox_box1">
                            <h1>{pageData.eventBanner.evenetBannerTitle}</h1>
                            <h3>{pageData.eventBanner.eventBannerSubHeading}</h3>
                            <button>{pageData.eventBanner.eventBannerCardButton}</button>
                        </div>
                        <div className="membershipPage_event_banner_internalBox_box2">
                            <div className="membershipPage_event_banner_internalBox_box2_box1">
                                <div className="membershipPage_event_banner_internalBox_box2_box1_card">
                                    <p>{pageData.eventBanner.eventBannerCard1}</p>
                                </div>
                                <div className="membershipPage_event_banner_internalBox_box2_box1_card">
                                    <p>{pageData.eventBanner.eventBannerCard2}</p>
                                </div>
                                <div className="membershipPage_event_banner_internalBox_box2_box1_card">
                                    <p>{pageData.eventBanner.eventBannerCard3}</p>
                                </div>
                            </div>
                            <div className="membershipPage_event_banner_internalBox_box2_box2">
                                <div className="membershipPage_event_banner_internalBox_box2_box2_list">
                                    <h1>Camp Includes</h1>
                                    {
                                        pageData.eventBanner.eventBannerFeatures.map((feature, index) => (
                                            <div key={index} className="membershipPage_event_banner_internalBox_box2_box2_list_item">
                                                <img src={eventPointer} className='membershipPage_event_banner_internalBox_box2_box2_list_item_img' alt="" />
                                                <p>{feature}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </div >
    );
};

export default Memberships;