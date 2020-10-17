import React from "react";
import Landing from "./Landing"
import Tesimonial from "./Testimonial"
import Navbar from "./Navbar";

export default function Home() {
    return (
        <div className="mx-4">
            <Navbar />
            <Landing/>
            <Tesimonial/>
        </div>
    );
}
