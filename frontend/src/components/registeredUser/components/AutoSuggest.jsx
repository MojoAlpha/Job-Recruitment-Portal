import React, { useState } from 'react'
import { tokenAxios } from '../../api'
const AutoSuggest = (props) => {

    const [activeOption, setActiveOption] = useState('-1')
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestion] = useState(false)
    const [userInput, setUserInput] = useState('')
    // const [isSelected, setIsSelected] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})

    const handleChange = (e) => {
        const query = e.target.value
        setUserInput(query);
        if (!query) {
            setShowSuggestion(false)
            return
        }
        setShowSuggestion(true)
        tokenAxios.get(`/s/skill?search=${query}`)
            .then(response => {
                setSuggestions(response.data.skills)
                console.log("skills added to state")
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const handleClick = (item) => {
        setUserInput(item.name)
        // setIsSelected(true)
        setShowSuggestion(false)
        setSelectedItem(item)
        setActiveOption(-1)
    }
    //todo:look at the indexing thing anad manage btn
    const handleKeyDown = (e) => {
        //13 means enter
        if (e.keyCode === 13) {
            console.log("hitted enter")
            setShowSuggestion(false)
            setActiveOption(-1)
            setUserInput('')
            props.handleSubmit(selectedItem)
        }//38 means up arrow key
        // todo:up and down arrow key in autosuggest now workingproperly
        else if (e.keyCode === 38) {
            //if already on first selection
            if (activeOption === 0) {
                return;
            }

            setActiveOption(prevActiveOption => prevActiveOption - 1);
            setSelectedItem(suggestions[activeOption])
            setUserInput(selectedItem.name)

        }//40 means down arrow key
        else if (e.keyCode === 40) {   //if already on last selection
            if (activeOption - 1 === suggestions.length) {
                return;
            }
            console.log(`previos active:${activeOption}`)
            setActiveOption(prevActiveOption => prevActiveOption + 1);
            console.log(`new active:${activeOption}`)
            console.log(`item that to be set ${suggestions[activeOption]}`)
            setSelectedItem(suggestions[activeOption])
            setUserInput(selectedItem.name)

        }

    }
    const suggestionList = suggestions.map((suggestion, index) => <li className="list-group-item " onClick={() => handleClick(suggestion)}>{suggestion.name}</li>)

    return (
        <div style={{ position: 'relative' }}>
            <input type="text" className="form-control" name="search" onChange={handleChange} value={userInput} onKeyDown={handleKeyDown} placeholder={props.placeholder} />
            {/* <input type="submit" value="" className="search-btn" /> */}
            <div id="suggestions" className="w-100" style={{ position: 'absolute', display: showSuggestions ? 'block' : 'none', zIndex: '200' }}>
                {showSuggestions && (<ul className="shadow">
                    {suggestionList}
                </ul>)}
            </div>

        </div >
    )
}

export default AutoSuggest
