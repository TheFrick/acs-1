import React from 'react';
import '../css/About.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import story from '../assets/about/story.png';
import image from '../assets/about/image.png';
import icon from '../assets/about/icon.png';
import mission from '../assets/about/mission.png';
import a from '../assets/about/a+.png';

const About = () => {
    return (
        <div className='aboutPage'>
            <div className="aboutPage_banner">
                <Navbar />
                <div className="aboutPage_banner_heading">
                    <h1>About Us</h1>
                </div>
            </div>
            <main>
                <section className="aboutPage_story">
                    <div className="aboutPage_story_img">
                        <img src={story} alt="Our Story" />
                    </div>
                    <div className="aboutPage_story_content">
                        <h2 className="aboutPage_story_content_heading">Our Story</h2>
                        <p className="aboutPage_story_content_text">
                            ACS opened its doors in 2019 thanks to the vision and hard work of a group of Atlanta squash lovers who came together to create a vibrant and inclusive space. The vision was to create an accessible community center for all of Atlanta and build a permanent home for A+ Squash, Atlanta's urban youth squash program. With over 300 ACS members of all ages, backgrounds, and cultures, plus a thriving A+ Squash program, we stand as a living legacy of that dream.
                        </p>
                    </div>
                </section>
                <section className="aboutPage_box">
                    <div className="aboutPage_box_image">
                        <img src={image} alt="Kevin Klipstein" />
                        <h2>KEVIN KLIPSTEIN</h2>
                        <h3>US SQUASH</h3>
                    </div>
                    <div className="aboutPage_box_content">
                        <div className="aboutPage_box_content_icon">
                            <img src={icon} alt="US Squash Icon" />
                        </div>
                        <h3 className="aboutPage_box_content_heading">In November, 2019, US Squash announced ACS as the first facility to be accredited as an official US Squash Community Affiliate.</h3>
                        <p className="aboutPage_box_content_text">
                            There is a direct line between ACS and the creation of the US Squash Community Affiliate Program. A handful of squash and community leaders in Atlanta approached us with an idea, having harnessed their decades-long passion to make squash more accessible. The ACS facility will serve as a model for other cities by offering the full spectrum of opportunities to play squash that integrates junior, adult, scholastic, and squash and education approaches to increase access to squash in an innovative, sustainable way.
                        </p>
                    </div>
                </section>
                <section className="aboutPage_Mission">
                    <div className="aboutPage_Mission_content">
                        <div className="aboutPage_Mission_content_text">
                            <h2>Our Mission</h2>
                            <p>Our primary aim of creating ACS was twofold: to provide a home for A+ Squash and to establish a community squash center that would ensure access and opportunity for all to learn, play, and love the game of squash.</p>
                        </div>
                    </div>
                    <div className="aboutPage_Mission_image">
                        <img src={mission} alt="Our Mission" />
                    </div>
                </section>
                <section className="aboutPage_asquash">
                    <div className="aboutPage_asquash_image">
                        <img src={a} alt="A+ Squash" />
                    </div>
                    <div className="aboutPage_asquash_content">
                        <div className="aboutPage_asquash_content_text">
                            <h2>A+ Squash</h2>
                            <p>Since 2014, A+ Squash has been helping young people, living in some of Atlanta's lowest-income communities, achieve their fullest potential. We are committed to reducing the achievement gap by providing the support, resources, and necessary tools to empower each child in the pursuit of both a higher education and a brighter future. Our scholar-athletes receive squash instruction, academic tutoring, health and wellness education, community service opportunities, and mentoring—all while being encouraged to take an active role in their learning by recognizing they are accountable for their success both on and off the court.</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default About;