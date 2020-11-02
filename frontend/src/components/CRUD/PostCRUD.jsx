import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { tokenAxios } from '../api'
import axios from 'axios'


const PostCRUD = (props) => {
    let history = useHistory()
    const [post, setPost] = useState({ desc: '', links: [], postImg: null })
    const [isOwner, setIsOwner] = useState(false)
    const [newImg, setNewImg] = useState(null)
    const { postId } = useParams()

    console.log(postId)
    const handleChange = (event) => {
        const { name, value } = event.target
        setPost({
            ...post,
            [name]: value
        })
    }
    // const userType = type == 'U' ? 'user' : 'company'

    // useEffect(() => {
    //     //check that the logged in user is owner of post or not
    //     tokenAxios.get(`/${userType}/me`)
    //         .then(response => {
    //             if (response.status == 200) {
    //                 if (response.data._id == )
    //                     setIsOwner(true)
    //                 else
    //                     history.push(`/user/${type}/${id}`)


    //             }
    //             else if (response.status == 401) {
    //                 //todo:it means token is expired run logout function 
    //             }
    //             else
    //                 console.log(response.err)
    //         })
    //         .catch((error) => console.log(error))

    //     tokenAxios.get(`/${userType}/${id}`)
    //         .then(response => {
    //             console.log(response)
    //             if (response.status == 200) {

    //                 setUserFullDetails(response.data)
    //             }
    //             else
    //                 console.log(response.err)
    //             // setIsLoading(false)
    //         })
    //         .catch((error) => {
    //             if (error.response.status == 404) {
    //                 alert('invalid profile url');
    //                 history.push('`/user/feed`')

    //             }
    //         })
    // }, [])


    const createPost = (e) => {
        e.preventDefault()
        const { token } = JSON.parse(localStorage.getItem("jwt"))
        var data = JSON.stringify(post);
        var config = {
            method: 'post',
            url: 'http://localhost:8000/posts/',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {

                if (response.status == 200) {
                    console.log("post created succesffull")
                    history.push("/")

                }
                else
                    console.log("post creation failed")
                console.log(response.data.msg)
            })
            .catch(function (error) {
                if (error.message === 'Network Error')
                    alert("cannot reach server check internet connectivity or try again later")
            });
    }

    const updatePost = (e) => {
        e.preventDefault()
        const { token } = JSON.parse(localStorage.getItem("jwt"))
        var data = JSON.stringify(post);
        var config = {
            method: 'put',
            url: `http://localhost:8000/posts/${postId}/`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {

                if (response.status == 200) {
                    console.log("updating succesffull")
                    history.push("/")

                }
                else
                    console.log("updation failed")
                console.log(response.data.msg)
            })
            .catch(function (error) {
                if (error.message === 'Network Error')
                    alert("cannot reach server check internet connectivity or try again later")
            });
    }



    return (
        <div className="bg-white p-3 col-sm-12 col-lg-8 rounded">

            <form>

                <h3 className="text-center mb-3">{postId ? 'Update Post' : 'create Post'}</h3>
                <div class="form-group">
                    <label for="desc">post Desc:</label>
                    <input type="text" class="form-control" name="desc" onChange={handleChange} value={post.desc} id="desc" placeholder="enter post description" />
                </div>
                <div class="form-group">
                    <label for="postImg">Post Image(optional)</label>
                    <input type="file" accept="image/*" name="postImg" onChange={(e) => setPost({ ...post, postImg: e.target.files[0] })} class="form-control-file" id="postImg" />
                </div>
                {
                    postId ?
                        <button type="submit" onClick={(e) => updatePost(e)} class="btn btn-primary btn-block col-sm-12 col-lg-6 mx-auto">update</button>
                        :
                        <button type="submit" onClick={(e) => createPost(e)} class="btn btn-primary btn-block col-sm-12 col-lg-6 mx-auto">create</button>
                }
            </form>

        </div>
    )
}

export default PostCRUD
