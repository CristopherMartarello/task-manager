import Button from './Button';
import AddIcon from '../assets/icons/add.svg?react';
import TrashIcon from '../assets/icons/trash.svg?react';

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
    </div>
  );
};

export default Tasks;
