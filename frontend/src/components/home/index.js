import React, { useEffect, useState } from "react";
import Landing from "./Landing"
import Tesimonial from "./Testimonial"
import Navbar from "./Navbar";
import {tokenAxios} from '../api'
import { Redirect } from "react-router-dom";

export default function Home() {

    const [isAuthenticated, setAuthenticated] = useState(false)
    const [link, setLink] = useState("")

    useEffect(() => {
        var token = JSON.parse(localStorage.getItem('jwt'))
        if(token == null)
            localStorage.clear()
        else {
            if(token.type === "U") {
                tokenAxios.get(`/user/me`)
                .then((userDetails) => {
                    setLink("/user/feed")
                })
                .catch((err) => {
                    localStorage.clear()
                })
            }
            else if(token.type === "C") {
                tokenAxios.get(`/company/me`)
                .then((companyDetails) => {
                    setLink(`/user/C/${companyDetails.data._id}`)
                })
                .catch((err) => {
                    localStorage.clear()
                })
            }
            else
                localStorage.clear()
            
            setAuthenticated(true)
        }
    })

    return (
        <div className="mx-4">
            <Navbar />
            <Landing/>
            <Tesimonial/>
            {isAuthenticated && <Redirect to={link} />}
        </div>
    );
}
