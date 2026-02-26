
import { useState } from "react";
import "./Title.css";

function TodoList() {
  const [todo, setTodo] = useState([
    {

      todo: "Complete Assignment",
      todo_desc: "Finish React Todo project",
      deadline: "2026-02-20",
      created_at: "2026-02-15",
      updated_at: "2026-02-16",
      priority: "High",
      status: "Pending",

    },
    {

      todo: "Prepare Presentation",
      todo_desc: "Create slides for project demo",
      deadline: "2026-02-25",
      created_at: "2026-02-14",
      updated_at: "2026-02-16",
      priority: "Medium",
      status: "In Progress",
    },
    {
      todo: "Database Optimization",
      todo_desc: "Improve SQL queries performance",
      deadline: "2026-03-01",
      created_at: "2026-02-10",
      updated_at: "2026-02-15",
      priority: "Low",
      status: "Completed",

    },

  ]);

  const [formData, setFormData] = useState({
    todo: "",
    deadline: "",
    todo_desc: "",
    created_at: "",
    updated_at: "",
    priority: "",
    status: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD TODO
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      todo: formData.todo,
      todo_desc: formData.todo_desc,
      deadline: formData.deadline,
      created_at: formData.created_at,
      updated_at: formData.updated_at,
      priority: formData.priority,
      status: formData.status,
    };

    setTodo([...todo, newTodo]);

    resetForm();
  };

  // REMOVE TODO
  const removeButton = (todo) => {
    const updatedList = todo.filter((item) => item.todo !== todo);
    setTodo(updatedList);
  };

  // CLICK UPDATE BUTTON (Fill form)
  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
  };

  // UPDATE TODO
  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedList = todo.map((item) =>
      item.todo === formData.todo
        ? {
          ...item,
          todo: formData.todo,
          todo_desc: formData.todo_desc,
          deadline: formData.deadline,
          created_at: formData.created_at,
          updated_at: formData.updated_at,
          priority: formData.priority,
          status: formData.status,

        }
        : item
    );

    setTodo(updatedList);
    setIsEditing(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      todo: "",
      deadline: "",
      todo_desc: "",
      created_at: "",
      updated_at: "",
      priority: "",
      status: "",
    });
  };

  return (
    <div className="main-container">
      {/* TODO LIST */}
      <div id="card" className="centre-div">
        <h2>Todos</h2>

        {todo.map((i) => (
          <div className="todo-item centre-div">
            
            <p><strong>Task:</strong> {i.todo}</p>
            <p><strong>Description:</strong>{i.todo_desc}</p>
            <p><strong>Deadline:</strong> {i.deadline}</p>
            <p><strong></strong></p>

            <button
              className="btn"
              onClick={() => handleEdit(i)}
            >
              Update
            </button>

            <button
              className="btn"
              onClick={() => removeButton(i.todo)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* FORM */}
      <div className="form-section">
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
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
          <label htmlFor="created-date">Date of creation</label>
          <input
            type="date"
            name="created_at"
            id="created-date"
            value={formData.user_id}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn">
            {isEditing ? "Update Todo" : "Add Todo"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TodoList;