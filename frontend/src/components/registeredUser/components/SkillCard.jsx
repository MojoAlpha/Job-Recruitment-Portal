import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Skill from './Skill';
import SkillPill from './SkillPill';
import AutoSuggest from './AutoSuggest'

const SkillCard = (props) => {

    const [skills, setSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState('')

    useEffect(() => {
        setSkills(props.skills())
    }, [])

    const handleChange = (e) => {
        setCurrentSkill(e.target.value);
    }
    const addItem = (item) => {
        const { token } = JSON.parse(localStorage.getItem("jwt"))
        var data = JSON.stringify({ "skillId": item._id });
        var config = {
            method: 'post',
            url: 'http://localhost:8000/user/me/skill',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {

                if (response.status == 200) {
                    console.log("skill added to server")
                    setSkills([...skills, item])
                    //todo:look here while doing suggest in skills

                }
                else
                    console.log(response.err)
            })
            .catch(function (error) {
                if (error.message === 'Network Error')
                    alert("internet lgwa le garib aadmi")

            });
    }

    const deleteItem = (index) => {
        console.log("delete item called")
        const newList = [...skills]
        const { token } = JSON.parse(localStorage.getItem("jwt"))
        var data = JSON.stringify({ "skillId": newList[index]._id });
        var config = {
            method: 'delete',
            url: 'http://localhost:8000/user/me/skill',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {

                if (response.status == 200) {
                    newList.splice(index, 1)
                    setSkills(newList)
                }
                else
                    console.log(response.err)
            })
            .catch(function (error) {
                if (error.message === 'Network Error')
                    alert("internet lgwa le garib aadmi")

            });


    }




    const SkillList = skills.map((skill, index) => <SkillPill className="flex-fill" name={skill.name} index={index} deleteItem={deleteItem} showEditControls={props.showEditControls} />)
    // < Skill text = { link.name } index = { link.id } handleDelete = { handleDelete } />
    return (

        <div className="px-4 border bg-white shadow mb-4">
            <h3 className="text-capitalize my-3">skills</h3>

            <div>
                {/* <form className="d-flex" onSubmit={handleSubmit}>
                    <input type="text" class="form-control w-75 mr-2" onChange={handleChange} value={currentLink} placeholder="got a new skill?add here" />
                    <button type="submit" class="btn btn-primary mb-2 w-25 btn"  >add</button>
                </form> */}
                {props.showEditControls && <AutoSuggest placeholder="search skill to add" handleSubmit={addItem} />}
            </div>
            <div className="d-flex flex-wrap text-justify">
                {
                    //if skill exist
                    SkillList.length ?
                        //then show list
                        SkillList
                        :
                        //elseif (owner is viewing this component)
                        props.showEditControls ?
                            //then show full msg
                            <div>
                                <h6 className=" mt-4 text-center text-capitalize">adding skills help recruiter to find you easily.</h6>
                                <div >
                                    <img src={`${process.env.PUBLIC_URL}/images/no_skills.jpg`} alt="" />
                                </div>
                            </div>
                            :
                            //else (anyone else is viewing) show simple msg
                            <h6 className=" mt-4 text-center text-capitalize">No skills available.</h6>

                }
            </div>
        </div >
    )
}

export default SkillCard
