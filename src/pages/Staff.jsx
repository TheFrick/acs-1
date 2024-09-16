import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/Staff.css';
import ellipse from '../assets/Staff/Ellipse.png';
import client, { urlFor } from '../sanity/sanityClient';
import Loading from '../components/Loading';

const Staff = () => {
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch('*[_type == "staffPage"][0]');
                setPageData(result);
            } catch (error) {
                console.error('Error fetching data from Sanity:', error);
            }
        };

        fetchData();
        const subscription = client.listen(`*[_type == "staffPage"][0]`).subscribe((update) => {
            if (update.result) {
                setPageData(update.result);
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    if (!pageData) {
        return <Loading />;
    }

    return (
        <div className='staffPage'>
            <div
                className="StaffPage_banner"
                style={{ backgroundImage: `url(${urlFor(pageData?.banner?.backgroundImage).url()})` }}
            >
                <Navbar />
                <div className="StaffPage_banner_heading">
                    <h1>Our Staff</h1>
                </div>
            </div>
            <div className="staffPage_boxes">
                {pageData?.members?.map((member, index) => (
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
                                            <img src={ellipse} alt="bullet point" />
                                            <p>{feature}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="staffPage_box_content_button">
                                    <button>Sign up Now</button>
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
                                                <img src={ellipse} alt="bullet point" />
                                                <p>{feature}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="staffPage_box_right_content_button">
                                        <button>Sign up Now</button>
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
            <Footer />
        </div>
    );
};

export default Staff;
