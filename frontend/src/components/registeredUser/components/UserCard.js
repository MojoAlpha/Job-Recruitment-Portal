import React from "react";
import { Link } from "react-router-dom";
import { getImageName } from "../../utility";

function UserCard(props) {
  const imgName = getImageName(props.img)
  const folderName = props.type == 'U' ? 'dp' : 'logo'
  return (
    <div>
      <div
        className=" rounded bg-white p-3 m-2"
        style={{ maxWidth: "350px", width: "100%" }}
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
        <p className="text-capitalize font-weight-bold">about</p>
        <p className="mb-3">
          {props.desc}
        </p>

        {props.type == 'C' ?
          <Link to={`/user/${props.type}/${props.id}`} className="mt-3 btn btn-outline-primary btn-block text-capitalize">
            view
        </Link>
          :
          // todo:change this to link to message box
          <Link to={`/user/${props.type}/${props.id}`} className="mt-3 btn btn-outline-primary btn-block text-capitalize">
            message
        </Link>}

      </div>
    </div>
  );
}

export default UserCard;
