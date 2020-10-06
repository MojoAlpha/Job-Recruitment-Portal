import React from "react";

export default function Landing() {
    return (
        <div className="">

            <div id="landing" className="d-flex text-capitalize">

                <div className="hero-left">
                    <div className="hero-left-subcontainer">

                    
                    <div className="hero-text ">
                        <p className="hero-subtitle capitalize">real job</p>
                        <p className="hero-title capitalize">for you. <span className="text-primary">today</span></p>
                    </div>
                    <p className="hero-desc">
                    want to switch carrer or start a fresh , we help you find variety of
                        jobs and get latest job opening information.
                    </p>

                    <form className="form hero-form mw-75 mt-5">
                        <input className="form-control mr-sm-2 mb-4" type="search" placeholder="Serch for jobs,people,technology,company" aria-label="Search"/>
                        <button className="btn btn-primary my-2 my-sm-0 btn-block" type="submit">Search</button>
                    </form>
                    </div>
                    
                </div>

                <div className="hero-right"></div>
                
            </div>
        </div>
    );
}
