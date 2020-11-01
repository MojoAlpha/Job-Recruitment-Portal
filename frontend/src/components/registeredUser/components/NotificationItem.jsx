import React from 'react'
import { Link } from 'react-router-dom'
import { getImageName } from '../../utility'

const NotificationItem = (props) => {
    //if code if 2,3,0r 4 then it is from company
    const senderType = props.item.code >= 2 && props.item.code <= 4 ? 'C' : 'U'
    const senderName = senderType == 'U' ? props.item.user[0].name : props.item.company[0].name
    const imgurl = senderType == 'U' ? props.item.user[0].dp : props.item.company[0].logo
    const imgName = getImageName(imgurl)
    const folderName = senderType == 'U' ? 'dp' : 'logo'

    const msg = [
        `${senderName} has sent you connection request`,
        `you have pending connection requests`,
        `${senderName} posted a new vacany`,
        `${senderName} has selected you for the job you applied`,
        `${senderName} has close a vacancy.`
    ]


    return (
        <Link to={props.item.link} onClick={() => props.toggleNotification()}
            className="text-decoration-none"
        >
            <div className={props.item.isRead ? 'bg-white d-flex border p-2' : 'bg-primary d-flex border p-2'}>
                {/* if many users has sended request then do not show image in that case */}
                {props.item.code != 1 && <img
                    src={`http://localhost:8000/${folderName}/${imgName}`}
                    alt=""
                    className="profile rounded-circle"
                    style={{ height: "30px", width: "30px" }}
                />}
                <div className="d-flex flex-column ml-2 text-decoration-none text-dark">
                    {/* <p className=" m-0 font-weight-normal align-self-center text-body">
                        {props.item.msg}
                    </p> */}
                    <small className="font-italic">{props.item.createdAt}</small>
                    <small className="font-weight-bold">{msg[props.item.code]}</small>
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
