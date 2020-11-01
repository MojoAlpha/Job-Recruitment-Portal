import React from 'react'
import { Link } from 'react-router-dom'

const NotificationItem = (props) => {
    return (
        <Link to={props.item.link} onClick={() => props.toggleNotification()}
            className="text-decoration-none"
        >
            <div className={props.item.isRead ? 'bg-white d-flex border p-2' : 'bg-primary d-flex border p-2'}>
                {/* todo: set image after getting it in api response */}
                {/* <img
                    src={`http://localhost:8000/logo/${props.item.logo}`}
                    alt=""
                    className="profile rounded-circle"
                    style={{ height: "50px", width: "50px" }}
                /> */}
                <div className="d-flex flex-column ml-2 text-decoration-none text-dark">
                    {/* <p className=" m-0 font-weight-normal align-self-center text-body">
                        {props.item.msg}
                    </p> */}
                    <small>{props.item.msg}</small>
                </div>
                {
                    props.item.isOpen != undefined ?
                        props.item.isOpen ?
                            <span class="badge badge-success align-self-center ml-2">open</span>
                            :
                            <span class="badge badge-danger align-self-center ml-2">close</span>
                        :
                        <></>

                }
            </div>
        </Link >
    )
}

export default NotificationItem
