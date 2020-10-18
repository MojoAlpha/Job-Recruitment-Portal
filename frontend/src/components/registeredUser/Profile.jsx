import React from 'react'
import SocialLinksCard from './components/SocialLinksCard'
const Profile = () => {
    return (
        <>
            <div className="container-fluid bg-white p-4 shadow rounded">
                <div className="d-flex flex-column flex-sm-row">
                    <div className="rounded-circle align-self-center mx-2 mx-xl-5" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/testimonial.jpg)`, backgroundSize: 'cover', height: '20vh', width: '20vh' }}>
                    </div>
                    <div className="mx-4 d-flex justify-content-between flex-column">
                        <h2>Lovedeep singh kamal</h2>
                        <pre>
                            cake murder @18nov<br />
                            developer<br />
                            Nitian<br />
                        </pre>
                        <div className="d-flex">
                            <button className="btn btn-outline-primary">connect</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-sm-12 col-md-6 ">
                <SocialLinksCard />
            </div>

        </>
    )
}

export default Profile
