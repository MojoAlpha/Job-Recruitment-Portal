import React, { useState } from 'react'

const AutoSuggest = (props) => {

    const [activeOption, setActiveOption] = useState(0)
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestion] = useState(false)
    const [userInput, setUserInput] = useState('')

    const handleChange = () => {

    }
    const handleKeyDown = () => {

    }


    return (
        <div>
            <input type="text" name="" onChange={handleChange} onKeyDown={handleKeyDown} />
            <div id="suggestions">
                <ul>
                    {suggestionList}
                </ul>
            </div>

        </div>
    )
}

export default AutoSuggest
