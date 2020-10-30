import React from 'react'
/*how to use this component
< SkillPill name={} deleteItem={} index={}/>
1.name: name of the skill you want to display
2.deleteItem: function to handle deleteing of skill(param:index)
3.index: index of the skill
 */
const SkillPill = (props) => {
    console.log(props)
    return (
        <div className="p-2 border m-2" style={{ borderRadius: '10em' }} >
            {/* todo:move this onclick to some inner element so that i can hide edit controls */}
            <span onClick={() => { props.deleteItem(props.index) }}>{props.name}<i class="fas fa-minus-circle text-danger ml-1" style={{ cursor: 'pointer', zIndex: 10 }} ></i></span>
        </div>
    )
}

export default SkillPill
