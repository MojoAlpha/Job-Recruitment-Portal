import React, { useEffect, useState } from "react";
import Post from "./components/Post";
import InfoItem from "./components/InfoItem";
import ListItemWithBtn from './components/ListItemWithBtn'
import { getImageName } from "../utility"
import { tokenAxios } from '../api'
function NewsFeed() {
  const [postData, setPostData] = useState([])
  const [suggestedJobs, setSuggestedJobs] = useState([])
  const [appliedJobs, setAppliedJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    //getting posts for the newsfeed
    tokenAxios.get(`user/me/f`)
      .then(response => {
        if (response.status == 200)
          setPostData(response.data)
        else
          console.log(response.err)
      })
      .catch(error => {
        console.log(error)
        if (error.message === 'Network Error')
          alert("internet lgwa le garib aadmi")
      })

    //getting suggested jobs
    tokenAxios.get(`user/me/f/suggested`)
      .then(response => {
        if (response.status == 200)
          setSuggestedJobs(response.data)
        else
          console.log(response.err)
      })
      .catch(error => {
        console.log(error)
        if (error.message === 'Network Error')
          alert("internet lgwa le garib aadmi")
      })

    //getting applied jobs
    tokenAxios.get(`user/me/f/applied`)
      .then(response => {
        if (response.status == 200) {
          setAppliedJobs(response.data.appliedVac)
          isLoading(false)
        }
        else
          console.log(response.err)

      })
      .catch(error => {
        console.log(error)
        if (error.message === 'Network Error')
          alert("internet lgwa le garib aadmi")
      })



  }, [])


  const postList = postData.map(post => {

    const { createdAt, desc, postImg, type } = post
    const { name, logo, _id } = post.company[0]

    return <Post owner={{ name: name, dp: logo, id: _id }} post={{ createdAt, desc, postImg, type }} getImageName={getImageName} />
  })
  const suggestedJobList = suggestedJobs.map(job => <InfoItem logo={job.company[0].logo} companyName={job.company[0].name} comanyId={`1243215552`} title={job.title} vacancyId={job._id} getImageName={getImageName} />)
  // todo:important change suggestedJob to appliedJob when response is corrected
  const appliedJobList = suggestedJobs.map(job => <InfoItem logo={job.company[0].logo} companyName={job.company[0].name} comanyId={`1243215552`} title={job.title} vacancyId={job._id} getImageName={getImageName} />)
  return (
    <>
      <div className="col-sm-12 col-lg-8 pt-4">
        {postList}
      </div>
      <div
        className="col-3 pt-4 d-none d-lg-block"
        style={{
          height: "",
          position: "fixed",
          top: "88px",
          height: "100%",
          right: "0",
        }}
      >
        <div className="bg-white p-4 rounded shadow text-capitalize mb-5">
          <p>here are some jobs based on your skills</p>
          {suggestedJobList.length ? suggestedJobList :
            <div>
              <h6 className=" mt-4 text-center text-capitalize">you will se job as soon as we found one for you</h6>
              <div >
                <img src={`${process.env.PUBLIC_URL}/images/no_skills.jpg`} alt="" />
              </div>
            </div>
          }
          {/* <InfoItem />
          <InfoItem /> */}
          <a href="#" className="text-center d-block">
            see more
          </a>
        </div>

        <div className="bg-white p-4 rounded shadow text-capitalize">
          <p>jobs that you have applied for</p>
          {appliedJobList.length ? appliedJobList :
            <div>
              <h6 className=" mt-4 text-center text-capitalize">apply to jobs to see them here</h6>
              <div >
                <img src={`${process.env.PUBLIC_URL}/images/no_skills.jpg`} alt="" />
              </div>
            </div>}
          <a href="#" className="d-block text-center text-underline">
            see more
          </a>
        </div>
      </div>
    </>
  );
}

export default NewsFeed;
