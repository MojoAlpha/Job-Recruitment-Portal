import React from "react";
import { Link } from "react-router-dom";
import { getImageName } from '../../utility'
function InfoItem(props) {
  const logo = getImageName(props.logo)
  return (
    <Link to={`/user/vacancy/${props.vacancyId}`}
      className="text-decoration-none text-capitalize px-2 d-block mb-2 rounded"
    >
      <div className="d-flex  shadow-sm p-2">
        <img
          src={`http://localhost:8000/logo/${logo}`}
          alt=""
          className="profile rounded-circle"
          style={{ height: "50px", width: "50px" }}
        />
        <div className="d-flex flex-column ml-2">
          <p className=" m-0 font-weight-bold align-self-center text-body">
            {props.title}
          </p>
          <small>{props.companyName}</small>
        </div>
      </div>
    </Link>
  );
}

export default InfoItem;
