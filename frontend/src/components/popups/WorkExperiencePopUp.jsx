import React, { useState, useEffect } from 'react'

const WorkExperiencePopUp = (props) => {
    console.log(props)
    const [isNew, setIsNew] = useState(false)
    const [item, setItem] = useState({})

    useEffect(() => {
        setItem(props.item)
        if (props.item.company == '')
            setIsNew(true)
        console.log(props.item)

    }, [])


    const handleChange = (event) => {
        const { name, value } = event.target
        setItem({
            ...item,
            [name]: value
        })
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: '2000', background: '#343a40bd', display: 'block' }}>
            <div className="container p-2 p-md-4  shadow border rounded bg-light col-xl-6 col-md-8 col-12" style={{ position: 'relative' }}>

                <div className="m-4">
                    <h3 className="text-center my-4">{isNew ? 'create new entry' : 'update this entry'}</h3>
                    <form method="POST">
                        <div class="form-group">
                            <label className="text-capitalize"> name of the company</label>
                            <input type="text" class="form-control" placeholder="enter name of your company" name="company" onChange={handleChange} value={item.company} />
                        </div>
                        <div class="form-group">
                            <label className="text-capitalize">Designation</label>
                            <input type="text" class="form-control" placeholder="enter your designation" name="desig" onChange={handleChange} value={item.desig} />
                        </div>
                        {/* todo: regex validation is not working properly */}
                        <div class="form-group">
                            <label className="text-capitalize">start year</label>
                            <input type="text" pattern="^(((0)[0-9])|((1)[0-2]))(\/)\d{4}$" maxlength="7" class="form-control" placeholder="start year" name="startDate" onChange={handleChange} value={item.startDate} />
                        </div>
                        <div class="form-group">
                            <label className="text-capitalize">end year (expected)</label>
                            <input type="text" pattern="^(((0)[0-9])|((1)[0-2]))(\/)\d{4}$" maxlength="7" class="form-control" placeholder="end year" name="endDate" onChange={handleChange} value={item.endDate} />

                        </div>
                        {isNew ?
                            <button
                                type="submit"
                                class="btn mx-auto btn-lg  mt-4 btn-block  btn-primary"
                                onClick={(e) => {

                                    props.createItem(item)
                                }}>Add</button>
                            :
                            <button type="submit" class="btn mx-auto btn-lg  mt-4 btn-block  btn-primary" onClick={() => props.updateItem(props.index, item)}>update</button>
                        }
                    </form>
                    <button class="btn mx-auto btn-lg  mt-4 btn-block  btn-danger" onClick={() => props.closePopUP()}>cancel</button>
                </div>




            </div>
        </div>
    )
}

export default WorkExperiencePopUp
