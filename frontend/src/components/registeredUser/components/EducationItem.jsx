import React from 'react'

const EducationItem = (props) => {



    return (
        <div className="d-flex flex-column flex-md-row align-items-center mb-3 p-2 p-xl-4 border shadow">
            <div className="flex-grow-1">
                <p className="font-weight-bold mb-1">Bachelor of technolgy Information technology</p>
                <p className="small">Motilal Nehru National Institute of Technolgy</p>
                <small>2019-2023</small>
            </div>
            <div className="d-flex flex-row flex-md-col flex-xl-row">
                <span onClick={() => props.showUpdatePopUp({ degree: "btech", insti: "mnnit", year: "2023" })} className="mx-3" style={{ cursor: 'pointer' }}><i class="fas fa-pen"></i>edit</span>
                <span onClick={() => props.deleteItem(props.index)} style={{ cursor: 'pointer' }}><i class="fas fa-minus-circle text-danger"></i>delete</span>
            </div>

        </div>
    )
}

export default EducationItem
