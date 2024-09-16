import React, { useState, useEffect } from 'react';
import '../css/Home.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import client, { urlFor } from '../sanity/sanityClient';
import icon from '../assets/Home/Icon.png';
import Loading from '../components/Loading';

const HomePage = () => {
    const [data, setData] = useState(null);

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
        homepageDescHeading,
        homepageDescText,
        membershipsHeading,
        membershipsDescription,
        membershipCards,
        ourStrengthHeading,
        ourStrengthSubheading,
        ourStrengthDescription,
        ourStrengthImage,
        joinHeading,
        joinText,
        joinButtonText,
        joinBackgroundImage,
    } = data;

    return (
        <div className="HomePage">
            <div className="HomePage_banner" style={{
                backgroundImage: homepageBanner ? `url(${urlFor(homepageBanner)})` : 'none'
            }}>
                <Navbar />
            </div>

            <div className="Homepage_desc">
                <h1>{homepageDescHeading}</h1>
                <p>{homepageDescText}</p>
            </div>

            <div className="Homepage_memberships">
                <div className="Homepage_memberships_heading">
                    <h1>{membershipsHeading}</h1>
                    <p>{membershipsDescription}</p>
                </div>
                <div className="Homepage_memberships_cards">
                    {membershipCards?.map((card, index) => (
                        <div key={index} className="Homepage_memberships_cards_card">

                            <img src={urlFor(card.image)} alt={card.title} />
                            <div className="Homepage_card_box1">
                                <div className="Homepage_card_box1_price1">${card.price.monthly}/Monthly</div>
                                <div className="Homepage_card_box1_price2">${card.price.annually}/Annually</div>
                            </div>
                            <div className="Homepage_card_box2">
                                <h3>{card.title}</h3>
                                <img src={icon} alt="icon" />
                            </div>
                            <div className="Homepage_card_box3">
                                {card.features?.map((feature, i) => (
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
                    <h1>{ourStrengthHeading}</h1>
                    <h2>{ourStrengthSubheading}</h2>
                    <p>{ourStrengthDescription}</p>
                </div>
                <div className="Home_Ourstrength_calendar" style={{
                    backgroundImage: ourStrengthImage ? `url(${urlFor(ourStrengthImage)})` : 'none'
                }}></div>
            </div>

            <div className="Homepage_join" >
                <div className="Home_join_innerBox" style={{
                    backgroundImage: joinBackgroundImage ? `url(${urlFor(joinBackgroundImage)})` : 'none'
                }}>
                    <h1>{joinHeading}</h1>
                    <button>{joinButtonText}</button>
                </div>
            </div>


            <Footer />
        </div>
    );
};

export default HomePage;
