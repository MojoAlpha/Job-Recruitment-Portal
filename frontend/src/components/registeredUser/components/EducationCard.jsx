import React, { useState, useEffect } from 'react'
import EducationItem from './EducationItem'
import EducationItemPopUp from '../../popups/EducationItemPopUp'
const EducationCard = (props) => {
    const [educationItems, setEducationItem] = useState([])
    const [showPopUP, setShowPopUp] = useState(false)
    const [item, setItem] = useState({})
    useEffect(() => {
        console.log(`mounted education card ${props}`)
        setEducationItem(props.user.education)

    }, [props.isLoading])


    // !props.isLoaing && props.user.education && setEducationItem(props.user.education)




    // const createNewItem=(item)=>{
    //     setEducationItem([...educationItems,item])
    //     //todo:send this item to backed
    // }
    // const updateItem = (index,item) => {
    //     tempItem = educationItems[index]
    //     setShowPopUp(true)
    // }
    // const deleteItem=(index)=>{

    // }
    const createItem = (item) => {
        console.log(`creating item ${item}`)
    }
    const updateItem = () => {

    }
    const deleteItem = (index) => {
        console.log(`deleting ${index}`)
    }

    const showPopUpWithItem = (item) => {
        console.log(item)
        setItem(item)
        setShowPopUp(!showPopUP)
    }
    const EducationList = props.user.education && props.user.education.map((item, index) => <EducationItem index={index} self={item} deleteItem={deleteItem} showUpdatePopUp={showPopUpWithItem} />)
    console.log(EducationList)
    return (
        <div className="px-4 border bg-white shadow mb-4">

            <div className="d-flex align-items-center">
                <h3 className="text-capitalize my-3 flex-grow-1">Education</h3>
                <button type="submit" class="btn btn-primary mb-2 w-25 btn" onClick={() => showPopUpWithItem({})}  >add</button>
            </div>
            <EducationItem index={0} deleteItem={deleteItem} showUpdatePopUp={showPopUpWithItem} />
            <EducationItem index={1} deleteItem={deleteItem} showUpdatePopUp={showPopUpWithItem} />
            {/* {EducationList.length ? EducationList :
                <div>
                    <h6 className=" mt-4 text-center text-capitalize">adding your Education qulification to find better jobs.</h6>
                    <div >
                        <img src={`${process.env.PUBLIC_URL}/images/no_skills.jpg`} alt="" />
                    </div>
                </div>
            } */}

            {showPopUP ? <EducationItemPopUp item={item} createItem={createItem} updateItem={updateItem} showPopUpWithItem={showPopUpWithItem} /> : undefined}

        </div >
    )
}

export default EducationCard
