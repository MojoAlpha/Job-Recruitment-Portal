import React, { useEffect, useState } from 'react'
import UserCard from "./components/UserCard";
import { useRouteMatch } from 'react-router-dom';
import { getImageName } from '../utility';

const Jobs = (props) => {
    const { path } = useRouteMatch()
    useEffect(() => {
        //setting active tab
        //getImageName function can generally be used to break string at '/' or '\'
        //and return rightmost string after breaking
        //eg: /user/networks = > networks
        props.setActiveTab(getImageName(path))
    }, [])
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
