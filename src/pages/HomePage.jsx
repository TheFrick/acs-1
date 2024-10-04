import React, { useState, useEffect } from 'react';
import '../css/Home.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import client, { urlFor } from '../sanity/sanityClient';
import icon from '../assets/Home/Icon.png';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [data, setData] = useState(null);
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const homepageData = await client.fetch(`*[_type == "homepage"][0]`);
            setData(homepageData);
        };

        fetchData();
        const subscription = client.listen(`*[_type == "homepage"]`).subscribe((update) => {
            if (update.result) {
                setData(update.result);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    if (!data) {
        return <Loading />;
    }

    const {
        homepageBanner,
        showDescHeading,
        homepageDescHeading,
        showDescText,
        homepageDescText,
        membershipSectionLink,
        showMembershipsHeading,
        membershipsHeading,
        showMembershipsDescription,
        membershipsDescription,
        showMembershipCards,
        membershipCards,
        showOurStrengthSection,
        ourStrengthHeading,
        ourStrengthSubheading,
        ourStrengthDescription,
        ourStrengthImage,
        showJoinSection,
        joinHeading,
        joinButtonText,
        joinBackgroundImage,
        joinSectionLink
    } = data;
    const makeUrl = (filename) => {
        const regex = /^file-([a-f0-9]{40})-([a-z0-9]+)$/i;
        const match = filename.match(regex);
        if (match) {
            const id = match[1];
            const extension = match[2];
            console.log(`https://cdn.sanity.io/files/jb3wm2g5/production/${id}.${extension}`);
            return `https://cdn.sanity.io/files/jb3wm2g5/production/${id}.${extension}`;
        } else {
            return null;
        }
    }

    return (
        <div className="HomePage">
            <div className="HomePage_banner" style={{
                backgroundUrl: homepageBanner ? `${makeUrl(homepageBanner.asset._ref)}` : 'none'
            }}>
                <video
                    autoPlay
                    loop
                    muted
                    className="background-video"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: -1,
                    }}
                >
                    <source src={makeUrl(homepageBanner.asset._ref)} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <Navbar />
            </div>

            <div className="Homepage_desc">
                {showDescHeading && <h1>{homepageDescHeading}</h1>}
                {showDescText && <p>{homepageDescText}</p>}
            </div>

            <div className="Homepage_memberships">
                <div className="Homepage_memberships_heading">
                    {showMembershipsHeading && <h1>{membershipsHeading}</h1>}
                    {showMembershipsDescription && <p>{membershipsDescription}</p>}
                </div>
                {showMembershipCards && (
                    <div className="Homepage_memberships_cards">
                        {membershipCards?.map((card, index) => (
                            <div key={index} className="Homepage_memberships_cards_card">
                                <img src={urlFor(card.image)} alt={card.title} className='Homepage_memberships_cards_card_img' />
                                <div className="Homepage_card_box1">
                                    <div className="Homepage_card_box1_price1">${card.price.monthly}/Monthly</div>
                                    <div className="Homepage_card_box1_price2">${card.price.annually}/Annually</div>
                                </div>
                                <div className="Homepage_card_box2">
                                    <h3>{card.title}</h3>
                                    <Link to={card.link}> <img src={icon} alt="icon" /></Link>

                                </div>
                                <div className="Homepage_card_box3">
                                    {card.features?.map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="Homepage_memberships_button">
                    <Link to={membershipSectionLink && membershipSectionLink}>
                        <button>
                            Explore More!
                        </button>
                    </Link>

                </div>
            </div>
            {showOurStrengthSection && (
                <>
                    <div className="Home_Ourstrength">
                        <div className="Home_Ourstrength_heading">
                            <h1>{ourStrengthHeading}</h1>
                            <h2>{ourStrengthSubheading}</h2>
                            <p>{ourStrengthDescription}</p>
                        </div>
                        <div className="Home_Ourstrength_calendar" style={{
                            backgroundImage: ourStrengthImage ? `url(${urlFor(ourStrengthImage)})` : 'none'
                        }}></div>
                    </div>
                </>
            )}
            {
                showJoinSection &&
                <>
                    <div className="Homepage_join" >
                        <div className="Home_join_innerBox" style={{
                            backgroundImage: joinBackgroundImage ? `url(${urlFor(joinBackgroundImage)})` : 'none'
                        }}>
                            <h1>{joinHeading}</h1>
                            <Link to={joinSectionLink}>
                                <button>{joinButtonText}</button>
                            </Link>

                        </div>
                    </div>
                </>

            }
            <Footer />
        </div>
    );
};

export default HomePage;