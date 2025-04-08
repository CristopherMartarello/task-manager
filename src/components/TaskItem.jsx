import CheckIcon from '../assets/icons/check.svg?react';
import LoaderIcon from '../assets/icons/loader-circle.svg?react';
import LinkIcon from '../assets/icons/link.svg?react';
import TrashIcon from '../assets/icons/trash.svg?react';
import Button from './Button';

const TaskItem = ({ task, handleCheckboxClick, handleDeleteClick }) => {
  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-[#00ADB5] text-[#002C2E]';
    }

    if (task.status === 'in_progress') {
      return 'bg-[#FFAA04] text-[#FFAA04]';
    }

    if (task.status === 'not_started') {
      return 'bg-[#35383E] bg-opacity-10 text-[#35383E]';
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm ${getStatusClasses()} transition`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === 'done'}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleCheckboxClick(task.id)}
          />
          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderIcon className="text-brand-white animate-spin" />
          )}
        </label>
        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          icon={<TrashIcon />}
          onClick={() => handleDeleteClick(task.id)}
        />

        <a href="#" className="transition hover:opacity-75">
          <LinkIcon />
        </a>
      </div>
    </div>
  );
};

export default TaskItem;
