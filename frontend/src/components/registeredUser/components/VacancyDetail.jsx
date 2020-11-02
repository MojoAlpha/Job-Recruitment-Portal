import React, { useState, useEffect } from 'react'
import ListItemWithBtn from './ListItemWithBtn'
import SkillPill from './SkillPill'
import { useParams, useHistory } from 'react-router-dom'
import { tokenAxios } from '../../api'
import axios from 'axios'
import { getImageName } from '../../utility'
import Applicant from './Applicant'
const VacancyDetail = (props) => {
    let { id } = useParams();
    let history = useHistory()
    const [vacancyDetail, setVacancyDetail] = useState({})
    const [applicants, setApplicants] = useState([])
    const [selectedApplicants, setSelectedApplicants] = useState([])

    const [applicationStatus, setApplicationStatus] = useState()
    const [loggedInCompanyDetails, setLoggedInCompanyDetails] = useState({})
    const [requiredSkills, setRequiredSkills] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [modifiedVacancy, setModifiedVacancy] = useState({})


    useEffect(() => {
        //for getting vacany details
        tokenAxios.get(`/vacancy/${id}`)
            .then(response => {
                if (response.status == 200) {
                    console.log(response.data)
                    setVacancyDetail(response.data)
                    setRequiredSkills(response.data.requiredSkill)
                    setApplicationStatus(response.data.applicationStatus)
                }

                else
                    console.log(response)
            })
            .catch(function (error) {
                if (error.message === 'Network Error')
                    alert("internet lgwa le garib aadmi")

            });

        //getting details of logged in company
        tokenAxios.get(`/company/me`)
            .then(response => {
                if (response.status == 200) {
                    setLoggedInCompanyDetails(response.data)
                }
                else if (response.status == 401) {
                    //todo:it means token is expired run logout function 
                }
                else
                    console.log(response.err)
            })
            .catch((error) => console.log(error))
        setIsLoading(false)
        //for getting list of applicants
        tokenAxios.get(`/vacancy/applicant/${id}`)
            .then(response => {
                if (response.status == 200) {
                    console.log(response.data.applicants)
                    setApplicants(response.data.applicants)

                }

                else
                    console.log(response)
            })
            .catch(function (error) {
                if (error.message === 'Network Error')
                    alert("internet lgwa le garib aadmi")

            });

        //for getting list of selected applicants
        tokenAxios.get(`/vacancy/applicants/${id}/selected`)
            .then(response => {
                if (response.status == 200) {
                    setSelectedApplicants(response.data.selected)

                }

                else
                    console.log(response.err)
            })
            .catch(function (error) {
                if (error.message === 'Network Error')
                    alert("internet lgwa le garib aadmi")
                console.log(error)

            });
    }, [])

    const closeVacancy = () => {
        tokenAxios.post(`/vacancy/close/${id}`)
            .then(response => {
                if (response.status == 200) {
                    setVacancyDetail({ ...vacancyDetail, isOpen: false })
                    console.log("vacancy closed")
                }
            })
            .catch(error => console.log(error))
    }
    const handleApply = () => {
        tokenAxios.post(`/vacancy/apply/${id}`)
            .then((response) => {
                if (response.status == 200) {
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

    const handleSelect = (userId) => {
        console.log(`seleecting user ${userId}`)
        const { token } = JSON.parse(localStorage.getItem("jwt"))
        let data = JSON.stringify({ userId });
        var config = {
            method: 'post',
            url: `http://localhost:8000/vacancy/select/${id}/`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {

                if (response.status == 200) {
                    console.log("candidate selected")
                    history.push(`/user/vacancy/${id}`)

                }
                else
                    console.log("selection failed")
                console.log(response.data.msg)
            })
            .catch(function (error) {
                if (error.message === 'Network Error')
                    alert("cannot reach server check internet connectivity or try again later")
            });
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
    const applicantsList = applicants.map(applicant => <Applicant profileImg={applicant.dp} name={applicant.name} userId={applicant._id} handleSelect={handleSelect} showBtn={true} />)
    const selectedApplicantsList = selectedApplicants.map(applicant => <Applicant profileImg={applicant.dp} name={applicant.name} userId={applicant._id} handleSelect={handleSelect} showBtn={false} />)
    return (
        <>
            {isLoading ?
                <p>loading....</p>
                :
                (<div className="container-fluid bg-white p-4  mb-4">
                    <div className="mx-2 mx-xl-5">
                        <div className="d-flex flex-column flex-sm-row mb-4">
                            <div className="rounded-circle align-self-center " style={{ backgroundImage: `url(http://localhost:8000/logo/${getImageName(vacancyDetail.Ologo)})`, backgroundSize: 'cover', height: '20vh', width: '20vh' }}>
                            </div>
                            <div className="mx-4 d-flex justify-content-between flex-column">
                                <h2 className="text-capitalize">{vacancyDetail.desig}</h2>
                                {/* todo:make this a link to the company profile */}
                                <small className="mb-1">{vacancyDetail.Oname}</small>
                                <p className="text-capitalize mt-1"><strong>posted on:</strong>{vacancyDetail.createdAt}</p>
                                <p className="text-capitalize mt-1"><strong>location:</strong>{vacancyDetail.location}</p>
                                <p className="text-capitalize mt-1"><strong>salary:</strong>{vacancyDetail.salary}</p>
                                <div className="d-flex">
                                    {/* todo:important! handle buttons with status code */}
                                    {

                                        vacancyDetail.isOpen ?
                                            // if
                                            applicationStatus == 0 ? //0 means selected
                                                <button className="btn btn-success" disabled>Selected</button>
                                                :
                                                // else if
                                                applicationStatus == 1 ? // 1 means applied
                                                    <button className="btn btn-primary" disabled>Applied</button>
                                                    :
                                                    loggedInCompanyDetails._id == vacancyDetail.O_id ?
                                                        <div className="d-flex">
                                                            <button className="btn btn-outline-primary" >edit Vacancy</button>
                                                            <button className="btn btn-outline-danger" onClick={closeVacancy}>close Vacancy</button>
                                                        </div>

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
                                {
                                    skillList.length ?
                                        skillList
                                        :
                                        <p>no skills required</p>
                                }

                            </div>
                        </div>
                        <div id="description" style={{ marginBottom: '4em' }}>
                            <h5 className="text-capitalize mb-3 font-weight-bold">description</h5>
                            <p className="text-justify">{vacancyDetail.desc}</p>
                        </div>
                        {/* selected applicant list*/}
                        {loggedInCompanyDetails._id == vacancyDetail.O_id && <div id="applicants" style={{ marginBottom: '4em' }}>
                            <h5 className="text-capitalize mb-3 font-weight-bold">selectedApplicants:</h5>
                            <div id="applicants-list">
                                {selectedApplicantsList}
                            </div>

                        </div>}

                        {/* todo:application received for job */}
                        {loggedInCompanyDetails._id == vacancyDetail.O_id && <div id="applicants" style={{ marginBottom: '4em' }}>
                            <h5 className="text-capitalize mb-3 font-weight-bold">Received application:{vacancyDetail.applicantCount}</h5>
                            <div id="applicants-list">
                                {/* <ListItemWithBtn imgUrl={`${process.env.PUBLIC_URL}/images/testimonial.jpg`} text="Lovedeep singh kamal" btnText="select" handleClick={() => console.log("approved")} /> */}
                                {applicantsList}
                            </div>

                        </div>}

                    </div>
                </div>)}
        </>
    )
}

export default VacancyDetail
