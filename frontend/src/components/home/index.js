import React from "react";
import Landing from "./Landing"
import Tesimonial from "./Testimonial"

export default function Home() {
    return (
        <div className="mx-4">
            <nav className="navbar">
                <a class="navbar-brand logo font-primary" href="/">
                    Devhub
                </a>

                {/* <div className="nav-cta float-right">
                    <button className="btn btn-outline-primary mr-2">Log in</button>
                    <button className="btn btn-primary" style={{ color: "##11B0BB" }}>
                        sign up
                    </button>
                </div> */}
            </nav>
            <Landing/>
            <Tesimonial/>
            </div>
    );
}
