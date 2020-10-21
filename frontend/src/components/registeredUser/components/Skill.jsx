import React from 'react'
import EditableLabel from 'react-inline-editing';
const Skill = (props) => {
    console.log(props.index)
    return (
        <div className="d-flex">
            <EditableLabel text={props.text}
                labelClassName='myLabelClass'
                inputClassName='form-control'
                // inputWidth='100%'
                // inputHeight='25px'
                inputMaxLength='50'
                labelFontWeight='normal'
                inputFontWeight='normal' />
            <span onClick={() => props.handleDelete(props.index)}><i class="fas fa-minus-circle text-danger"></i></span>
        </div>
    )
}

export default Skill
