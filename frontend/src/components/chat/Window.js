import React, { useState, useEffect } from 'react'
import { tokenAxios } from '../api'
import { useParams } from "react-router-dom";

import UserInfo from './subComponents/UserInfo';
import ChatBox from './subComponents/ChatBox';
const Window = (props) => {

    //type and id of user you want to chat with
    const { type, id } = useParams()

    const [isLoading, setIsLoading] = useState(true)
    //for conditional rendering ,when need to know that the profile to be displayed is of company or user
    const [isUser, setIsUser] = useState(false)

    //stores the info of user you want to chat with
    const [userFullDetails, setUserFullDetails] = useState({})
    const [connectionStatus, setConnectionStatus] = useState()
    const [connectionCount, setConnectionCount] = useState()

    useEffect(() => {

        let userType = 'company'
        if (type == 'U') {
            setIsUser(true)
            userType = 'user'
        }

        //get all the details of user you want to chat with
        tokenAxios.get(`/${userType}/${id}`)
            .then(response => {
                if (response.status == 200) {

                    setUserFullDetails(response.data)
                    if (type == 'U') {
                        setConnectionStatus(response.data.connectionStatus)
                        setConnectionCount(response.data.connectionCount)
                    }
                    else {
                        setConnectionStatus(response.data.followStatus)
                        setConnectionCount(response.data.followerCount)
                    }
                }
                else
                    console.log(response.err)
                // setIsLoading(false)
            })
            .catch((error) => {
                if (error.response.status == 404) {
                    alert('invalid profile url')
                    // todo:redirect to something
                }
            })
        setIsLoading(false);
    },[])
    return (
        isLoading ?
            'loading...'
            :
            (<>
                <UserInfo img={userFullDetails.dp} id={userFullDetails._id} name={userFullDetails.name} desc={userFullDetails.bio} type='U' />
                <ChatBox receiver = {id} SOCKET={props.SOCKET}/>
            </>)
    )
}

export default Window;
