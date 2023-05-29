import React from 'react';
import './landing.css';
import Logo from './undraw_finance_re_gnv2.svg';
import Logo2 from './undraw_investing_re_bov7.svg';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <section className='landing-page'>
            <div className='container'>
                <div className='left-image'>
                    <img
                        src={Logo}
                        className='image'
                        alt='Left Image'
                    />
                </div>
                <div className='content'>
                    <h3 className='subtitle'></h3>
                    <h1 className='title'>Welcome</h1>
                    <div className='animated-text'>
                        <span className='animated-text-item'>Trackeroo</span>
                        <span className='animated-text-item'>Manage. Track. Succeed.</span>
                    </div>
                    <button className='cta-button'><Link to="/Signin">Get started</Link></button>
                </div>
                <div className='right-image'>
                    <img
                        src={Logo2}
                        className='image'
                        alt='Right Image'
                    />
                </div>
            </div>
        </section>
    );
};

export default LandingPage;
