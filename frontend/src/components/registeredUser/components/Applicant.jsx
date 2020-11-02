import React from 'react'
import { getImageName } from '../../utility'
import { Link } from 'react-router-dom'

const Applicant = (props) => {
    const imgName = getImageName(props.profileImg)
    return (
        <div className="container my-2">
            <div className="px-3 py-2 d-flex flex-column flex-sm-row align-items-center col col-xl-10 shadow-sm border">
                <div className="d-flex  p-2 flex-grow-1">
                    <img
                        src={`http://localhost:8000/dp/${imgName}`}
                        alt=""
                        className="profile rounded-circle"
                        style={{ height: "50px", width: "50px" }}
                    />
                    <Link to={`/user/U/${props.userId}`} className="m-0 pl-2 font-weight-bold align-self-center text-body">
                        {props.name}
                    </Link>


                </div>
                {props.showBtn && <button className="btn btn-primary" onClick={() => props.handleSelect(props.userId)}>select</button>}
            </div>
        </div>
    )
}

export default Applicant
