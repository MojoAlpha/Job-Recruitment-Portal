import React, { useState, useEffect } from 'react'
import SocialLink from './SocialLink';
import axios from 'axios'
import SocialLinksPopUp from '../../popups/SocialLinksPopUp'

const SocialLinkCard = (props) => {

    const [links, setLinks] = useState([]);
    const [showPopUP, setShowPopUp] = useState(false)
    const [item, setItem] = useState({})

    useEffect(() => {
        setLinks(props.links())
    }, [])

    const handleSubmit = (item) => {
        console.log(`submitting ${item.title} and ${item.url}`)
        if (item.title == "" || item.url == "") {
            console.log("blank inputs")
            return;
        }
        setShowPopUp(false)
        const { token } = JSON.parse(localStorage.getItem("jwt"))
        var data = JSON.stringify(item);
        console.log(data)
        var config = {
            method: 'post',
            url: 'http://localhost:8000/user/me/link',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    setLinks([...links, item])
                    console.log(response.data.msg)
                }
                else
                    console.log(response.data.err)
            })
            .catch(function (error) {
                if (error.message === 'Network Error')
                    alert("internet lgwa le garib aadmi")
            });
        // setLinks([...links, currentLink]);
        // setCurrentLink("")
    }



    const handleUpdate = (title, url, index) => {
        if (title == "" || url == "") {
            console.log("blank inputs")
            return;
        }
        setShowPopUp(false)
        const newList = [...links]
        console.log("update started")
        const { token } = JSON.parse(localStorage.getItem("jwt"))
        var data = JSON.stringify({ title, url, index });
        console.log(data)
        var config = {
            method: 'put',
            url: 'http://localhost:8000/user/me/link',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        console.log(newList)
        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    newList.splice(index, 1, { title, url })
                    setLinks(newList)
                    console.log(newList)
                    console.log(response.data.msg)
                }
                else
                    console.log(response.data.err)
            })
            .catch(function (error) {
                if (error.message === 'Network Error')
                    alert("internet lgwa le garib aadmi")
            });
    }

    const handleDelete = (index) => {
        console.log(`clicked ${index}`)
        const newList = [...links]
        const { token } = JSON.parse(localStorage.getItem("jwt"))
        var data = JSON.stringify({ index });
        var config = {
            method: 'delete',
            url: 'http://localhost:8000/user/me/link',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        console.log(`data to be deleted`)
        console.log(data)

        axios(config)
            .then(function (response) {

                if (response.status == 200) {
                    newList.splice(index, 1)
                    setLinks(newList)
                    console.log(response.data.msg)
                }
                else
                    console.log(response.data.err)
            })
            .catch(function (error) {
                if (error.message === 'Network Error')
                    alert("internet lgwa le garib aadmi")
            });
    }

    const showPopUPWithItem = (item) => {
        console.log(`called with item:${item}`)
        setShowPopUp(true)
        setItem(item)
    }
    const closePopUP = () => {
        setShowPopUp(false)
    }



    const SocialLinkList = links.map((link, index) => <SocialLink name={link.title} url={link.url} index={index} handleDelete={handleDelete} handleUpdate={handleUpdate} showPopUPWithItem={showPopUPWithItem} showEditControls={props.showEditControls} />)
    return (

        <div className="px-4 mb-4 border bg-white shadow">
            <div className="d-flex align-items-center">
                <h3 className="text-capitalize my-3 flex-grow-1">stay connected</h3>
                {props.showEditControls && <button type="submit" class="btn btn-primary mb-2 w-25 btn" onClick={() => showPopUPWithItem({ title: '', url: '' })}  >add</button>}
            </div>
            {/* rendering out all the links of the user */}
            {
                //if socialLink exist
                SocialLinkList.length ?
                    //then show list
                    SocialLinkList
                    :
                    //elseif (owner is viewing this component)
                    props.showEditControls ?
                        //then show full msg
                        <div>
                            <h6 className=" mt-4 text-center text-capitalize">adding social links help other people to connect with you better</h6>
                            <div >
                                <img src={`${process.env.PUBLIC_URL}/images/no_skills.jpg`} alt="" />
                            </div>
                        </div>
                        :
                        //else (anyone else is viewing) show simple msg
                        <h6 className=" mt-4 text-center text-capitalize">No Social links available.</h6>

            }
            {/* pop up modal */}
            {showPopUP && <SocialLinksPopUp item={item} createItem={handleSubmit} updateItem={handleUpdate} showPopUPWithItem={showPopUPWithItem} closePopUP={closePopUP} />}
        </div >
    )
}

export default SocialLinkCard
