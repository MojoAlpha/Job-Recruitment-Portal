import React from 'react'
/*how to use this component
< SkillPill name={} />
1.name: name of the skill you want to display
 */
const SkillPill = (props) => {
    return (
        <span className="p-2 border m-2" style={{ borderRadius: '10em' }}>{props.item.name}<i class="fas fa-minus-circle text-danger ml-1" onClick={() => props.deleteItem(props.index)} style={{ cursor: 'pointer' }}></i></span>
    )
}

export default SkillPill
