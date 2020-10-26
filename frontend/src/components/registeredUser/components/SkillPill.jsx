import React from 'react'
/*how to use this component
< SkillPill name={} />
1.name: name of the skill you want to display
 */
const SkillPill = (props) => {
    console.log(props)
    return (
        <div className="p-2 border m-2" style={{ borderRadius: '10em' }} >

            <span onClick={() => { alert("called"); props.deleteItem(props.index) }}>{props.item.name}<i class="fas fa-minus-circle text-danger ml-1" style={{ cursor: 'pointer', zIndex: 10 }} ></i></span>
        </div>
    )
}

export default SkillPill
