import React from "react";

export default function Post(props) {
  console.log(props)
  let folder = props.post.type == 'C' ? 'logo' : 'dp'
  const postImgName = props.getImageName(props.post.postImg)
  const userDpName = props.getImageName(props.owner.dp)
  return (
    <div className="bg-white p-4  mb-5 rounded shadow " >
      <div className="d-flex" >
        <img src={`http://localhost:8000/${folder}/${userDpName}`} alt=""
          className="profile rounded-circle"
          style={
            {
              height: "50px",
              width: "50px"
            }
          }
        />
        <div className="mx-2" >
          <h6 className="m-0 font-weight-bold" > {props.owner.name} </h6>
          <p> {props.post.createdAt} </p>
        </div>
        {/* todo:can add three dot menu to post */}
      </div>
      <p className="" > {props.post.desc} </p>
      {/* checking post image exist or not because some post may only contain text */}
      {postImgName && <img src={`http://localhost:8000/post/${postImgName}`} alt="post img" className="w-100 mx-auto d-block" />}
    </div>
  );
}