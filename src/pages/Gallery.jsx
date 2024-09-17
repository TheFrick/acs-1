import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import client, { urlFor } from '../sanity/sanityClient';
import Loading from '../components/Loading';
import '../css/Gallery.css';
import icon from '../assets/about/icon.png';
import ReactAudioPlayer from 'react-audio-player';
import { buildFileUrl } from '@sanity/asset-utils';

const Gallery = () => {
    const [pageData, setPageData] = useState(null);
    const [selectedTab, setSelectedTab] = useState("All");
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [selectedPodcast, setSelectedPodcast] = useState(null);
    const reviewsRef = useRef(null);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch('*[_type == "galleryPage"][0]');
                setPageData(result);
                setSelectedPodcast(result.podcast[0]);
                console.log('Fetched gallery page data:', result);

            } catch (error) {
                console.error('Error fetching data from Sanity:', error);
            }
        };

        fetchData();
        const subscription = client.listen('*[_type == "galleryPage"]').subscribe((update) => {
            if (update.result) {
                setPageData(update.result);
                setSelectedPodcast(update.result.podcast[0]);
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    const scrollReview = (direction) => {
        if (reviewsRef.current) {
            const scrollAmount = direction === 'left' ? -reviewsRef.current.offsetWidth : reviewsRef.current.offsetWidth;
            reviewsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });

            setCurrentReviewIndex(prevIndex => {
                const newIndex = direction === 'left' ? prevIndex - 1 : prevIndex + 1;
                return Math.max(0, Math.min(newIndex, pageData.reviews.length - 1));
            });
        }
    };

    const handlePodcastClick = (podcast) => {
        setSelectedPodcast(podcast);
    };

    if (!pageData) return <Loading />;

    return (
        <div className='galleryPage'>
            <div className="galleryPage_banner" style={{ backgroundImage: `url(${urlFor(pageData.bannerImage).url()})` }}>
                <Navbar />
                <div className="galleryPage_banner_heading">
                    <h1>{pageData.bannerHeading}</h1>
                </div>
            </div>
            {
                pageData.gallerySectionVisibility &&
                <div className="galleryPage_gallery">
                    <div className="galleryPage_gallery_nav">
                        <h3
                            onClick={() => setSelectedTab("All")}
                            className={selectedTab === "All" ? 'active' : ''}
                        >
                            All
                        </h3>
                        {pageData?.gallery?.filter(card => card.cardVisibility !== false).map((item, index) => (
                            <h3
                                key={index}
                                onClick={() => setSelectedTab(item.galleryHeading)}
                                className={selectedTab === item.galleryHeading ? 'active' : ''}
                            >
                                {item.galleryHeading}
                            </h3>
                        ))}
                    </div>
                    <div className="galleryPage_gallery_images">
                        {selectedTab === "All" ? (
                            <div className='galleryPage_gallery_images_gallery'>
                                {pageData?.gallery?.filter(card => card.cardVisibility !== false).map((item, index) => (
                                    <div key={index}>
                                        {item.galleryImage.map((image, imgIndex) => (
                                            <img key={imgIndex} src={urlFor(image).url()} alt="" />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='galleryPage_gallery_images_gallery'>
                                {pageData.gallery
                                    .filter(item => item.galleryHeading === selectedTab)
                                    .map((item, index) => (
                                        <div key={index}>
                                            {item.galleryImage.map((image, imgIndex) => (
                                                <img key={imgIndex} src={urlFor(image).url()} alt="" />
                                            ))}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            }
            {
                pageData.reviewSectionVisibility &&
                <div className="galleryPage_review">
                    <div className="galleryPage_review_heading">
                        <h2>Reviews From Our Members</h2>
                    </div>
                    <div className="galleryPage_review_container">
                        <div className="galleryPage_review_reviews" ref={reviewsRef}>
                            {pageData.reviews.map((item, index) => (
                                <div key={index} className='galleryPage_review_reviews_box'>
                                    <div className="galleryPage_review_reviews_box_img">
                                        <img src={urlFor(item.image).url()} alt="" />
                                    </div>
                                    <div className="galleryPage_review_reviews_box_content">
                                        <div className="galleryPage_review_reviews_box_content_text">
                                            <img src={icon} alt="" />
                                            <p>{item.review}</p>
                                        </div>
                                        <div className="galleryPage_review_reviews_box_content_author">
                                            <h4> - {item.name}</h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="galleryPage_review_navigation">
                            <button onClick={() => scrollReview('left')} disabled={currentReviewIndex === 0}>
                                &lt;
                            </button>
                            <button onClick={() => scrollReview('right')} disabled={currentReviewIndex === pageData.reviews.length - 1}>
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            }
            {
                pageData.podcastSectionVisibility && <div className="galleryPage_podcast">
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
                                    <h3>Episode {selectedPodcast.episodeNo}: {selectedPodcast.subHead}</h3>
                                    <h2>{selectedPodcast.name}</h2>
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
                            {pageData.podcast && pageData.podcast.slice(selectedPodcast.index).map((episode, index) => (
                                <div
                                    key={index}
                                    className="galleryPage_podcast_suggestion_item"
                                    onClick={() => handlePodcastClick(episode)}
                                >
                                    <img src={urlFor(episode.bannerImg).url()} alt={`Episode ${episode.episodeNo} banner`} />
                                    <div className="galleryPage_podcast_suggestion_item_content">
                                        <h4>Episode {episode.episodeNo}: {episode.subHead}</h4>
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

export default Gallery;
