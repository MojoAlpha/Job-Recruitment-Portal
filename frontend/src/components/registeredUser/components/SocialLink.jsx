import React, { useState } from 'react'
import EditableLabel from 'react-inline-editing';
const SocialLink = (props) => {
    console.log(props.index)
    const [prevUrl, setPrevUrl] = useState('')

    const handleFocus = (url) => {
        setPrevUrl(url)
    }

    const handleFocusOut = (url) => {
        //if the updated value is not same as prev then change it in backend too
        if (url.localeCompare(prevUrl) != 0) {
            props.handleUpdate(props.name, url, props.index);
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-between  rounded my-1">
            <div>
                <small>{props.name}</small>
                <EditableLabel text={props.url}
                    labelClassName='myLabelClass'
                    inputClassName='form-control'
                    // inputWidth='100%'
                    // inputHeight='25px'
                    inputMaxLength='50'
                    labelFontWeight='normal'
                    inputFontWeight='normal'
                    onFocus={handleFocus}
                    onFocusOut={handleFocusOut} />
            </div>
            {props.showEditControls && (<div className="d-flex flex-row flex-md-col flex-xl-row">
                <span onClick={() => props.showPopUPWithItem({ title: props.name, url: props.url })} className="mx-3" style={{ cursor: 'pointer' }}><i class="fas fa-pen"></i>edit</span>
                <span onClick={() => props.handleDelete(props.index)} style={{ cursor: 'pointer' }}><i class="fas fa-minus-circle text-danger"></i>delete</span>
            </div>)}

        </div>
    )
}

export default SocialLink
