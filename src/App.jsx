import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isAllSelected, setIsAllSelected] = useState(true);
  const [isActiveSelected, setIsActiveSelected] = useState(false);
  const [isCompletedSelected, setIsCompletedSelected] = useState(false);
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("") || "[]")
  );
  const [noCompletedTasks, setNoCompletedTasks] = useState(true);

  const deleteSingleTask = function (current) {
    let todos = tasks.slice();
    todos = todos.filter((task) => task.id !== current.id);
    setTasks(todos);
    localStorage.setItem("", JSON.stringify(todos));
    console.log(todos);
  };

  const deleteAllTasks = function () {
    let todos = tasks.slice();
    todos = todos.filter((task) => !task.completed);
    setTasks(todos);
    localStorage.setItem("", JSON.stringify(todos));
    console.log(todos);
  };

  const toggleTaskStatus = function (current) {
    const todos = tasks.slice();
    todos.map((task) =>
      current.id === task.id ? (task.completed = !task.completed) : ''
    );
    setTasks(todos);
    localStorage.setItem("", JSON.stringify(todos));
    console.log(todos);
  };

  const addTasks = function (e) {
    e.preventDefault();
    const input = document.getElementById("add-details");
    const name = input.value;
    const todos = tasks.slice();
    name &&
      todos.push({ name, completed: false, id: new Date().getTime() }) &&
      localStorage.setItem("", JSON.stringify(todos));
    setTasks(todos);
    input.value = '';
    console.log(todos);
  };

  useEffect(() => {
    setNoCompletedTasks(!tasks?.some((task) => task.completed));
  }, [tasks]);

  return (
    <div className="App max-w-[608px]">
      <header className="App-header text-center text-4xl font-bold">#todo</header>
      <div className="responsive flex w-[100%] justify-evenly border-b-2 border-indigo-500 p-2">
        <button
          id="all"
          className={`status ${isAllSelected ? "selected" : ""}`}
          onClick={() => {
            setIsAllSelected(true);
            setIsActiveSelected(false);
            setIsCompletedSelected(false);
          }}
        >
          All
        </button>
        <button
          id="active"
          className={`status ${isActiveSelected ? "selected" : ""}`}
          onClick={() => {
            setIsActiveSelected(true);
            setIsAllSelected(false);
            setIsCompletedSelected(false);
          }}
        >
          Active
        </button>
        <button
          id="completed"
          className={`status ${isCompletedSelected ? "selected" : ""}`}
          onClick={() => {
            setIsCompletedSelected(true);
            setIsAllSelected(false);
            setIsActiveSelected(false);
          }}
        >
          Completed
        </button>
      </div>
      {!isCompletedSelected && (
        <form className="task-container">
          <input
            id="add-details"
            placeholder="Add a new task..."
            className="input"
          ></input>
          <button
            id="add-task"
            className="add-button"
            onClick={(e) => addTasks(e)}
          >
            Add
          </button>
        </form>
      )}
      <div className="tasks-list">
        {tasks
          ? tasks.map((task) => (
            <div className="task-item" key={task.id}>
              {!isActiveSelected && task.completed ? (
                <span
                  className="material-icons selected-checkbox"
                  onClick={() => toggleTaskStatus(task)}
                >
                  check_box
                </span>
              ) : !isCompletedSelected && !task.completed ? (
                <span
                  className="material-icons blank-checkbox"
                  onClick={() => toggleTaskStatus(task)}
                >
                  check_box_outline_blank
                </span>
              ) : null}
              <span
                className={`item ${task.completed ? "task-completed" : "task-incomplete"
                  } ${isActiveSelected
                    ? "active-selected"
                    : isCompletedSelected
                      ? "completed-selected"
                      : ""
                  }`}
              >
                {task.name}
              </span>
              {isCompletedSelected && task.completed && (
                <div
                  className="delete-icon-container"
                  onClick={() => deleteSingleTask(task)}
                >
                  <span className="material-icons delete-icon">
                    delete_outline
                  </span>
                </div>
              )}
            </div>
          ))
          : null}
      </div>
      {!noCompletedTasks && isCompletedSelected && (
        <button
          id="delete-all"
          className="delete-all-button"
          onClick={() => deleteAllTasks()}
        >
          <span className="material-icons delete-icon">delete_outline</span>
          <span className="delete-all-button-text">delete all</span>
        </button>
      )}

      <footer>
        <div className="footer-text font-bold uppercase">
          {tasks.length} {tasks.length === 1 ? "item" : "items"} left
        </div>

      </footer>

    
    </div>
  );
}

export default App;