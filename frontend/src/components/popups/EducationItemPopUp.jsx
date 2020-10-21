import React, { useState } from 'react'

const EducationItemPopUp = (props) => {

    const [isNew, setIsNew] = useState(true)

    if (Object.keys(props.item).length !== 0)
        setIsNew(false)

    const [item, setItem] = useState({
        insti: '',
        degree: '',
        year: ''
    })

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
                    <form>
                        <div class="form-group">
                            <label className="text-capitalize"> name of the institute</label>
                            <input type="text" class="form-control" placeholder="enter name of your institute" name="insti" onChange={handleChange} value={item.insti} />
                        </div>
                        <div class="form-group">
                            <label className="text-capitalize">Degree/Course</label>
                            <input type="text" class="form-control" placeholder="enter your degree/course name (ex. btech)" name="degree" onChange={handleChange} value={item.degree} />
                        </div>
                        <div class="form-group">
                            <label className="text-capitalize">start year</label>
                            <input type="text" pattern="\d*" maxlength="4" class="form-control" placeholder="start year" name="year" onChange={handleChange} value={item.year} />
                        </div>
                        <div class="form-group">
                            <label className="text-capitalize">end year (expected)</label>
                            <input type="text" pattern="\d*" maxlength="4" class="form-control" placeholder="end year" name="year" onChange={handleChange} value={item.year} />

                        </div>
                        {isNew ?
                            <button type="submit" class="btn mx-auto btn-lg  mt-4 btn-block  btn-primary" onClick={() => props.createItem(item)}>Add</button>
                            :
                            <button type="submit" class="btn mx-auto btn-lg  mt-4 btn-block  btn-primary" onClick={() => props.updateItem(props.index, item)}>update</button>
                        }
                    </form>
                    <button class="btn mx-auto btn-lg  mt-4 btn-block  btn-danger" onClick={() => props.showPopUpWithItem({})}>cancel</button>
                </div>




            </div>
        </div>
    )
}

export default EducationItemPopUp
