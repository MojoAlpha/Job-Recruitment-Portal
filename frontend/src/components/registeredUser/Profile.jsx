import React, { useState, useEffect } from 'react'
import SkillCard from './components/SkillCard'
import { tokenAxios } from '../api'
import SocialLinkCard from './components/SocialLinkCard';
import EducationCard from './components/EducationCard';
import VacancyCard from './components/VacancyCard';
import Post from './components/Post'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
const Profile = () => {


    const [userBasicDetails, setUserBasicDetails] = useState({})
    const [userFullDetails, setUserFullDetails] = useState({})
    const [userEducation, setUserEducation] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [postData, setPostData] = useState({})

    useEffect(() => {
        tokenAxios.get(`/user/me`)
            .then(response => {
                setUserBasicDetails(response.data)
                console.log(response.data._id)
                return (response.data._id)
            })
            .then(id => {
                tokenAxios.get(`/user/${id}`)
                    .then(response => {

                        setUserFullDetails(response.data)
                        console.log(response.data)
                        setUserEducation({ education: response.data.education })
                        setIsLoading(false)
                    })
                return id
                //todo:tell user about the error
            }).then(id => {
                console.log(`receive ${id}`)
                tokenAxios.get(`/posts/${id}`)
                    .then((response) => {
                        console.log(id)
                        console.log(response.data)
                        setPostData(response.data)
                    })
            })
            .catch((error) => console.log(error))

    }, [])
    const getPostData = () => {
        return postData
    }
    const getSkills = () => {
        return userFullDetails.skills
    }
    const getLinks = () => {
        return userFullDetails.links
    }
    const getEducation = () => {
        return userFullDetails.education
    }
    // const userDpUrl = getUserDetails()
    // console.log(userDpUrl)
    // const userDpName = userDpUrl.split('/').pop()
    const getImageName = (url) => {
        console.log(url.split("\\"))
        return url.split('\\').pop()
    }
    // console.log(userBasicDetails._id)



    console.log(postData)
    const posts = postData.posts
    const owner = postData.user

    const postList = posts && posts.map(post => <Post owner={owner} post={post} getImageName={getImageName} />)
    return (
        isLoading ?
            'loading...'
            :
            (<>
                <div className="container-fluid bg-white p-4  shadow rounded">
                    <div className="d-flex flex-column flex-sm-row">
                        <div className="rounded-circle align-self-center mx-2 mx-xl-5" style={{ backgroundImage: `url("http://localhost:8000/dp/${getImageName(userFullDetails.dp)}")`, backgroundSize: 'cover', height: '20vh', width: '20vh' }}>
                        </div>
                        <div className="mx-4 d-flex justify-content-between flex-column">
                            <h2>{userFullDetails.name}</h2>
                            <pre>
                                {userFullDetails.bio}
                            </pre>
                            <p><strong>connections:</strong> {userFullDetails.connectionCount}</p>
                            <div className="d-flex">
                                <button className="btn btn-outline-primary">connect</button>
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
                            {postList}
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
                                            <SkillCard skills={getSkills} />
                                        </div>
                                        <div className="col-sm-12 col-xl-6 ">
                                            <SocialLinkCard links={getLinks} />
                                        </div>
                                    </div>
                                    <div className="col-12 ">
                                        <EducationCard details={getEducation} />
                                    </div>
                                </>
                                :
                                //else show this
                                <div className="col-12 ">
                                    <VacancyCard details={getEducation} />
                                </div>

                            }
                        </>
                    </TabContent>

                </Tabs>




            </>)




    )


}


export default Profile
