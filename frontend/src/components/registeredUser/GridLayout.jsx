import React from 'react'
import JobCard from './components/JobCard'
import MessageCard from './components/MessageCard'


function GridLayout() {
    return (
        <>
            {/* todo:change title through props */}
            <h2 className="text-capitalize mb-5">search results</h2>
            <div className="d-flex flex-wrap">
                <JobCard/>
                <JobCard/>
                <JobCard/>
                <JobCard/>
                <MessageCard/>
                <MessageCard/>
            </div>
        </>
    )
}

export default GridLayout
