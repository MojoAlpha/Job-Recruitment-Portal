import React from "react";

function InfoItem() {
  return (
    <a
      href="#"
      className="text-decoration-none text-capitalize px-2 d-block mb-2 rounded"
    >
      <div className="d-flex  shadow-sm p-2">
        <img
          src={`${process.env.PUBLIC_URL}/images/testimonial.jpg`}
          alt=""
          className="profile rounded-circle"
          style={{ height: "50px", width: "50px" }}
        />
        <p className="m-0 pl-2 font-weight-bold align-self-center text-body">
          title of the job
        </p>
      </div>
    </a>
  );
}

export default InfoItem;
