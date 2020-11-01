import React from 'react'

export default function Message(props) {
    return (
        <h4 className="px-3 py-2" style={{
            textAlign:props.alignment
        }}>
            <span className="px-5 py-2" style={{
                color:'white',
                fontWeight:'bolder',
                backgroundColor:'#11b0bb',
                borderRadius:"20px"
            }}>
                {props.text}
            </span>
        </h4>
    )
}
