import React, { useState, useEffect } from 'react'
import SkillCard from './components/SkillCard'
import axios from "axios";
import SocialLinkCard from './components/SocialLinkCard';
import EducationCard from './components/EducationCard';
const Profile = () => {
    const user = JSON.parse(localStorage.getItem("jwt"))
    //use this name if u need to call with authorisation header
    //then no need to pass anything
    const tokenAxios = axios.create({
        baseURL: `http://localhost:8000`,
        headers: {
            Authorization: `Bearer ${user.token}`
        },

    })
    const basicAxios = axios.create({
        baseURL: `http://localhost:8000`,
    })

    const [userBasicDetails, setUserBasicDetails] = useState({})
    const [userFullDetails, setUserFullDetails] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        tokenAxios.get(`/user/me`)
            .then(response => {
                setUserBasicDetails(response.data)
                return (response.data._id)
            })
            .then(id => {
                tokenAxios.get(`/user/5f87eb4c9c3a241f781781e7`)
                    .then(response => {
                        setIsLoading(false)
                        setUserFullDetails(response.data)
                    })
            })



    }, [])



    return (
        <>
            <div className="container-fluid bg-white p-4  mb-4 shadow rounded">
                <div className="d-flex flex-column flex-sm-row">
                    <div className="rounded-circle align-self-center mx-2 mx-xl-5" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/testimonial.jpg)`, backgroundSize: 'cover', height: '20vh', width: '20vh' }}>
                    </div>
                    <div className="mx-4 d-flex justify-content-between flex-column">
                        <h2>{userFullDetails.name}</h2>
                        <pre>
                            {userFullDetails.bio}
                            {/* cake murder @18nov<br />
                            developer<br />
                            Nitian<br /> */}
                        </pre>
                        <div className="d-flex">
                            <button className="btn btn-outline-primary">connect</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-sm-12 col-xl-6 ">
                {/* {console.log(userFullDetails.skills)} */}
                {!isLoading && <SkillCard user={userFullDetails} isLoading={isLoading} />}
            </div>
            <div className="col-sm-12 col-xl-6 ">
                {/* {console.log(userFullDetails.skills)} */}
                {!isLoading && <SocialLinkCard user={userFullDetails} isLoading={isLoading} />}
            </div>
            <div className="col-12 ">
                {/* {console.log(userFullDetails.skills)} */}
                {!isLoading && <EducationCard user={userFullDetails} isLoading={isLoading} />}
            </div>



        </>
    )
}


export default Profile
