import React from "react";

const PopUp = (props) => {

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#343a40bd', display: props.showPopup ? 'block' : 'none' }}>
            <div className="container p-2 p-md-4  text-center shadow border rounded bg-light col-md-6 col-sm-4" style={{ position: 'relative' }}>
                {/* close btn */}
                <span
                    style={{ position: 'absolute', top: '10%', right: '10%', cursor: 'pointer' }}
                    onClick={() => {
                        props.togglePopUp()
                    }}
                >
                    <i class="fas fa-times"></i>
                </span>

                <img src={`${process.env.PUBLIC_URL}/images/mail.svg`} alt="mail-img" style={{ height: '200px' }} className="mb-5 col-6" />
                <div>
                    <h4 className="text-capitalize  mb-4">a verification mail has been sent to you email account.</h4>

                    <p className="text-justify  mx-auto">please click on the link that has been sent to your email account to verify your email and complete the signup process.</p>
                </div>


            </div>
        </div>
    );
};

export default PopUp;
