import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { MoonIcon, SunCloud, SunIcon } from '../assets/icons';
import { useGetTasks } from '../hooks/data/use-get-tasks';
import { taskQueryKeys } from '../keys/queries';
import Header from './Header';
import TaskItem from './TaskItem';
import TasksSeparator from './TasksSeparator';

const Tasks = () => {
  const queryClient = useQueryClient();
  const { data: tasks } = useGetTasks();

  const morningTasks = tasks?.filter((task) => task.time === 'morning');
  const afternoonTasks = tasks?.filter((task) => task.time === 'afternoon');
  const nightTasks = tasks?.filter((task) => task.time === 'night');

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

    queryClient.setQueryData(taskQueryKeys.getAll(), newTasks);
    toast.success('Tarefa atualizada com sucesso!');
  };

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header subtitle="Minhas Tarefas" title="Minhas Tarefas" />

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator icon={<SunIcon />} text={'Manhã'} />
          {morningTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada no período da manhã.
            </p>
          )}
          {morningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator icon={<SunCloud />} text={'Tarde'} />
          {afternoonTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada no período da tarde.
            </p>
          )}
          {afternoonTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator icon={<MoonIcon />} text={'Noite'} />
          {nightTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada no período da noite.
            </p>
          )}
          {nightTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
