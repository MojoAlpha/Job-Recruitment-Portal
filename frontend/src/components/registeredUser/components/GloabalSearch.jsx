import React, { useState } from 'react'
import { tokenAxios } from '../../api'
import SkillPill from './SkillPill'
import { Link } from 'react-router-dom'
const GloabalSearch = (props) => {


    // const [activeOption, setActiveOption] = useState('-1')
    const [suggestions, setSuggestions] = useState([])
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const [suggestedCompanies, setSuggestedCompanies] = useState([])
    const [suggestedSkills, setSuggestedSkills] = useState([])
    const [showSuggestions, setShowSuggestion] = useState(false)
    const [userInput, setUserInput] = useState('')
    // const [isSelected, setIsSelected] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})

    const handleChange = (e) => {
        const query = e.target.value
        setUserInput(query);
        if (query == '') {
            setShowSuggestion(false)
            return
        }
        setShowSuggestion(true)
        tokenAxios.get(`/s/?search=${query}`)
            .then(response => {
                if (response.status == 200) {
                    setSuggestedUsers(response.data.users)
                    setSuggestedCompanies(response.data.companies)
                    setSuggestedSkills(response.data.skills)
                }
                else
                    console.log(response.err)

            })
            .catch((error) => {
                console.log(error)
            })

    }
    const handleClick = (item) => {

        setUserInput('')
        // setIsSelected(true)
        setShowSuggestion(false)
        // setSelectedItem(item)
        // setActiveOption(-1)
    }

    const handleKeyDown = (e) => {
        //13 means enter
        if (e.keyCode === 13 && selectedItem != {}) {
            console.log("hitted enter")
            setShowSuggestion(false)
            // setActiveOption(-1)
            setUserInput('')
            props.handleSubmit(selectedItem)
        }
    }
    console.log(suggestions.users)
    console.log(suggestions.companies)
    console.log(suggestions.skills)

    const suggestedUsersList = suggestedUsers.map(user => {
        return (<Link to={`/user/U/${user._id}`}
            class="list-group-item text-decoration-none"
            style={{ cursor: 'pointer' }}
            onClick={handleClick}
            onMouseEnter={() => console.log(user.name)}>
            {user.name}
        </Link>)
    })

    const suggestedCompaniesList = suggestedCompanies.map(company => {
        return <Link to={`/user/C/${company._id}`}
            class="list-group-item text-decoration-none"
            onClick={handleClick}
            style={{ cursor: 'pointer' }}>
            {company.name}
        </Link>
    })

    const suggestedSkillsList = suggestedSkills.map(skill => {
        return <span
            className="p-2 border m-2 text-decoration none"
            onClick={handleClick}
            style={{ borderRadius: '10em', cursor: 'pointer' }} >
            {skill.name}
        </span>
    })
    return (
        <div style={{ position: 'relative' }}>
            <input type="text" className="form-control" name="search" autoComplete="off" onChange={handleChange} value={userInput} onKeyDown={handleKeyDown} placeholder={props.placeholder} />
            {/* <input type="submit" value="" className="search-btn" /> */}
            <div id="suggestions" className="w-100 shadow overflow-auto" style={{ position: 'absolute', display: showSuggestions ? 'block' : 'none', zIndex: '200', maxHeight: '500px' }}>
                {showSuggestions &&
                    (
                        <ul class="list-group">
                            {
                                suggestedUsersList.length > 0 &&
                                <li class="list-group-item">
                                    <small className="badge badge-warning">users</small>
                                    <ul className="list-group list-group-flush">
                                        {suggestedUsersList}
                                    </ul>
                                </li>
                            }
                            {
                                suggestedCompaniesList.length > 0 &&
                                <li class="list-group-item">
                                    <small className="badge badge-warning">companies</small>
                                    <ul className="list-group list-group-flush">
                                        {suggestedCompaniesList}
                                    </ul>
                                </li>
                            }
                            {
                                suggestedSkillsList.length > 0 &&
                                <li class="list-group-item">
                                    <small className="badge badge-warning">skills</small>
                                    <div className="d-flex flex-wrap text-justify">
                                        {suggestedSkillsList}
                                    </div>
                                </li>
                            }
                        </ul>
                    )}
            </div>

        </div >
    )
}

export default GloabalSearch
