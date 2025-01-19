import TodoTask from "../Components/TodoTask";
import "./To_Do.css";
import { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const BASE_URL = "http://localhost:8080";

const fetchTasks = async () => {
  const { data } = await axios.get(BASE_URL);
  return data;
};

const addTask = async (newTask) => {
  const { data } = await axios.post(BASE_URL, newTask);
  return data;
};
const updateTask = async (task) => {
  const { data } = await axios.put(BASE_URL, task);
  return data;
};

const deleteTask = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
};

const To_Do = () => {
  const queryClient = useQueryClient();
  const [task, setTask] = useState({
    _id: "",
    name: "",
    isDone: "",
  });

  // fetching task from server and using cache as storage

  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    staleTime: 1000 * 10 * 60,
    retry: 3,
  });

  // adding a task
  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: (addedTask) => {
      // pessimistic
      queryClient.setQueryData(["tasks"], (oldTask) => [
        ...oldTask,
        addedTask,
      ]);
    },

    onError: (error) => {
      console.error("failed to add task: ", error);
    },
  });

  // updating task
  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (updatedTask) => {
      // pessimistic
      queryClient.setQueryData(["tasks"], (oldTasks) =>
        oldTasks.map((p) => (p._id === updatedTask._id ? updatedTask : p)),
      );
    },
    onError: (error) => {
      console.error("failed to add task: ", error);
    },
  });

  // Deleting tasks

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (deletedTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks) =>
        oldTasks.filter((t) => t._id !== deletedTask),
      );
    },
    onError: (err) => {
      console.error("failed to delete tasks: ", err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.name !== "") {
      const newTasks = queryClient.getQueryData(["tasks"]);
      let newTask = newTasks.find((t) => t._id === task._id) || {};
      newTask.name = task.name;

      if (!newTask._id) {
        addTaskMutation.mutate(newTask);
      } else {
        updateTaskMutation.mutate(newTask);
      }
      setTask({ name: "", _id: "" });
    }
  };
  const handleCheckChange = (task) => {
    const doneTask = { ...task, done: !task.done };
    updateTaskMutation.mutate(doneTask);
    queryClient.setQueryData(["tasks"], (oldTasks) =>
      oldTasks.map((t) => (t._id === doneTask._id ? doneTask : t)),
    );
  };

  const handleChange = ({ currentTarget: input }) => {
    setTask((prevState) => ({ ...prevState, name: input.value }));
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };
  const handleEdit = (task) => {
    setTask({ name: task.name, _id: task._id });
  };

  const loadTasks = () => {
    if (isLoading) return <h2>Loading Tasks</h2>;
    if (isError) {
      console.error(error);
      return <h2>Error fetching tasks hit the reload button</h2>;
    }

    return (
      <ul>
        {tasks.map((task) => (
          <TodoTask
            task={task}
            onChange={() => handleCheckChange(task)}
            key={task._id}
            onDelete={() => handleDelete(task._id)}
            onEdit={() => handleEdit(task)}
          />
        ))}
      </ul>
    );
  };

  return (
    <div className="app_container">
      <div className="app_container-content">
        <h1>ToDo App</h1>
        <form onSubmit={handleSubmit} className="app_container-form">
          <input
            type="text"
            name="taskname"
            value={task.name}
            onChange={handleChange}
            placeholder="Add to do"
          />
          <button type="submit" disabled={isLoading}>
            {task._id === "" ? "ADD" : "EDIT"}
          </button>
        </form>

        <div className="app_container-todo-list">{loadTasks()}</div>
      </div>
    </div>
  );
};

export default To_Do;
