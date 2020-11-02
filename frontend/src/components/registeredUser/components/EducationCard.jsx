import React, { useState, useEffect } from 'react'
import EducationItem from './EducationItem'
import EducationItemPopUp from '../../popups/EducationItemPopUp'
import { tokenAxios } from "../../api";
import axios from 'axios'
const EducationCard = props => {
    const [educationItems, setEducationItem] = useState([])
    const [showPopUP, setShowPopUp] = useState(false)
    const [item, setItem] = useState({})
    const [itemIndex, setItemIndex] = useState()

    useEffect(() => {
        setEducationItem(props.details())
    }, [])

    const createItem = (item) => {
        console.log(`creating item ${item}`)
        const { token } = JSON.parse(localStorage.getItem("jwt"))
        var data = JSON.stringify(item);
        var config = {
            method: 'post',
            url: 'http://localhost:8000/user/me/edu',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {

                if (response.status == 200) {
                    console.log("success fully created at server")
                    setEducationItem([...educationItems, item])
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
        const newList = [...educationItems]
        const { token } = JSON.parse(localStorage.getItem("jwt"))
        var data = JSON.stringify({ ...item, index });
        console.log(data)
        var config = {
            method: 'put',
            url: 'http://localhost:8000/user/me/edu',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        console.log("about to fire api")
        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    newList.splice(index, 1, item)
                    setEducationItem(newList)
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
    const deleteItem = (index) => {
        const newList = [...educationItems]
        const { token } = JSON.parse(localStorage.getItem("jwt"))
        let data = JSON.stringify({ index });
        var config = {
            method: 'delete',
            url: 'http://localhost:8000/user/me/edu',
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
                    setEducationItem(newList)
                }
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

    const getItem = () => {
        return item
    }
    const EducationList = educationItems.map((item, index) => <EducationItem index={index} self={item} deleteItem={deleteItem} showPopUPWithItem={showPopUPWithItem} closePopUP={closePopUP} showEditControls={props.showEditControls} />)
    console.log(`list: ${EducationList}`)
    return (

        <div className="px-4 border bg-white shadow mb-4">
            <div className="d-flex align-items-center">
                <h3 className="text-capitalize my-3 flex-grow-1">Education</h3>
                {props.showEditControls && <button type="submit" class="btn btn-primary mb-2 w-25 btn" onClick={() => showPopUPWithItem({ college: '', insti: '', year: '' })}  >add</button>}
            </div>
            {
                //if eduacation exist
                EducationList.length ?
                    //then show list
                    EducationList
                    :
                    //elseif (owner is viewing this component)
                    props.showEditControls ?
                        //then show full msg
                        <div>
                            <h6 className=" mt-4 text-center text-capitalize">adding your Education qulification to find better jobs.</h6>
                            <div >
                                <img src={`${process.env.PUBLIC_URL}/images/no_skills.jpg`} alt="" />
                            </div>
                        </div>
                        :
                        //else (anyone else is viewing) show simple msg
                        <h6 className=" mt-4 text-center text-capitalize">No qualification available.</h6>

            }

            {showPopUP && <EducationItemPopUp item={item} index={itemIndex} createItem={createItem} updateItem={updateItem} showPopUPWithItem={showPopUPWithItem} closePopUP={closePopUP} />}
        </div >
    )
}

export default EducationCard
