
import { useEffect, useState } from "react";
import "./Title.css";
import TodoPopup from './TodoPopup'


function TodoList() {
  const [todo, setTodo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    todo: "",
    deadline: "",
    todo_desc: "",
    created_at: "",
    updated_at: "",
    priority: "",
    status: "",
  });
  const fetchTodo = async () => {
    const todo = await fetch('http://localhost:5000/todo')
    const result = await todo.json();

    const newResult = result.map((r) => {
      return { ...r, status: r.todo_status }
    })
    setTodo(newResult)
  }

  useEffect(() => {
    fetchTodo()
  }, [])

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTodo = {
      todo: formData.todo,
      todo_desc: formData.todo_desc,
      deadline: formData.deadline,
      created_at: formData.created_at,

      priority: formData.priority,
      todo_status: formData.status,
      user_id: 1,
    };

    const response = await fetch("http://localhost:5000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    });
    const data = await response.json();

    await fetchTodo();
    resetForm();
    setIsOpen(false);

  };

  const openForm = () => {
    modal.style.display = "block";
  }

  
  const removeButton = (todo_id) => {
    const updatedList = todo.filter((item) => item.todo_id !== todo_id);
    setTodo(updatedList);
  };

  
  const handleEdit = (i) => {
    setFormData({...i,
      deadline: i.deadline
      ? new Date(i.deadline).toISOString().split("T")[0]
      : "",
    created_at: i.created_at
      ? new Date(i.created_at).toISOString().split("T")[0]
      : "",
    });
    setIsEditing(true);
    setIsOpen(true);
  };

 
  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/todo/${formData.todo_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: formData.todo,
          todo_desc: formData.todo_desc,
          deadline: formData.deadline,
          priority: formData.priority,
          todo_status: formData.status,
        }),
      }
    );
    await fetchTodo();
    setIsEditing(false);
    setIsOpen(false);
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
      <div className="centre-div">
        <button onClick={() => setIsOpen(true)} className="btn">Add New Todo</button>
      </div>

      {/* TODO LIST */}
      <div id="card" className="centre-div">
        <h2>Todos</h2>
        <div>
          <TodoPopup isOpen={isOpen} setIsOpen={setIsOpen} isEditing={isEditing} handleUpdate={handleUpdate} handleSubmit={handleSubmit} formData={formData}
            setFormData={setFormData} />
        </div>
        


        {todo.map((i) => (
          <div key={i.todo_id} className="todo-item centre-div">

            <p><strong>Task:</strong> {i.todo}</p>
            <p><strong>Description:</strong>{i.todo_desc}</p>
            <p><strong>Deadline:</strong> {""}{new Date(i.deadline).toLocaleDateString()}</p>
            <p><strong>Priority:</strong>{i.priority}</p>

            <button
              className="btn"
              onClick={() => handleEdit(i)}
            >
              Update
            </button>
            
            <button
              className="btn"
              onClick={() => removeButton(i.todo_id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );

}
export default TodoList;