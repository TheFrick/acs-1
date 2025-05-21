import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/About.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import client, { urlFor } from '../sanity/sanityClient';
import Loading from '../components/Loading';
import icon from '../assets/about/icon.png';

const About = () => {
    const [pageData, setPageData] = useState(null);
    const [pageDataStaff, setPageDataStaff] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const reviewsRef = useRef(null);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const location = useLocation();

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

        const subscription = client.listen('*[_type == "aboutPage"]').subscribe((update) => {
            if (update.result) {
                setPageData(update.result);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

      useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch('*[_type == "staffPage"][0]');
                setPageDataStaff(result);
            } catch (error) {
                console.error('Error fetching data from Sanity:', error);
            }
        };

        fetchData();
        const subscription = client.listen(`*[_type == "staffPage"][0]`).subscribe((update) => {
            if (update.result) {
                setPageDataStaff(update.result);
            }
        });
        return () => subscription.unsubscribe();
    }, []);


    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const scrollReview = (direction) => {
        if (reviewsRef.current) {
            const scrollAmount = direction === 'left' ? -reviewsRef.current.offsetWidth : reviewsRef.current.offsetWidth;
            reviewsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });

            setCurrentReviewIndex((prevIndex) => {
                const newIndex = direction === 'left' ? prevIndex - 1 : prevIndex + 1;
                return Math.max(0, Math.min(newIndex, pageData.reviews.length - 1));
            });
        }
    };
    const visibleMembers = pageDataStaff?.members?.filter(member => member.isVisible !== false);

    return (
        <div className="aboutPage">
            <div
                className="aboutPage_banner"
                style={{ backgroundImage: `url(${urlFor(pageData?.bannerImage)?.url()})` }}
            >
                <Navbar />
                <div className="aboutPage_banner_heading">
                    <h1>{pageData?.bannerHeading.toUpperCase() || 'ABOUT US'}</h1>
                </div>
            </div>

            <main>
                {pageData?.storySectionVisibility && pageData?.storySection && (
                    <section className="aboutPage_story">
                        <div className="aboutPage_story_img">
                            <img src={urlFor(pageData.storySection.image)?.url()} alt="Our Story" />
                        </div>
                        <div className="aboutPage_story_content">
                            <h1 className="aboutPage_story_content_heading mb-2">{pageData.storySection.heading}</h1>
                            <p className="aboutPage_story_content_text">{pageData.storySection.text}</p>
                        </div>
                    </section>
                )}
               
                        <div className="staffPage_boxes">
                              <div className="StaffPage_banner_heading">
                    <h1>Our Staff</h1>
                </div>
                {visibleMembers?.map((member, index) => (
                    index % 2 === 0 ? (
                        <div className="staffPage_box" key={index}>
                            <div className="staffPage_box_image">
                                {member.image ? (
                                    <img src={urlFor(member.image).url()} alt={member.name} />
                                ) : (
                                    <div className="staffPage_box_image_placeholder">No Image Available</div>
                                )}
                            </div>
                            <div className="staffPage_box_content">
                                <div className="staffPage_box_content_headers">
                                    <h1>{member.name || 'Staff Name'}</h1>
                                    <h3>{member.caption || 'Staff Position'}</h3>
                                </div>
                                <div className="staffPage_box_content_list">
                                    {member.features?.map((feature, featureIndex) => (
                                        <div className="staffPage_box_content_list_listItem" key={featureIndex}>
                                            <li>
                                                {feature}
                                            </li>
                                        </div>
                                    ))}
                                </div>
                                <div className="staffPage_box_content_button">

                                    {
                                        member.name === "KIRAN THAKKAR" ? null : <Link to={member.link}><button>Sign up Now</button></Link>
                                    }
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="staffPage_box_right" key={index}>
                            <div className="staffPage_box_right_content">
                                <div className="staffPage_box_right_outerListBox">
                                    <div className="staffPage_box_right_content_headers">
                                        <h1>{member.name || 'Staff Name'}</h1>
                                        <h3>{member.caption || 'Staff Position'}</h3>
                                    </div>
                                    <div className="staffPage_box_right_list">
                                        {member.features?.map((feature, featureIndex) => (
                                            <div className="staffPage_box_right_list_listItem" key={featureIndex}>
                                                <li>
                                                    {feature}
                                                </li>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="staffPage_box_right_content_button">
                                        {
                                            member.name === "KIRAN THAKKAR" ? null : <Link to={member.link}><button>Sign up Now</button></Link>
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="staffPage_box_right_image">
                                {member.image ? (
                                    <img src={urlFor(member.image).url()} alt={member.name} />
                                ) : (
                                    <div className="staffPage_box_image_placeholder">No Image Available</div>
                                )}
                            </div>
                        </div>
                    )
                ))}
            </div>
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
                                <h1 className='mb-2'>{pageData.missionSection.heading}</h1>
                                <p>{pageData.missionSection.text}</p>
                            </div>
                        </div>
                        <div className="aboutPage_Mission_image">
                            <img src={urlFor(pageData.missionSection.image)?.url()} alt="Mission Image" />
                        </div>
                    </section>
                )}

                {pageData?.reviewSectionVisibility && (
                    <div className="galleryPage_review">
                        <div className="galleryPage_review_heading">
                            <h1>Reviews From Our Members</h1>
                        </div>
                        <div className="galleryPage_review_container">
                            <div className="galleryPage_review_reviews" ref={reviewsRef}>
                                {pageData.reviews.map((item, index) => (
                                    <div key={index} className="galleryPage_review_reviews_box">
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
                )}

                {pageData?.boardofDirectorsSectionVisibility && pageData?.BoardOfDirectors && (
                    <section className="aboutPage_asquash" id="APlusSquash">
                        {
                            pageData.BoardOfDirectors.image ? <div className="aboutPage_asquash_image">
                                <img src={urlFor(pageData.BoardOfDirectors.image)?.url()} alt="A+ Squash" />
                            </div> : null
                        }

                        <div className="aboutPage_asquash_content">
                            <div className="aboutPage_asquash_content_heading">
                                <h1>BOARD OF DIRECTORS</h1>
                            </div>
                            <div className="aboutPage_asquash_content_list">

                                <div className="aboutPage_asquash_content_list_container_left">
                                    {
                                        pageData.BoardOfDirectors.Members.map((item, index) => (
                                            <ul key={index}>
                                                {
                                                    index % 2 == 0 && <li>{item}</li>
                                                }

                                            </ul>
                                        ))
                                    }
                                </div>
                                <div className="aboutPage_asquash_content_list_container_right">
                                    {
                                        pageData.BoardOfDirectors.Members.map((item, index) => (
                                            <ul key={index}>
                                                {
                                                    index % 2 !== 0 && <li>{item}</li>
                                                }

                                            </ul>
                                        ))
                                    }
                                </div>
                                {/*  */}
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
