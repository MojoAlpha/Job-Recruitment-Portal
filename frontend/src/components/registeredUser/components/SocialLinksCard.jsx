import React, { useState } from 'react'

import SocialLink from './SocialLink';

const SocialLinksCard = () => {

    const [links, setLinks] = useState([]);
    const [currentLink, setCurrentLink] = useState('')


    const handleChange = (e) => {
        //todo:can implement https check after char length 4
        setCurrentLink(e.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault();
        // if (!currentLink) return;
        setLinks([...links, currentLink])
        // todo: send this link to backend
        setCurrentLink("")

    }

    const handleDelete = (index) => {
        console.log("called")
        console.log(index)
        const newLinkSet = [...links]
        newLinkSet.splice(index, 1)
        console.log(newLinkSet)
        setLinks(newLinkSet);

    }

    const socialLinkList = links.map((link, index) => <SocialLink text={link} index={index} handleDelete={handleDelete} />)
    return (

        <div className="px-4 border shadow">
            <h3 className="text-capitalize my-3">skills</h3>

            <div>
                <form className="d-flex">
                    <input type="text" class="form-control w-75 mr-2" onChange={handleChange} value={currentLink} placeholder="got a new skill?add here" />
                    <button type="submit" class="btn btn-primary mb-2 w-25 btn" onClick={handleSubmit} >add</button>
                </form>
            </div>
            {socialLinkList}

        </div >
    )
}

export default SocialLinksCard
