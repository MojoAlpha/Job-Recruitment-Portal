import React from 'react'

const WorkExperienceItem = (props) => {

    return (
        <div className="d-flex flex-column flex-md-row align-items-center mb-3 p-2 p-xl-4 border shadow">
            <div className="flex-grow-1">
                <p className="font-weight-bold mb-1">{props.self.desig}</p>
                <p className="small">{props.self.company}</p>
                <small>{props.self.startDate}-{props.self.endDate}</small>
            </div>
            {props.showEditControls && (<div className="d-flex flex-row flex-md-col flex-xl-row">
                <span onClick={() => props.showPopUPWithItem(props.self, props.index)} className="mx-3" style={{ cursor: 'pointer' }}><i class="fas fa-pen"></i>edit</span>
                <span onClick={() => props.deleteItem(props.index)} style={{ cursor: 'pointer' }}><i class="fas fa-minus-circle text-danger"></i>delete</span>
            </div>)}

        </div>
    )
}

export default WorkExperienceItem
