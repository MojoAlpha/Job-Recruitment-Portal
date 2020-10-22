import React from 'react'
/*how to use this component
< ConfirmationPopUp text={} handleYes={} handleCancel={} index={}/>
1. text: is what you want to show (ex.are you sure to delete)
2.handleYes(): is a function to handle when user click Yes
             which will call your functioin with index
3.index: to uniquely identify your element
4.handleCancel(): is a function to handle when user click cancel
                    generally you would like to handle state like 
                    showpopup
 */

const ConfirmationPopUp = (props) => {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: '2000', background: '#343a40bd', display: 'block' }}>
            <div className="container p-2 p-md-4  shadow border rounded bg-light col-xl-6 col-md-8 col-12" style={{ position: 'relative' }}>
                <h4 className="text-capitalize mb-4 mt-2 mx-auto text-center">{props.text}</h4>
                <div className="d-flex flex-column flex-md-row mx-4 justify-content-center align-items-center">

                    <button class="btn col-12 col-md-3 m-2 btn-outline-primary" onClick={() => props.handleYes(props.index)}>Yes</button>
                    <button class="btn col-12 col-md-3 m-2 btn-outline-danger" onClick={() => props.handleCancel()}>No,cancel</button>
                </div>




            </div>
        </div>
    )
}

export default ConfirmationPopUp
