import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  AddIcon,
  MoonIcon,
  SunCloud,
  SunIcon,
  TrashIcon,
} from '../assets/icons';
import AddTaskDialog from './AddTaskDialog';
import Button from './Button';
import TaskItem from './TaskItem';
import TasksSeparator from './TasksSeparator';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  useEffect(() => {
    // Pegar os dados da API e atualizar o state tasks
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      });
      const tasks = await response.json();
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  const morningTasks = tasks.filter((task) => task.time === 'morning');
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon');
  const nightTasks = tasks.filter((task) => task.time === 'night');

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      }

      if (task.status === 'not_started') {
        return { ...task, status: 'in_progress' };
      }

      if (task.status === 'in_progress') {
        return { ...task, status: 'done' };
      }

      if (task.status === 'done') {
        return { ...task, status: 'not_started' };
      }

      return task;
    });

    setTasks(newTasks);
    toast.success('Tarefa atualizada com sucesso!');
  };

  const handleTaskDeleteClick = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    toast.success('Tarefa deletada com sucesso!');
  };

  const handleAddTaskSubmit = (task) => {
    setTasks([...tasks, task]);
    toast.success('Tarefa adiciona com sucesso!');
  };

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button
            text={'Limpar tarefas'}
            icon={<TrashIcon />}
            color="secondary"
          />
          <Button
            text={'Nova tarefa'}
            icon={<AddIcon />}
            color="primary"
            onClick={() => setAddTaskDialogIsOpen(true)}
          />
          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
            handleSubmit={handleAddTaskSubmit}
          />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator icon={<SunIcon />} text={'Manhã'} />

          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator icon={<SunCloud />} text={'Tarde'} />

          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator icon={<MoonIcon />} text={'Noite'} />

          {nightTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
