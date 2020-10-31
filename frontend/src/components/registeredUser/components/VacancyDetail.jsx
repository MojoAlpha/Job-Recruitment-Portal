import React, { useState, useEffect } from 'react'
import ListItemWithBtn from './ListItemWithBtn'
import SkillPill from './SkillPill'
import { useParams } from 'react-router-dom'
import { tokenAxios } from '../../api'
import axios from 'axios'
const VacancyDetail = (props) => {
    let { id } = useParams();
    const [vacancyDetail, setVacancyDetail] = useState({})
    const [applicationStatus, setApplicationStatus] = useState()
    const [requiredSkills, setRequiredSkills] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [modifiedVacancy, setModifiedVacancy] = useState({})


    useEffect(() => {
        tokenAxios.get(`/vacancy/${id}`)
            .then(response => {
                if (response.status == 200) {
                    console.log(response.data)
                    setVacancyDetail(response.data)
                    setRequiredSkills(response.data.requiredSkill)
                    setApplicationStatus(response.data.applicationStatus)
                    setIsLoading(false)
                }

                else
                    console.log(response)
            })
            .catch(function (error) {
                if (error.message === 'Network Error')
                    alert("internet lgwa le garib aadmi")

            });
    }, [])

    // todo:this api is having some problem at backend
    const handleApply = () => {
        tokenAxios.post(`/vacancy/apply/${id}`)
            .then((response) => {
                if (response.data == 200) {
                    console.log("applied succesfully")
                    //1 means successfully applied
                    setApplicationStatus(1)
                }
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
                if (error.message === 'Network Error')
                    alert("internet lgwa le garib aadmi")

            })
    }
    // this delete function is actaully updating the whole object
    //with new set of skills
    const deleteSkill = (index) => {
        console.log("deleting skill")
        const newList = [...requiredSkills]
        newList.splice(index, 1)
        setModifiedVacancy({ ...vacancyDetail, requiredSkill: newList })
        handleUpdate(modifiedVacancy)
    }


    const handleUpdate = (updatedVacancy) => {
        console.log("updating object")
        const { token } = JSON.parse(localStorage.getItem("jwt"))
        var data = JSON.stringify(updatedVacancy);
        var config = {
            method: 'put',
            url: 'http://localhost:8000/vacancy/${id}',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {

                if (response.status == 200) {
                    console.log("vacancy updated")
                    setVacancyDetail(updatedVacancy)
                    setRequiredSkills(updatedVacancy.requiredSkill)
                }
                else
                    console.log(response.err)
            })
            .catch(function (error) {
                console.log(error)
                if (error.message === 'Network Error')
                    alert("internet lgwa le garib aadmi")

            });
    }

    const skillList = !isLoading && requiredSkills.map((skill, index) => <SkillPill name={skill.name} index={index} deleteItem={deleteSkill} />)
    return (
        <>
            {isLoading ?
                <p>loading....</p>
                :
                (<div className="container-fluid bg-white p-4  mb-4">
                    <div className="mx-2 mx-xl-5">
                        <div className="d-flex flex-column flex-sm-row mb-4">
                            <div className="rounded-circle align-self-center " style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/testimonial.jpg)`, backgroundSize: 'cover', height: '20vh', width: '20vh' }}>
                            </div>
                            <div className="mx-4 d-flex justify-content-between flex-column">
                                <h2 className="text-capitalize">{vacancyDetail.title}</h2>
                                {/* todo:make this a link to the company profile */}
                                <small className="mb-1">{vacancyDetail.Oname}</small>
                                <p className="text-capitalize mt-1"><strong>posted on:</strong>{vacancyDetail.createdAt}</p>
                                <div className="d-flex">
                                    {/* todo:important! handle buttons with status code */}
                                    {vacancyDetail.isOpen ?
                                        // if
                                        applicationStatus == 0 ? //0 means selected
                                            <button className="btn btn-success" disabled>Selected</button>
                                            :
                                            // else if
                                            applicationStatus == 1 ? // 1 means applied
                                                <button className="btn btn-primary" disabled>Applied</button>
                                                :
                                                <button className="btn btn-outline-primary" onClick={handleApply}>Apply</button>
                                        :
                                        <button className="btn btn-danger" disabled>closed</button>
                                    }

                                </div>
                            </div>
                        </div>
                        <div id="skills" className="" style={{ marginBottom: '4em' }}>
                            <h5 className="text-capitalize font-weight-bold mb-3">skills</h5>
                            <div id="skill-list" class="d-flex flex-wrap">
                                {skillList.length ? skillList :
                                    <p>no skills required</p>

                                }

                            </div>
                        </div>
                        <div id="description" style={{ marginBottom: '4em' }}>
                            <h5 className="text-capitalize mb-3 font-weight-bold">description</h5>
                            <p className="text-justify">{vacancyDetail.desc}</p>
                        </div>

                        <div id="applicants" style={{ marginBottom: '4em' }}>
                            <h5 className="text-capitalize mb-3 font-weight-bold">Received application</h5>
                            {/* todo:whole work is left */}
                            <div id="applicants-list">
                                <ListItemWithBtn imgUrl={`${process.env.PUBLIC_URL}/images/testimonial.jpg`} text="Lovedeep singh kamal" btnText="select" handleClick={() => console.log("approved")} />

                            </div>

                        </div>

                    </div>
                </div>)}
        </>
    )
}

export default VacancyDetail
