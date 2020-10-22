import React from 'react'
import ListItemWithBtn from './ListItemWithBtn'
import SkillPill from './SkillPill'

const JobOpeningDetail = () => {
    return (
        <>
            <div className="container-fluid bg-white p-4  mb-4">
                <div className="mx-2 mx-xl-5">
                    <div className="d-flex flex-column flex-sm-row mb-4">
                        <div className="rounded-circle align-self-center " style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/testimonial.jpg)`, backgroundSize: 'cover', height: '20vh', width: '20vh' }}>
                        </div>
                        <div className="mx-4 d-flex justify-content-between flex-column">
                            <h2 className="text-capitalize">software engineer sde2</h2>
                            <small className="mb-1">microsoft</small>
                            <p className="text-capitalize mt-3"><strong>location:</strong> noida,uttar pradesh</p>
                            <p className="text-capitalize mt-1"><strong>posted on:</strong> 22-oct-2020</p>
                            <div className="d-flex">
                                <button className="btn btn-outline-primary">Apply</button>
                            </div>
                        </div>
                    </div>
                    <div id="skills" className="" style={{ marginBottom: '4em' }}>
                        <h5 className="text-capitalize font-weight-bold mb-3">skills</h5>
                        <div id="skill-list d-flex flex-wrap">
                            <SkillPill name="Html and CSS" />
                            <SkillPill name="React" />

                        </div>
                    </div>
                    <div id="description" style={{ marginBottom: '4em' }}>
                        <h5 className="text-capitalize mb-3 font-weight-bold">description</h5>
                        <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio porro veritatis recusandae blanditiis quia. Suscipit a molestias voluptas illum voluptatem. Saepe eligendi, perferendis laboriosam fuga delectus aperiam officia quam ipsa provident architecto facilis explicabo ducimus, maiores pariatur officiis ipsam voluptatibus praesentium error eveniet beatae eum itaque vel blanditiis. Aperiam, officiis?</p>
                    </div>

                    <div id="applicants" style={{ marginBottom: '4em' }}>
                        <h5 className="text-capitalize mb-3 font-weight-bold">Received application</h5>
                        <div id="applicants-list">
                            <ListItemWithBtn imgUrl={`${process.env.PUBLIC_URL}/images/testimonial.jpg`} text="Lovedeep singh kamal" btnText="approve" handleClick={() => console.log("approved")} />

                        </div>

                    </div>

                </div>
            </div>



        </>
    )
}

export default JobOpeningDetail
