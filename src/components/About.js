import React from "react"
import Footer from "./Footer"
const About = () => {
  
  return (
    <>
      <div style={{
        position:'relative',
        marginTop:'4rem',
        padding:'3rem',
        borderRadius: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adjust the boxShadow as needed
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    }}>
        <div className="container bgd-about" style={{marginTop:'',}}>
          <div className="about-container background-image-container">
            <div className="about-content  text-light">
              <h1 className="about-title">Our Story</h1>
              <div className="dark-wide-border my-2 text-light" style={{backgroundColor:'#0000'}}>
                <p className="about-description">
                  Welcome to iNoteBook cloud platform, where we believe in the power of technology 
                  to transform lives. Our journey began with a dream to create innovative and 
                  user-centric solutions that simplify everyday tasks and empower individuals 
                  and businesses alike.
                </p>
                <p className="about-description">
                  From our humble beginnings, we have grown into a passionate team of developers, 
                  designers, and visionaries who share a common goal - to make a positive impact 
                  on the world through our work. We are committed to pushing the boundaries of 
                  what's possible and embrace challenges as opportunities for growth.
                </p>
              </div>
              <div className="about-mission">
                <h2 className="about-subtitle">Our Mission</h2>
                <div className="dark-wide-border my-2 text-light" style={{backgroundColor:'#0000'}}>
                  <p className="about-description">
                    At iNoteBook cloud platform, our mission is to create innovative solutions that 
                    enhance people's lives, businesses, and communities. We strive to deliver 
                    products and services that are user-friendly, reliable, and future-proof. 
                    Customer satisfaction is our top priority, and we continuously seek feedback 
                    to improve our offerings.
                  </p>
                </div>
              </div>
              <div className="about-values">
                <h2 className="about-subtitle">Our Values</h2>
                <div className="dark-wide-border my-2 text-light" style={{backgroundColor:'#0000'}}>
                  <ul className="about-values-list">
                    <li>Providing platform to make notes on web</li>
                    <li>Passion for Excellence</li>
                    <li>Creative Thinking</li>
                    <li>Integrity and Transparency</li>
                    <li>Continuous Learning</li>
                    <li>Diversity and Collaboration</li>
                  </ul>
                  <p className="about-description">
                    We are excited about the future and the possibilities that lie ahead. 
                    Join us on this incredible journey, and together, let's shape a better 
                    tomorrow through technology.
                  </p>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>    
      <Footer/>
    </>
  )
}

export default About
