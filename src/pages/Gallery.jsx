import React, { useState, useEffect, useRef, Suspense } from 'react';
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

            } catch (error) {
                console.error('Error fetching data from Sanity:', error);
            }
        };

        fetchData();
        const subscription = client.listen('*[_type == "galleryPage"]').subscribe((update) => {
            if (update.result) {
                setPageData(update.result);
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
                    <Suspense fallback={<h1>Loading...</h1>}>
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
                    </Suspense>
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
            <Footer />
        </div>
    );
};

export default Gallery;
