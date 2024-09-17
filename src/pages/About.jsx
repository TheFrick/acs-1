import React, { useState, useEffect } from 'react';
import '../css/About.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import client, { urlFor } from '../sanity/sanityClient';
import Loading from '../components/Loading';

const About = () => {
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch('*[_type == "aboutPage"][0]');
                setPageData(result);
                setLoading(false);
            } catch (error) {
                setError('Error fetching data from the server');
                setLoading(false);
            }
        };

        fetchData();
        const subscription = client.listen(`*[_type == "aboutPage"]`).subscribe((update) => {
            if (update.result) {
                setPageData(update.result);
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='aboutPage'>

            <div
                className="aboutPage_banner"
                style={{
                    backgroundImage: `url(${urlFor(pageData?.bannerImage)?.url()})`
                }}
            >
                <Navbar />
                <div className="aboutPage_banner_heading">
                    <h1>{pageData?.bannerHeading || 'About Us'}</h1>
                </div>
            </div>

            <main>

                {pageData?.storySectionVisibility && pageData?.storySection && (
                    <section className="aboutPage_story">
                        <div className="aboutPage_story_img">
                            <img src={urlFor(pageData.storySection.image)?.url()} alt="Our Story" />
                        </div>
                        <div className="aboutPage_story_content">
                            <h2 className="aboutPage_story_content_heading">{pageData.storySection.heading}</h2>
                            <p className="aboutPage_story_content_text">{pageData.storySection.text}</p>
                        </div>
                    </section>
                )}


                {pageData?.boxSectionVisibility && pageData?.boxSection && (
                    <section className="aboutPage_box">
                        <div className="aboutPage_box_image">
                            <img src={urlFor(pageData.boxSection.image)?.url()} alt="Box Section Image" />

                            <h2>{pageData.boxSection.heading}</h2>
                            <h3>{pageData.boxSection.subheading}</h3>
                        </div>
                        <div className="aboutPage_box_content">
                            <div className="aboutPage_box_content_icon">
                                <img src={urlFor(pageData.boxSection.icon)?.url()} alt="Box Icon" />
                            </div>
                            <h3 className="aboutPage_box_content_heading">{pageData.boxSection.contentHeading}</h3>
                            <p className="aboutPage_box_content_text">{pageData.boxSection.contentText}</p>
                        </div>
                    </section>
                )}


                {pageData?.missionSectionVisibility && pageData?.missionSection && (
                    <section className="aboutPage_Mission">
                        <div className="aboutPage_Mission_content">
                            <div className="aboutPage_Mission_content_text">
                                <h2>{pageData.missionSection.heading}</h2>
                                <p>{pageData.missionSection.text}</p>
                            </div>
                        </div>
                        <div className="aboutPage_Mission_image">
                            <img src={urlFor(pageData.missionSection.image)?.url()} alt="Mission Image" />
                        </div>
                    </section>
                )}


                {pageData?.aplusSquashSectionVisibility && pageData?.aSquashSection && (
                    <section className="aboutPage_asquash">
                        <div className="aboutPage_asquash_image">
                            <img src={urlFor(pageData.aSquashSection.image)?.url()} alt="A+ Squash" />
                        </div>
                        <div className="aboutPage_asquash_content">
                            <div className="aboutPage_asquash_content_text">
                                <h2>{pageData.aSquashSection.heading}</h2>
                                <p>{pageData.aSquashSection.text}</p>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default About;
