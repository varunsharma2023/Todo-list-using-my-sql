import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



function TaskComponent({ tsks , onDelete , id}) {

  const handleDelete = () => {
    onDelete(id);
  };
  return (
    // Container div for a single task
    <div className="task">
      <div>
        <p> {tsks}</p>
        
      </div>

      <button className='btn' onClick={handleDelete}>X</button>
    </div>
  );
}
// Function component representing the main App
function App() {

  const [tasks, setTasks] = useState([]);

// State to store the value of the new task input field
  const [newTask, setNewTask] = useState('');

  // Fetch data from the backend when the component mounts
  

  // Function to handle form submission when adding a new task
  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await fetch('http://localhost:5000/get/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tsks: newTask })
      });

      // Fetch the updated data after the POST request to get the latest tasks
      fetchData();
      
      
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/get/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch the data once when the component mounts
  }, []);
  
  
  


 // Function to handle task deletion
 const handleDeleteTask = async (id) => {
  try {
    await fetch(`http://localhost:5000/get/tasks/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    console.log("Task with ID", id, "is deleted.");

   
    setTasks(tasks.filter((task) => task.id !== id));
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};




  return (
    // The body of the component
    <body>
      <div className='container'>
        <h1 className="tsk d-flex justify-content-center mt-4 mb-4">
          To Do List App
        </h1>
        <hr />  
    
        <form onSubmit={handleSubmit}>
          <div className="row d-flex align-items-center justify-content-center mb-5">
            
            <div className='enter col-2 p-2'>
              Enter the task
            </div>
            <input
              className='col-6 inpt p-2'
              type="text"
              name="data"
              placeholder='Enter your task'
              value={newTask}
              onChange={event => setNewTask(event.target.value)}
            />
            <button className='col-2 m- p-2' type="submit">Add Task</button>
            
          </div>
          
        </form>
      
        </div>

        {
  /* Renders TaskComponent for each task in the tasks array */
}

        {tasks.map((task,index) => (
          <TaskComponent key={index}id={task.id} tsks={task.tsks}
          onDelete={handleDeleteTask} // Pass the onDelete function
           />
        ))}
      
    </body>
  );
}

export default App;
