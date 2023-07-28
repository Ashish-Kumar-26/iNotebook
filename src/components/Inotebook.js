import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'

const Inotebook = () => {
  return (
    <div style={{marginTop:'5rem'}}>
        <header>
            <div className="header-container" >
                <Link to="/main">
                  <h1 className='align-logo mx-2'>iNotebook</h1>
                  <img id="logo" className='align-logo mx-3' style={{transform: 'rotate(-20deg)'}} src="/logo.png" alt="Logo"/>
                </Link>
            </div>
        </header>

        <main>
            <section className="hero-section">
                <div className="hero-container font-white">
                    <h2>Take Notes Online, Anywhere, Anytime!</h2>
                    <p>Create, edit, and access your notes seamlessly on the cloud.</p>
                    <Link to="/main" className="cta-button font-white text-info" >Get Started</Link>
                </div>
            </section>

            <section id="features" className="features-section">
                <div className="features-container font-white">
                    <h2>Features</h2>
                    <div className="feature">
                        <i className="fa-solid fa-check-circle"></i>
                        <p>Create and Organize Notes</p>
                    </div>
                    <div className="feature">
                        <i className="fa-solid fa-cloud-upload"></i>
                        <p>Cloud Storage</p>
                    </div>
                    <div className="feature">
                        <i className="fa-solid fa-edit"></i>
                        <p>Edit Anytime, Anywhere</p>
                    </div>
                </div>
            </section>

            <section id="about" className="about-section">
                <div className="about-container font-white">
                    <h2>About iNotebook</h2>
                    <p>iNotebook is a cloud-based note-taking app that allows you to create, edit, and access your notes from any device. It's designed to be user-friendly, secure, and perfect for individuals and teams.</p>
                </div>
            </section>

            <section id="contact" className="contact-section">
                <div className="contact-container font-white">
                    <h2>Contact Us</h2>
                    <p>If you have any questions or feedback, feel free to contact us.</p>
                    <a href="mailto:contact@inotebook.com" className="contact-email text-info">contact@inotebook.com</a>
                </div>
            </section>
        </main>

        <Footer/>

    </div>
  )
}

export default Inotebook
