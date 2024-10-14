import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../css/Contact.css'
import house from '../assets/Contact/House.png'
import call from '../assets/Contact/call.png'
import mail from '../assets/Contact/Mail.png'
import user from '../assets/Contact/Vector.png'
import inputMail from '../assets/Contact/Vector2.png'
import inputPhone from '../assets/Contact/Vector3.png'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import client, { urlFor } from '../sanity/sanityClient';
import Loading from '../components/Loading';
import emailjs from 'emailjs-com';



const Contact = () => {

    const [pageData, setPageData] = useState(null);
    const centerPosition = [33.81118653135519, -84.42035678566103];
    const googleMapsUrl = `https://www.google.com/maps?q=${centerPosition[0]},${centerPosition[1]}`;
    const [Name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch('*[_type == "contactPage"][0]');
                setPageData(result);
                console.log(result);
            } catch (error) {
                console.error('Error fetching data from Sanity:', error);
            }
        };

        fetchData();
        const subscription = client.listen(`*[_type == "contactPage"]`).subscribe((update) => {
            if (update.result) {
                setPageData(update.result);
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    const sendEmail = () => {

        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
                message: `${Name} has sent you a message through your contact form. Here's their details: \n\nName: ${Name}\nEmail: ${mail}\nPhone: ${phone}\n\nMessage: ${message}`
            },
            import.meta.env.VITE_EMAILJS_USER_ID
        )
            .then((response) => {
                alert("Message sent successfully!");
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };




    if (!pageData) return <Loading />;


    return (
        <div className='contactPage'>
            <div className="contactPage_banner" style={{ backgroundImage: `url(${urlFor(pageData.bannerImage).url()})` }}>
                <Navbar />
                <div className="contactPage_banner_heading">
                    <h1>{pageData.bannerHeading}</h1>
                </div>
            </div>
            <div className="contactPage_box">
                <div className="contactPage_box_details">
                    <div className="contactPage_box_details_list">
                        <div className="contactPage_box_details_list_item">
                            <div className="contactPage_box_details_list_item_icon">
                                <img src={house} alt="" />
                            </div>
                            <div className="contactPage_box_details_list_item_content">
                                <h3>Our Location</h3>
                                <p>1019 Collier Rd NW STE A, Atlanta, GA 30318, United States</p>
                            </div>
                        </div>
                        <div className="contactPage_box_details_list_item">
                            <div className="contactPage_box_details_list_item_icon">
                                <img src={call} alt="" />
                            </div>
                            <div className="contactPage_box_details_list_item_content">
                                <h3>Call us</h3>
                                <p>{pageData.phone}</p>
                            </div>
                        </div>
                        <div className="contactPage_box_details_list_item">
                            <div className="contactPage_box_details_list_item_icon">
                                <img src={mail} alt="" />
                            </div>
                            <div className="contactPage_box_details_list_item_content">
                                <h3>Email us</h3>
                                <p>{pageData.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contactPage_box_form" >
                    <div className="contactPage_box_form_internalBox">
                        <h1>Send a Message</h1>
                        <div className="contactPage_box_form_internalBox_form">
                            <div className="contactPage_box_form_internalBox_form_inputContainer">
                                <img src={user} alt="" />
                                <input type="text" placeholder='Name' value={Name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="contactPage_box_form_internalBox_form_inputContainer">
                                <img src={inputMail} alt="" />
                                <input type="text" name="" id="" value={mail} placeholder="Email" onChange={(e) => setMail(e.target.value)} />
                            </div>
                            <div className="contactPage_box_form_internalBox_form_inputContainer">
                                <img src={inputPhone} alt="" />
                                <input type="text" name="" id="" value={phone} placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="contactPage_box_form_internalBox_form_textField">
                                <textarea name="" id="" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                            </div>
                            <button onClick={sendEmail}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='ContactPage_maps'>
                <MapContainer
                    center={centerPosition}
                    zoom={15}
                    style={{ height: '400px', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={centerPosition}>
                        <Popup>
                            <p>Atlanta Community Squash</p>
                            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" >
                                View on Google Maps
                            </a>

                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
            <Footer />
        </div>

    )
}

export default Contact
