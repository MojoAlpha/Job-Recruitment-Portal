import React, { useState, useEffect } from 'react'
import SkillCard from './components/SkillCard'
import { tokenAxios } from '../api'
import SocialLinkCard from './components/SocialLinkCard';
import EducationCard from './components/EducationCard';
import VacancyCard from './components/VacancyCard';
import WorkExperienceCard from './components/WorkExperienceCard'
import Post from './components/Post'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { useParams } from 'react-router-dom'
const Profile = () => {

    const { type, id } = useParams()
    //stores the info of the profile which we are looking at
    const [userFullDetails, setUserFullDetails] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    //posts of the profile we are looking at
    const [postData, setPostData] = useState({})
    //boolean to check if we are viewing own profile then show edit controls
    const [showEditControls, setShowEditControls] = useState(false)
    //for conditional rendering ,when need to know that the profile to be displayed is of company or user
    const [isUser, setIsUser] = useState(false)
    //loggedin user is company or user
    const [loggedInUserType, setLoggedInUserType] = useState()
    const [connectionStatus, setConnectionStatus] = useState()
    const [connectionCount, setConnectionCount] = useState()
    const [vacancies, setVacancies] = useState([])
    useEffect(() => {
        let userType = 'company'
        if (type == 'U') {
            setIsUser(true)
            userType = 'user'
        }
        //check that the searched user and logged in users are same or not
        tokenAxios.get(`/${userType}/me`)
            .then(response => {
                console.log(response.status)
                if (response.status == 200) {
                    setLoggedInUserType(response.data.type)
                    if (response.data._id == id)
                        setShowEditControls(true)
                }
                else if (response.status == 401) {
                    //todo:it means token is expired run logout function 
                }
                else
                    console.log(response.err)
            })
            .catch((error) => console.log(error))
        //get all the details of searched user
        tokenAxios.get(`/${userType}/${id}`)
            .then(response => {
                console.log(response)
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
        //get posts of searched user
        tokenAxios.get(`/posts/${id}`)
            .then((response) => {
                console.log(response.data)
                setPostData(response.data)
                if (type == 'U')
                    setIsLoading(false)
            })
            .catch((error) => console.log(error))

        //get all the job vacancies (in case of a company)
        if (type == 'C')
            tokenAxios.get(`/vacancy/company/${id}`)
                .then(response => {
                    console.log(response.data)
                    setVacancies(response.data)
                    setIsLoading(false)
                })
                .catch((error) => console.log(error))

    }, [])

    const getSkills = () => {
        return userFullDetails.skills
    }
    const getLinks = () => {
        return userFullDetails.links
    }
    const getEducation = () => {
        return userFullDetails.education
    }
    const getWorkExperience = () => {
        console.log(userFullDetails)
        return userFullDetails.exp
    }
    const getVacancy = () => {
        console.log(vacancies)
        return vacancies.vacancies
    }



    const getImageName = (url = '') => {
        if (url.split('\\').length > 1)
            return url.split('\\').pop()
        return url.split('/').pop()

    }

    const handleConnect = (type, connectionCode) => {
        let apiUrl = `user/connect/${id}`
        if (type == 'C')
            apiUrl = `/company/follow/${id}`
        tokenAxios.post(apiUrl)
            .then(response => {
                console.log(response.data)
                setConnectionStatus(connectionCode)
                if (type == 'C') {
                    console.log("increased count")
                    setConnectionCount(connectionCount + 1)
                }
            })
            .catch((error) => console.log(error))
    }

    const handleDisconnect = (type, connectionCode) => {
        let apiUrl = `user/connect/${id}`
        if (type == 'C')
            apiUrl = `/company/follow/${id}`
        tokenAxios.delete(apiUrl)
            .then(response => {
                console.log(response.data)
                //cancelling a pending (not accepted yet) request
                if (connectionCode == 3)
                    setConnectionStatus(2)
                else
                    setConnectionStatus(connectionCode)
                //this is case when cancelling a connection request
                //since the request was not accepted yet(pending case)
                //then do not decrease count
                if (connectionCode != 3)
                    setConnectionCount(connectionCount - 1)
                if (type == 'C') {
                    console.log("decreased count")
                    setConnectionCount(connectionCount - 1)
                }


            })
            .catch((error) => console.log(error))
    }




    // const posts = postData.posts
    // // const owner = postData.user

    const { posts, name, pic } = postData

    const postList = posts && posts.map(post => <Post owner={{ name: name, dp: pic, id: posts[0].owner }} post={post} getImageName={getImageName} />)
    return (
        isLoading ?
            'loading...'
            :
            (<>
                {console.log(`user details:${userFullDetails.type}`)}
                <div className="container-fluid bg-white p-4  shadow rounded">
                    <div className="d-flex flex-column flex-sm-row">
                        {isUser ?
                            <div className="rounded-circle align-self-center mx-2 mx-xl-5" style={{ backgroundImage: `url("http://localhost:8000/dp/${getImageName(userFullDetails.dp)}")`, backgroundSize: 'cover', height: '20vh', width: '20vh' }}></div>
                            :
                            <div className="rounded-circle align-self-center mx-2 mx-xl-5" style={{ backgroundImage: `url("http://localhost:8000/logo/${getImageName(userFullDetails.logo)}")`, backgroundSize: 'cover', height: '20vh', width: '20vh' }}></div>
                        }

                        <div className="mx-4 d-flex justify-content-between flex-column">
                            <h2>{userFullDetails.name}</h2>
                            <p>
                                {isUser ? userFullDetails.bio : userFullDetails.desc}
                            </p>
                            {isUser ?
                                <p><strong>connections:</strong> {connectionCount}</p>
                                :
                                <p><strong>followers:</strong> {connectionCount}</p>
                            }
                            {!isUser && userFullDetails.webLink && <p><strong>website:</strong><a href={userFullDetails.webLink} target="_blank">{userFullDetails.webLink}</a></p>}
                            <div className="">
                                {
                                    showEditControls ?
                                        // show controls if viewing own profile
                                        <button className="btn btn-outline-primary">edit profile</button>
                                        :
                                        //if the loggedin user is of type user
                                        //then show connection btns
                                        //but if loggedinuser id of type company do not show connection btns
                                        loggedInUserType == 'U' ?
                                            // viewing someone else profile(company or user)
                                            //viewing user profile
                                            isUser ?
                                                //if
                                                connectionStatus == 0 ?
                                                    <div className="d-flex">
                                                        <button className="btn btn-outline-primary">message</button>
                                                        <button className="btn btn-outline-primary" onClick={() => handleDisconnect('U', 2)}>disconnect</button>
                                                    </div>
                                                    :
                                                    //elseif
                                                    connectionStatus == 1 ?
                                                        <button className="btn btn-outline-primary" onClick={() => handleDisconnect('U', 3)}>pending</button>
                                                        :
                                                        //else
                                                        <button className="btn btn-outline-primary" onClick={() => handleConnect('U', 1)}>connect</button>
                                                :
                                                //viewing company profile
                                                //if
                                                connectionStatus == 0 ?
                                                    <button className="btn btn-outline-primary" onClick={() => handleDisconnect('C', 1)}>unfollow</button>
                                                    :
                                                    //else
                                                    <button className="btn btn-outline-primary" onClick={() => handleConnect('C', 0)}>follow</button>
                                            :
                                            <></>
                                }
                            </div>
                        </div>
                    </div>

                </div>
                <Tabs className="w-100">
                    <div className="d-flex justify-content-center bg-white shadow mb-4 py-4 rounded">
                        <TabLink to="tab1" className="mx-2 bg-transparent border-0" style={{}} activeClassName="border-0 border-primary">Posts</TabLink>
                        <TabLink to="tab2" className="mx-2 bg-transparent border-0" activeClassName="border-0  border-primary">Details</TabLink>
                    </div>
                    <TabContent for="tab1">
                        <div className="col-sm-12 col-xl-8 ">
                            {console.log(postList)}
                            {Array.isArray(postList) && postList.length ? postList :
                                <div>
                                    <h6 className=" mt-4 text-center text-capitalize">no posts available</h6>
                                    <div >
                                        {/* <img src={`${process.env.PUBLIC_URL}/images/no_skills.jpg`} alt="" />*/}
                                    </div>
                                </div>}
                        </div>
                    </TabContent>
                    <TabContent for="tab2" >
                        {/*conditionally rendering content for company and user*/}
                        <>
                            {userFullDetails.type == 'U' ?
                                // if type == user show this
                                <>
                                    {/*todo:critical do fix this flex otherwise it will break responsiveness */}
                                    <div className="d-flex justify-content-between">
                                        <div className="col-sm-12 col-xl-6 ">
                                            <SkillCard skills={getSkills} showEditControls={showEditControls} />
                                        </div>
                                        <div className="col-sm-12 col-xl-6 ">
                                            <SocialLinkCard links={getLinks} showEditControls={showEditControls} />
                                        </div>
                                    </div>
                                    <div className="col-12 ">
                                        <EducationCard details={getEducation} showEditControls={showEditControls} />
                                    </div>
                                    <div className="col-12 ">
                                        <WorkExperienceCard details={getWorkExperience} showEditControls={showEditControls} />
                                    </div>
                                </>
                                :
                                //else show this
                                <div className="col-12 ">
                                    <VacancyCard details={getVacancy} showEditControls={showEditControls} logo={getImageName(userFullDetails.logo)} />
                                </div>

                            }
                        </>
                    </TabContent>

                </Tabs>




            </>)




    )


}


export default Profile
