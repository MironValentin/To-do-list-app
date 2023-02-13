import '../App.css'
export const Task = () =>{

    return(
        <div className="task">
            <div className="content">
                <input type="text" className="text" value="EU sunt" readOnly />
            </div>
            <div className="actions">
                <button className="edit">Edit</button>
                <button className="delete">Delete</button>
            </div>
        </div>
    )
} 