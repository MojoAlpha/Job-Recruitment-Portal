import React, { useState, useEffect } from 'react'
import WorkExperiencePopUp from '../../popups/WorkExperiencePopUp'
import WorkExperienceItem from './WorkExperienceItem'
import axios from 'axios'
const WorkExperienceCard = (props) => {

    const [workExperienceItems, setWorkExperienceItems] = useState([])
    const [showPopUP, setShowPopUp] = useState(false)
    const [item, setItem] = useState({})
    const [itemIndex, setItemIndex] = useState()

    useEffect(() => {
        console.log(`work experience`)
        console.log(props.details())
        setWorkExperienceItems(props.details())
    }, [])

    const createItem = (item) => {
        console.log(`creating item ${item}`)
        const { token } = JSON.parse(localStorage.getItem("jwt"))
        var data = JSON.stringify(item);
        var config = {
            method: 'post',
            url: 'http://localhost:8000/user/me/exp/',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        console.log(data)
        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    console.log("success fully created at server")
                    setWorkExperienceItems([...workExperienceItems, item])
                    setShowPopUp(false)
                }
            })
            .catch(function (error) {
                console.log(`adding errro: ${error}`)
                if (error.message === 'Network Error')
                    alert("internet lgwa le garib aadmi")
            });
    }
    const updateItem = (index, item) => {
        console.log(`update request received`)
        const newList = [...workExperienceItems]
        const { token } = JSON.parse(localStorage.getItem("jwt"))
        var data = JSON.stringify({ ...item, index });
        console.log(data)
        var config = {
            method: 'put',
            url: 'http://localhost:8000/user/me/exp/',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        console.log("about to fire api")
        console.log(`changing item at pos:${index}`)
        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    newList.splice(index, 1, item)
                    setWorkExperienceItems(newList)
                    console.log(response.data.msg)
                    setShowPopUp(false)
                }
                else
                    console.log(response.data.err)
            })
            .catch(function (error) {
                if (error.message === 'Network Error')
                    alert("internet lgwa le garib aadmi")
            });

    }
    // todo:wrong items are deleted do work on it
    const deleteItem = (index) => {
        const newList = [...workExperienceItems]
        const { token } = JSON.parse(localStorage.getItem("jwt"))
        var data = JSON.stringify({ index });
        var config = {
            method: 'delete',
            url: 'http://localhost:8000/user/me/exp/',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        console.log(data)
        console.log(`deleting index:${index}`)

        axios(config)
            .then(function (response) {

                if (response.status == 200) {
                    newList.splice(index, 1)
                    setWorkExperienceItems(newList)
                }
                console.log(response.data.msg)
            })
            .catch(function (error) {
                if (error.message === 'Network Error')
                    alert("internet lgwa le garib aadmi")
            });

    }

    const showPopUPWithItem = (item, index = null) => {
        console.log(`called with item:${item}`)
        setShowPopUp(true)
        setItem(item)
        setItemIndex(index)
    }
    const closePopUP = () => {
        setShowPopUp(false)
    }

    const WorkExperienceList = workExperienceItems.map((item, index) => <WorkExperienceItem index={index} self={item} deleteItem={deleteItem} showPopUPWithItem={showPopUPWithItem} closePopUP={closePopUP} showEditControls={props.showEditControls} />)
    return (
        <div className="px-4 border bg-white shadow mb-4">
            <div className="d-flex align-items-center">
                <h3 className="text-capitalize my-3 flex-grow-1">Work Experience</h3>
                {props.showEditControls && <button type="submit" class="btn btn-primary mb-2 w-25 btn" onClick={() => showPopUPWithItem({ company: '', desig: '', startDate: '', endDate: '' })}  >add</button>}
            </div>
            {WorkExperienceList.length ? WorkExperienceList :
                <div>
                    <h6 className=" mt-4 text-center text-capitalize">adding work Experiences to get an edge over others</h6>
                    <div >
                        <img src={`${process.env.PUBLIC_URL}/images/no_skills.jpg`} alt="" />
                    </div>
                </div>}

            {console.log(`showPopUP : ${showPopUP}`)}
            {showPopUP && <WorkExperiencePopUp item={item} index={itemIndex} createItem={createItem} updateItem={updateItem} showPopUPWithItem={showPopUPWithItem} closePopUP={closePopUP} />}
        </div >
    )
}

export default WorkExperienceCard
