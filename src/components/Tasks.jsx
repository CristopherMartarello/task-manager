import Button from './Button';
import AddIcon from '../assets/icons/add.svg?react';
import TrashIcon from '../assets/icons/trash.svg?react';
import SunIcon from '../assets/icons/sun.svg?react';
import SunCloud from '../assets/icons/cloud-sun.svg?react';
import Moon from '../assets/icons/moon.svg?react';
import TasksSeparator from './TasksSeparator';

const Tasks = () => {
  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00AD85]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button
            text={'Limpar tarefas'}
            icon={<TrashIcon />}
            variant="secondary"
          />
          <Button text={'Nova tarefa'} icon={<AddIcon />} variant="primary" />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator icon={<SunIcon />} text={'Manhã'} />
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator icon={<SunCloud />} text={'Tarde'} />
        </div>

        <div className="space-y-3">
          <TasksSeparator icon={<Moon />} text={'Noite'} />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
