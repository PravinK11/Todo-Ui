import { useState } from "react";

function TodoPopup(props) {
    const { isOpen, isEditing, handleUpdate, handleSubmit } = props
    const [formData, setFormData] = useState({
        todo: "",
        deadline: "",
        todo_desc: "",
        created_at: "",
        updated_at: "",
        priority: "",
        status: "",
    });

    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
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
                    <select value={formData.priority} onChange={handleChange}>
                        
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    </label>
                    <label > Status
                    <select value={formData.status} onChange={handleChange}>
                        <option value="pending">pending</option>
                        <option value="inprogress">inprogress</option>
                        <option value="complete">complete</option>
                    </select>
                   </label>
                    <button type="submit" className="btn" onClick={() => setIsOpen(false)}>
                        {isEditing ? "Update Todo" : "Add Todo"}

                    </button>
                    <button type="" className="btn" onClick={() => setIsOpen(false)}>
                        Back
                    </button>
                </form>
            </div>}
        </div>

    )
}

export default TodoPopup;