import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { tokenAxios } from '../api'
import axios from 'axios'
import AutoSuggest from '../registeredUser/components/AutoSuggest'


const VacancyCRUD = (props) => {
    let history = useHistory()
    const [userBasicDetails, setUserBasicDetails] = useState({})
    const [post, setPost] = useState({ desc: '', links: [], postImg: null })
    const [isOwner, setIsOwner] = useState(false)
    const [newImg, setNewImg] = useState(null)
    const { companyId } = useParams()

    console.log(companyId)
    const handleChange = (event) => {
        const { name, value } = event.target
        setPost({
            ...post,
            [name]: value
        })
    }




    return (
        <div className="bg-white p-3 col-sm-12 col-lg-8 rounded">

            <form>

                <h3 className="text-center mb-3">{companyId ? 'Update vacancy' : 'create Vacancy'}</h3>
                <div class="form-group">
                    <label for="">Designation:</label>
                    <input type="text" class="form-control" name="desig" onChange={handleChange} value={post.desig} id="desig" placeholder="enter designation" />
                </div>
                <div class="form-group">
                    <label for="">location:</label>
                    <input type="text" class="form-control" name="location" onChange={handleChange} value={post.location} id="desig" placeholder="enter location" />
                </div>
                <div class="form-group">
                    <label for="">salary:</label>
                    <input type="text" class="form-control" name="salary" onChange={handleChange} value={post.salary} id="desig" placeholder="enter salary" />
                </div>
                <div class="form-group">
                    <label for="">Designation:</label>
                    <input type="text" class="form-control" name="desig" onChange={handleChange} value={post.desig} id="desig" placeholder="enter designation" />
                </div>
                <div class="form-group">
                    <label for="">job description:</label>
                    <input type="text" class="form-control" name="desc" onChange={handleChange} value={post.desig} id="desig" placeholder="enter job description" />
                </div>
                <div class="form-group">
                    <label for="">required Skills:</label>
                    <AutoSuggest placeholder="search required skills" />
                </div>

                {
                    companyId ?
                        <button type="submit" class="btn btn-primary btn-block col-sm-12 col-lg-6 mx-auto">update</button>
                        :
                        <button type="submit" class="btn btn-primary btn-block col-sm-12 col-lg-6 mx-auto">create</button>
                }
            </form>

        </div>
    )
}

export default VacancyCRUD
