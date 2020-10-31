import React, { useEffect, useState } from "react";
import Post from "./components/Post";
import InfoItem from "./components/InfoItem";
import getImageName from "./Profile"
function NewsFeed() {
  const [postData, setPostData] = useState([])
  const { posts, name, pic } = postData

  const postList = posts && posts.map(post => <Post owner={{ name: name, dp: pic }} post={post} getImageName={getImageName} />)
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
          <InfoItem />
          <InfoItem />
          <a href="#" className="text-center d-block">
            see more
          </a>
        </div>

        <div className="bg-white p-4 rounded shadow text-capitalize">
          <p>jobs that you have applied for</p>
          <InfoItem />
          <InfoItem />
          <a href="#" className="d-block text-center text-underline">
            see more
          </a>
        </div>
      </div>
    </>
  );
}

export default NewsFeed;
