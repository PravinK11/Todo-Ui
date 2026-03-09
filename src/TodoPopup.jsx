import { useState } from "react";

function TodoPopup(props) {

    const { isOpen, setIsOpen, isEditing,
        handleUpdate, handleSubmit, formData,
        setFormData } = props
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,

        }
        )
    };
    const back = () => {
        setIsOpen(false);
        window.location.reload();
    }
    return (
        <div className="modal">
            {isOpen && <div className="form-section modal-content">
                <h3>{isEditing ? "Update Todo" : "Add New Todo"}</h3>

                <form onSubmit={isEditing ? handleUpdate : handleSubmit}>


                    <input
                        type="text"
                        name="todo"
                        placeholder="Task"
                        value={formData.todo}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="todo_desc"
                        placeholder="Todo Description"
                        value={formData.todo_desc}
                        onChange={handleChange}
                        required

                    />
                    <label >Deadline
                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label >Date of creation
                        <input
                            type="date"
                            name="created_at"
                            value={formData.created_at}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label > Priority:
                        <select name="priority" value={formData.priority} onChange={handleChange}>

                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </label>
                    <label > Status
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="pending">pending</option>
                            <option value="inprogress">inprogress</option>
                            <option value="complete">complete</option>
                        </select>
                    </label>
                    <button type="submit" className="btn"  >
                        {isEditing ? "Update Todo" : "Add New Todo"}

                    </button>
                    <button type="button" className="btn" onClick={back} >
                        Back
                    </button>
                </form>
            </div>}
        </div>

    )
}

export default TodoPopup;