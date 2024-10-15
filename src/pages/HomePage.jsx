import React, { useState, useEffect } from 'react';
import '../css/Home.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import client, { urlFor } from '../sanity/sanityClient';
import icon from '../assets/Home/Icon.png';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import logo from '../assets/Navbar/Logo.png'

const HomePage = () => {
    const [data, setData] = useState(null);
    const [podcastData, setPodcastData] = useState(null);
    const [selectedPodcast, setSelectedPodcast] = useState(null);
    const [podcastSectionVisibility, setPodcastSectionVisibility] = useState(true);
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const homepageData = await client.fetch(`*[_type == "homepage"][0]`);
            setPodcastData(homepageData.podcast);
            setSelectedPodcast(homepageData.podcast[0]);
            setPodcastSectionVisibility(homepageData.podcastSectionVisibility);
            setData(homepageData);
        };

        fetchData();
        const subscription = client.listen(`*[_type == "homepage"]`).subscribe(async (update) => {
            if (update.result) {
                const homepageData = await client.fetch(`*[_type == "homepage"][0]`);
                setPodcastData(homepageData.podcast);
                setSelectedPodcast(homepageData.podcast[0]);
                setPodcastSectionVisibility(homepageData.podcastSectionVisibility);
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
            return `https://cdn.sanity.io/files/jb3wm2g5/production/${id}.${extension}`;
        } else {
            return null;
        }
    }


    const handlePodcastClick = (podcast) => {
        setSelectedPodcast(podcast);
    };


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
                <img src={logo}></img>
                {showDescText && <h3>{homepageDescText}</h3>}
            </div>

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

            <div className="Homepage_memberships">
                <div className="Homepage_memberships_heading">
                    {showMembershipsHeading && <h1>{membershipsHeading}</h1>}
                    {showMembershipsDescription && <h2>{membershipsDescription}</h2>}
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
                                    <ul>
                                        {card.features?.map((feature, i) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                    </ul>
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
                podcastSectionVisibility && <div className="galleryPage_podcast">
                    <div className="galleryPage_podcast_heading">
                        <h1>Explore Our Community Through Podcasts</h1>
                    </div>
                    <div className="galleryPage_podcast_main">
                        {selectedPodcast && (
                            <div className="gallery_podcast_main_box">
                                <div className="gallery_podcast_main_box_image">
                                    <img src={urlFor(selectedPodcast.bannerImg).url()} alt="Podcast banner" />
                                </div>
                                <div className="gallery_podcast_main_box_content">
                                    <h2>{selectedPodcast.name}</h2>
                                    <h3>{selectedPodcast.subHead}</h3>
                                    <p>{selectedPodcast.desc}</p>
                                    <ReactAudioPlayer
                                        src={makeUrl(selectedPodcast.audio.asset._ref)}
                                        controls
                                        type="audio" />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="galleryPage_podcast_suggestions">
                        <h2>More Episodes</h2>
                        <div className="galleryPage_podcast_suggestions_list">
                            {podcastData && podcastData.slice(selectedPodcast.index).map((episode, index) => (
                                <div
                                    key={index}
                                    className="galleryPage_podcast_suggestion_item"
                                    onClick={() => handlePodcastClick(episode)}
                                >
                                    <img src={urlFor(episode.bannerImg).url()} alt={`Episode ${episode.episodeNo} banner`} />
                                    <div className="galleryPage_podcast_suggestion_item_content">
                                        <h4>{episode.subHead}</h4>
                                        <h3>{episode.name}</h3>
                                        <p>{episode.desc.substring(0, 100)}...</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }

            <Footer />
        </div>
    );
};

export default HomePage;