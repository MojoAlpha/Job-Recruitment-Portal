import React, { useState, useEffect } from 'react'

import Skill from './Skill';

const SkillCard = (props) => {

    const [links, setLinks] = useState([]);
    const [currentLink, setCurrentLink] = useState('')

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



    const SkillList = links.map((link, index) => <Skill text={link.name} index={link.id} handleDelete={handleDelete} />)
    return (

        <div className="px-4 border bg-white shadow mb-4">
            <h3 className="text-capitalize my-3">skills</h3>

            <div>
                <form className="d-flex" onSubmit={handleSubmit}>
                    <input type="text" class="form-control w-75 mr-2" onChange={handleChange} value={currentLink} placeholder="got a new skill?add here" />
                    <button type="submit" class="btn btn-primary mb-2 w-25 btn"  >add</button>
                </form>
            </div>
            {SkillList.length ? SkillList :
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

export default SkillCard
