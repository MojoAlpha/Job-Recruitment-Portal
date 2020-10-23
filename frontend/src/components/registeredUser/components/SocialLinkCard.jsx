import React, { useState, useEffect } from 'react'
import SocialLink from './SocialLink';

const SocialLinkCard = (props) => {

    const [links, setLinks] = useState([]);
    const [currentLink, setCurrentLink] = useState('')

    useEffect(() => {
        setLinks(props.links())
    }, [])

    const handleChange = (e) => {
        setCurrentLink(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currentLink) return;
        setLinks([...links, currentLink]);
        setCurrentLink("")
    }

    const handleDelete = (index) => {
        console.log(`clicked ${index}`)
        // let modifiedList = [...links.slice(0, index), ...links.slice(index + 1)];
        // console.log(modifiedList)
        // modifiedList.splice(index, 1);
        // console.log(modifiedList)
        // setLinks([...modifiedList]);
    }
    useEffect(() => {
        console.log(props.user)
        // setLinks(props.user.skills)
    }, [])



    const SocialLinkList = links.map((link, index) => <SocialLink name={link.title} url={link.url} index={link.id} handleDelete={handleDelete} />)
    return (

        <div className="px-4 mb-4 border bg-white shadow">
            <h3 className="text-capitalize my-3">Social Links</h3>

            <div>
                <form className="d-flex" onSubmit={handleSubmit}>
                    <input type="text" class="form-control w-75 mr-2" onChange={handleChange} value={currentLink} placeholder="got a new skill?add here" />
                    <button type="submit" class="btn btn-primary mb-2 w-25 btn"  >add</button>
                </form>
            </div>
            {SocialLinkList.length ? SocialLinkList :
                <div>
                    <h6 className=" mt-4 text-center text-capitalize">adding skills help recruiter to find you easily.</h6>
                    <div >
                        <img src={`${process.env.PUBLIC_URL}/images/no_skills.jpg`} alt="" />
                    </div>
                </div>
            }
        </div >
    )
}

export default SocialLinkCard
