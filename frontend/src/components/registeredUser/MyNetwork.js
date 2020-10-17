import React from "react";
import UserCard from "./components/UserCard";

function MyNetwork() {
  return (
    <>
      <h2 className="text-capitalize mb-5">My connections</h2>
      <div className="d-flex flex-wrap">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </>
  );
}

export default MyNetwork;
