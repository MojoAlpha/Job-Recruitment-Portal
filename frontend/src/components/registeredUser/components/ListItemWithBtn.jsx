import React from 'react'

/*how to use this component
< ListItemWithBtn imgUrl={} text={} btnText={} handleClick={} id={}/>
1.text: text to display on the item
2.btnText:text to display on the btn
3.handleClick: function to tell what to do on btn click
4.imgUrl: url of the displayed in the list
5.id: anything which can uniquely identify each object
 */
const ListItemWithBtn = (props) => {
    return (
        <div className="container my-2">
            <div className="px-3 py-2 d-flex flex-column flex-sm-row align-items-center col col-xl-10 shadow-sm border">
                <div className="d-flex  p-2 flex-grow-1">
                    <img
                        src={props.imgUrl}
                        alt=""
                        className="profile rounded-circle"
                        style={{ height: "50px", width: "50px" }}
                    />
                    <p className="m-0 pl-2 font-weight-bold align-self-center text-body">
                        {props.text}
                    </p>

                    {props.isOpen ?
                        <span class="badge badge-success align-self-center ml-2">open</span>
                        :
                        <span class="badge badge-danger align-self-center ml-2">closed</span>
                    }
                </div>
                <buttton className="btn btn-primary" onClick={() => props.handleClick(props.id)}>{props.btnText}</buttton>
            </div>
        </div>
    )
}

export default ListItemWithBtn
