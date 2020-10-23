import React from 'react'
import EditableLabel from 'react-inline-editing';
const SocialLink = (props) => {
    console.log(props.index)
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
                    inputFontWeight='normal' />
            </div>

            <span onClick={() => props.handleDelete(props.index)}><i class="fas fa-minus-circle text-danger"></i></span>
        </div>
    )
}

export default SocialLink
