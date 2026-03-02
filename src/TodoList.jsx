
import { useEffect, useState } from "react";
import "./Title.css";
import TodoPopup from './TodoPopup'

function TodoList() {
  const [todo, setTodo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTodo = async() => {
      const todo = await fetch('http://localhost:5000/todo')
      const result = await todo.json();
  
      const newResult = result.map((r) => {
        return {...r, status: r.todo_status}
      })
  
      setTodo(newResult)
      console.log(newResult)
    }

    fetchTodo()
  }, [])  // component mount


  // Handle input change


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

    fetch("url", {
      method: "POST",
      body: JSON.stringify({
        todo: newTodo.todo
      })
    })
    resetForm();
  };

  const openForm = () => {
    modal.style.display = "block";
  }


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
      <div className="centre-div">



        <button onClick={() => setIsOpen(true)} className="btn">Add New Todo</button>
      </div>

      {/* TODO LIST */}
      <div id="card" className="centre-div">
        <h2>Todos</h2>
        <div>
          <TodoPopup isOpen={isOpen} isEditing={isEditing} handleUpdate={handleUpdate} handleSubmit={handleSubmit} />
        </div>

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
    </div>
  );

}
export default TodoList;