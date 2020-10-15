import React from "react";

function UserCard() {
  return (
    <div>
      <div
        className=" rounded bg-white p-3 m-2"
        style={{ maxWidth: "350px", width: "100%" }}
      >
        <div className="d-flex p-2 mb-4">
          <img
            src={`${process.env.PUBLIC_URL}/images/testimonial.jpg`}
            alt=""
            className="profile rounded-circle"
            style={{ height: "50px", width: "50px" }}
          />
          <p className="m-0 pl-2 font-weight-bold align-self-center text-body">
            Name of the person
          </p>
        </div>
        <p className="text-capitalize font-weight-bold">about</p>
        <p className="mb-3">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea in,
          accusantium tempore reprehenderit dolorum quia ullam pariatur incidunt
          modi. Incidunt?
        </p>
        <a
          href="#"
          className="mt-3 btn btn-outline-primary btn-block text-capitalize"
        >
          {" "}
          message
        </a>
      </div>
    </div>
  );
}

export default UserCard;
