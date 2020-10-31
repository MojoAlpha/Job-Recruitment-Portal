import React from 'react'
import UserCard from "./components/UserCard";

const Jobs = () => {
    return (
        <>
            <h2 className="text-capitalize mb-5">jobs</h2>
            <div className="d-flex flex-wrap">
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
            </div>
        </>
    )
}

export default Jobs
