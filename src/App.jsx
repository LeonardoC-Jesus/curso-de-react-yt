import { useEffect, useState } from "react";
import AddTasks from "./components/AddTasks";
import Tasks from "./components/Tasks";
import Title from "./components/Titlte";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function onTaskClick(taskId) {
    const newTask = tasks.map((task) => {
      //PRECISO ATUALIZAR ESTA TAREFA
      if (task.id == taskId) {
        //...task adiciona tudo oq já estava na lista
        return { ...task, isComplite: !task.isComplite };
      }

      //NÃO PRECISO ATUALIZAR ESTA TAREFA
      return task;
    });

    setTasks(newTask);
  }

  function onDeleteTaskClick(taskId) {
    const removeTask = tasks.filter((task) => task.id != taskId);

    setTasks(removeTask);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      isComplite: false,
    };

    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-600 flex justify-center p-6 ">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>

        <AddTasks onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
