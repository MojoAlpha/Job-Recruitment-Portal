import React from 'react'

export default function Testimonial() {
    return (
        <div id="testimonial">
            <div className="company-logos">

            </div>
            <div className="person-testimonial">
                <div className="testimonial-image-container">

                <img src={`${process.env.PUBLIC_URL}/images/testimonial.jpg`}  alt="" className="testimonial-img"/>
                </div>
                <div className="testimonial-text-wrapper">
                <div className="testimonial-text">
                    <img src={`${process.env.PUBLIC_URL}/images/quote.png`} alt="inverted quote symbol"/>
                    <p className="testimonial-words font-secondary">I found my dream job with easy help. I have been there for 2 years.</p>
                    <div className="person">
                        <h5 className="person-name">john doe</h5>
                        <p className="person-desig">senior developer,microsoft</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
