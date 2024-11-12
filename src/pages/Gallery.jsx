import React, { useState, useEffect, useRef, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import client, { urlFor } from '../sanity/sanityClient';
import Loading from '../components/Loading';
import '../css/Gallery.css';

import ReactAudioPlayer from 'react-audio-player';
import { buildFileUrl } from '@sanity/asset-utils';

const Gallery = () => {
    const [pageData, setPageData] = useState(null);
    const [selectedTab, setSelectedTab] = useState("");


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
                setSelectedTab(result.gallery[0].galleryHeading)
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





    if (!pageData) return <Loading />;

    return (
        <div className='galleryPage'>
            <div className="galleryPage_banner" style={{ backgroundImage: `url(${urlFor(pageData.bannerImage).url()})` }}>
                <Navbar />
                <div className="galleryPage_banner_heading">
                    <h1>{pageData.bannerHeading.toUpperCase()}</h1>
                </div>
            </div>
            {
                pageData.gallerySectionVisibility &&
                <div className="galleryPage_gallery">
                    <div className="galleryPage_gallery_nav">

                        {pageData?.gallery?.filter(card => card.cardVisibility !== false).map((item, index) => (
                            <p
                                key={index}
                                onClick={() => setSelectedTab(item.galleryHeading)}
                                className={selectedTab === item.galleryHeading ? 'active' : ''}
                            >
                                {item.galleryHeading}
                            </p>
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

            <Footer />
        </div>
    );
};

export default Gallery;
