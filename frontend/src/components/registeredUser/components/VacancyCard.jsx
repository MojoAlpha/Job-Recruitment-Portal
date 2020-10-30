import React, { useState, useEffect } from 'react'
import ListItemWithBtn from './ListItemWithBtn'

const VacancyCard = (props) => {
    const [vacancies, setVacancies] = useState([])

    useEffect(() => {
        setVacancies(props.details())
    }, [])

    const showDetails = (id) => {
        console.log(`showing details of ${id}`)
    }
    console.log(vacancies)
    const vacancyList = vacancies.map(vacancy => <ListItemWithBtn text={vacancy.title} imgUrl={`http://localhost:8000/logo/${props.logo}`} btnText="view" id={vacancy._id} isOpen={vacancy.isOpen} />)
    return (
        <div className="px-4 border bg-white shadow mb-4">
            <div className="d-flex align-items-center">
                <h3 className="text-capitalize my-3 flex-grow-1">job openings</h3>
                {props.setShowEditControls && <button type="submit" class="btn btn-primary mb-2 w-25 btn" >add</button>}
            </div>
            {vacancyList.length ? vacancyList :
                <div>
                    <h6 className=" mt-4 text-center text-capitalize">add job vacany to hire talents.</h6>
                    <div >
                        <img src={`${process.env.PUBLIC_URL}/images/no_skills.jpg`} alt="" />
                    </div>
                </div>}

            {/* {console.log(`showPopUP : ${showPopUP}`)}
            {showPopUP && <EducationItemPopUp item={item} createItem={createItem} updateItem={updateItem} showPopUPWithItem={showPopUPWithItem} closePopUP={closePopUP} />} */}
        </div >
    )
}

export default VacancyCard
