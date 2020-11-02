import React, { useState, useEffect } from 'react'
import { useParams, Redirect, useHistory } from 'react-router-dom'
import { tokenAxios } from '../api'
import axios from 'axios'

const ProfileCRUD = (props) => {
    let history = useHistory()
    const [userFullDetails, setUserFullDetails] = useState({})
    const [isOwner, setIsOwner] = useState(false)
    const [newImg, setNewImg] = useState(null)
    const { type, id } = useParams()

    const handleChange = (event) => {
        const { name, value } = event.target
        setUserFullDetails({
            ...userFullDetails,
            [name]: value
        })
    }
    const userType = type == 'U' ? 'user' : 'company'

    useEffect(() => {
        //check that the searched user and logged in users are same or not
        tokenAxios.get(`/${userType}/me`)
            .then(response => {
                if (response.status == 200) {
                    if (response.data._id == id)
                        setIsOwner(true)
                    else
                        history.push(`/user/${type}/${id}`)


                }
                else if (response.status == 401) {
                    //todo:it means token is expired run logout function 
                }
                else
                    console.log(response.err)
            })
            .catch((error) => console.log(error))

        tokenAxios.get(`/${userType}/${id}`)
            .then(response => {
                console.log(response)
                if (response.status == 200) {

                    setUserFullDetails(response.data)
                }
                else
                    console.log(response.err)
                // setIsLoading(false)
            })
            .catch((error) => {
                if (error.response.status == 404) {
                    alert('invalid profile url');
                    history.push('`/user/feed`')

                }
            })
    }, [])

    const updateProfileImg = () => {
        const formData = new FormData();
        formData.append(type == 'U' ? 'dp' : 'logo', newImg);
        const { token } = JSON.parse(localStorage.getItem("jwt"))
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            }
        };
        axios.put('http://localhost:8000/user/me/dp', formData, config)
            .then((response) => {
                console.log("image successfully uploaded");
            }).catch((error) => {
                console.log(error)
            });
    }

    const updateProfile = (e) => {
        e.preventDefault()
        if (newImg)
            updateProfileImg()
        const { token } = JSON.parse(localStorage.getItem("jwt"))
        var data = JSON.stringify(userFullDetails);
        var config = {
            method: 'put',
            url: 'http://localhost:8000/user/me/details',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        console.log(`updated usr data`)
        console.log(data)

        axios(config)
            .then(function (response) {

                if (response.status == 200) {
                    console.log("updating succesffull")
                    history.push("/user/feed")

                }
                else
                    console.log("updation failed")
                console.log(response.data.msg)
            })
            .catch(function (error) {
                if (error.message === 'Network Error')
                    alert("internet lgwa le garib aadmi")
            });
    }



    return (
        <div className="bg-white p-3 col-sm-12 col-lg-8 rounded">
            {
                isOwner ?
                    <form>
                        <h3 className="text-center mb-3">Update details</h3>
                        <div class="form-group">
                            <label for="username">Name</label>
                            <input type="text" class="form-control" name="name" onChange={handleChange} value={userFullDetails.name} id="username" placeholder="your full name" />
                            <small id="username" class="form-text text-muted">this name will be visible to all other users.</small>
                        </div>
                        <div class="form-group">
                            <label for="profileImg">Profile Image</label>
                            <input type="file" accept="image/*" onChange={(e) => setNewImg(e.target.files[0])} class="form-control-file" id="profileImg" />
                        </div>
                        <div class="form-group">
                            <label for="bio">your bio</label>
                            <textarea class="form-control" name="bio" onChange={handleChange} value={userFullDetails.bio} id="bio" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="addr">address</label>
                            <textarea class="form-control" name="addr" onChange={handleChange} value={userFullDetails.addr} id="addr" rows="3"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="phone">Phone no:</label>
                            <input type="tel" name="phone" onChange={handleChange} value={userFullDetails.phone} class="form-control" id="phone" />
                        </div>
                        <button type="submit" onClick={(e) => updateProfile(e)} class="btn btn-primary btn-block col-sm-12 col-lg-6 mx-auto">update</button>
                    </form>
                    :
                    <p>cannot edit others profile</p>
            }
        </div>
    )
}

export default ProfileCRUD
