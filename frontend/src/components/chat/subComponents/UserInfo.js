import React from "react";
import { Link } from "react-router-dom";
import { getImageName } from "../../utility";

function UserInfo(props) {
  const imgName = getImageName(props.img)
  const folderName = props.type == 'U' ? 'dp' : 'logo'
  return (
    <div>
      <div
        className=" rounded bg-white p-3 m-2"
        style={{width: "100%" }}
      >
        <div className="d-flex p-2 mb-4">
          <img
            src={`http://localhost:8000/${folderName}/${imgName}`}
            alt=""
            className="profile rounded-circle"
            style={{ height: "50px", width: "50px" }}
          />
          <Link to={`/user/${props.type}/${props.id}`} className="m-0 pl-2 font-weight-bold align-self-center text-body">
            {props.name}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
