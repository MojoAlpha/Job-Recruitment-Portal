import React, { useState, useEffect } from 'react'

const SocailLinksPopUP = (props) => {
    // console.log(`popup item ${props.item}`)
    const [isNew, setIsNew] = useState(false)
    const [item, setItem] = useState({})

    useEffect(() => {
        setItem(props.item)
        if (props.item.title == '')
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
                    <form>
                        <div class="form-group">
                            <label className="text-capitalize"> company name</label>
                            <input type="text" class="form-control" placeholder="enter name of company" name="title" onChange={handleChange} value={item.title} required />
                        </div>
                        <div class="form-group">
                            <label className="text-capitalize">url</label>
                            <input type="text" class="form-control" placeholder="enter url" name="url" onChange={handleChange} value={item.url} required="true" />
                        </div>
                        {isNew ?
                            <button
                                type="submit"
                                class="btn mx-auto btn-lg  mt-4 btn-block  btn-primary"
                                onClick={(e) => {
                                    e.preventDefault()
                                    props.createItem(item)
                                }}>Add</button>
                            :
                            <button
                                type="submit"
                                class="btn mx-auto btn-lg  mt-4 btn-block  btn-primary"
                                onClick={(e) => {
                                    e.preventDefault()
                                    props.updateItem(item.title, item.url, props.index)
                                }
                                }
                            >update</button>
                        }
                    </form>
                    <button class="btn mx-auto btn-lg  mt-4 btn-block  btn-danger" onClick={() => props.closePopUP()}>cancel</button>
                </div>




            </div>
        </div>
    )
}

export default SocailLinksPopUP
