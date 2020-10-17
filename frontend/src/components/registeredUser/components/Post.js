import React from "react";

export default function Post() {
  return (
    <div className="bg-white p-4 mx-md-5 mb-5 rounded shadow">
      <div className="d-flex">
        <img
          src={`${process.env.PUBLIC_URL}/images/testimonial.jpg`}
          alt=""
          className="profile rounded-circle"
          style={{ height: "50px", width: "50px" }}
        />
        <div className="mx-2">
          <h6 className="m-0 font-weight-bold">Lovedeep sing kamal</h6>
          <p>10 oct,2020</p>
        </div>
        {/* todo:can add three dot menu to post */}
      </div>
      <p className="">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa omnis
        harum quidem? Repellendus, odit et?
      </p>
      <img
        src={`${process.env.PUBLIC_URL}/images/form.jpg`}
        alt="post img"
        className="mw-75 mx-auto d-block"
      />
    </div>
  );
}
