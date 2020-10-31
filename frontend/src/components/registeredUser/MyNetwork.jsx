import React, { useState, useEffect } from "react";
import UserCard from "./components/UserCard";
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { tokenAxios } from "../api";

function MyNetwork() {

  const [userBasicDetails, setUserBasicDetails] = useState({})
  const [userNetwork, setUserNetwork] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    //basic detail of user
    tokenAxios.get(`/user/me`)
      .then(response => {
        if (response.status == 200) {
          setUserBasicDetails(response.data)
          return response.data._id
        }
        else if (response.status == 401) {
          //it means token is expired
          //  call logout function
        }
        else console.log(response.err)
      })
      .then((id) => {
        console.log(`id:${id}`)
        //network details of user
        tokenAxios.get(`/user/${id}/all`)
          .then(response => {
            console.log(response.data)
            if (response.status == 200) {
              setUserNetwork(response.data)
              setIsLoading(false)
            }
            else if (response.status == 401) {
              //it means token is expired
              //  call logout function
            }
            else console.log(response.err)
          })
      })
      .catch(error => {
        console.log(error)
        if (error.message === 'Network Error')
          alert("internet lgwa le garib aadmi")
      })
  }, [])

  const companyFollowedList = !isLoading && userNetwork.followed.map(company => <UserCard img={company.logo} id={company._id} name={company.name} desc={company.desc} type='C' />)
  const connectedPersonList = !isLoading && userNetwork.connections.map(person => <UserCard img={person.dp} id={person._id} name={person.name} desc={person.bio} type='U' />)
  return (
    <>
      <h2 className="text-capitalize mb-5">My connections</h2>

      <h4 className="text-capitalize mb-3">companies you follow</h4>
      <ScrollMenu
        data={companyFollowedList}
      // arrowLeft={ArrowLeft}
      // arrowRight={ArrowRight}
      // selected={selected}
      // onSelect={this.onSelect}
      />

      <h4 className="text-capitalize mb-3">your network</h4>
      <div className="d-flex flex-wrap">
        {connectedPersonList}
      </div>
    </>
  );
}

export default MyNetwork;
