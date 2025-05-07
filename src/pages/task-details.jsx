import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from '../assets/icons';
import Button from '../components/Button';
import Input from '../components/Input';
import Sidebar from '../components/Sidebar';
import TimeSelect from '../components/TimeSelect';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const [saveIsLoading, setSaveIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const titleRef = useRef();
  const timeRef = useRef();
  const descriptionRef = useRef();

  const handleSaveClick = async () => {
    const newErrors = [];
    const title = titleRef.current.value;
    const time = timeRef.current.value;
    const description = descriptionRef.current.value;

    if (!title.trim()) {
      newErrors.push({
        inputName: 'title',
        message: 'O título é obrigatório.',
      });
    }

    if (!time.trim()) {
      newErrors.push({
        inputName: 'time',
        message: 'O horário é obrigatório.',
      });
    }

    if (!description.trim()) {
      newErrors.push({
        inputName: 'description',
        message: 'A descrição é obrigatória.',
      });
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      return;
    }

    const newTask = {
      title,
      time,
      description,
    };

    // Chamar API para atualizar tarefa
    setSaveIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      setSaveIsLoading(false);
      return toast.error('Erro ao atualizar a tarefa, tente novamente.');
    }

    const updatedTask = await response.json();
    setTask(updatedTask);
    setSaveIsLoading(false);
    toast.success('Tarefa atualizada com sucesso!');
  };

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return toast.error('Ocorreu um erro ao deletar a tarefa.');
    }

    toast.success('Tarefa deletada com sucesso!');
    navigate(-1);
  };

  const titleError = errors.find((error) => error.inputName === 'title');
  const timeError = errors.find((error) => error.inputName === 'time');
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  );

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      });

      const data = await response.json();
      setTask(data);
    };

    fetchTask();
  }, [taskId]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        {/* barra do topo */}
        <div className="flex w-full justify-between">
          {/* esquerda */}
          <div>
            <button
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
              onClick={handleBackClick}
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <Link className="cursor-pointer text-brand-text-gray" to={'/'}>
                Minhas tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          {/* direita */}
          <Button
            text={'Deletar tarefa'}
            className="h-fit self-end"
            startIcon={<TrashIcon className="text-white" />}
            color="danger"
            onClick={handleDeleteClick}
          />
        </div>

        {/* dados da tarefa */}
        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              id="title"
              label="Título"
              ref={titleRef}
              defaultValue={task?.title}
              error={titleError}
            />
          </div>
          <div>
            <TimeSelect
              ref={timeRef}
              defaultValue={task?.time}
              error={timeError}
            />
          </div>
          <div>
            <Input
              id="description"
              label="Descrição"
              ref={descriptionRef}
              defaultValue={task?.description}
              error={descriptionError}
            />
          </div>
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button
            startIcon={saveIsLoading && <LoaderIcon className="animate-spin" />}
            disabled={saveIsLoading}
            color="primary"
            text={'Salvar'}
            size="large"
            onClick={handleSaveClick}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
