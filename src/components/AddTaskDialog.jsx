import './AddTaskDialog.css';

import PropTypes from 'prop-types';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'sonner';
import { v4 } from 'uuid';

import { LoaderIcon } from '../assets/icons';
import { useAddTask } from '../hooks/data/use-add-task';
import Button from './Button';
import Input from './Input';
import TimeSelect from './TimeSelect';

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const { mutate: addTask } = useAddTask();
  const nodeRef = useRef();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {},
  });

  const handleSaveClick = async (data) => {
    const newTask = {
      id: v4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: 'not_started',
    };

    addTask(newTask, {
      onSuccess: () => {
        handleClose();
        reset({
          title: '',
          time: 'morning',
          description: '',
        });
      },
      onError: () => toast.error('Erro ao adicionar tarefa'),
    });
  };

  const handleCancelClick = () => {
    handleClose();
    reset({
      title: '',
      time: 'morning',
      description: '',
    });
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <form
              onSubmit={handleSubmit(handleSaveClick)}
              className="rounded-xl bg-white p-5 text-center shadow"
            >
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova tarefa
              </h2>
              <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder={'Insira o título da tarefa'}
                  error={errors?.title}
                  disabled={isSubmitting}
                  {...register('title', {
                    required: 'O título é obrigatório.',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'O título não pode ser vazio.';
                      }
                    },
                  })}
                />

                <TimeSelect
                  error={errors?.time}
                  disabled={isSubmitting}
                  {...register('time', {
                    required: 'O período é obrigatório.',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'O período não pode ser vazio.';
                      }
                      return true;
                    },
                  })}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder={'Descreva a tarefa'}
                  error={errors?.description}
                  disabled={isSubmitting}
                  {...register('description', {
                    required: 'A descrição é obrigatória.',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'A descrição não pode ser vazia.';
                      }
                      return true;
                    },
                  })}
                />

                <div className="flex gap-3">
                  <Button
                    text={'Cancelar'}
                    size="large"
                    className="w-full"
                    color="default"
                    onClick={handleCancelClick}
                    type="button"
                  />
                  <Button
                    text={'Salvar'}
                    size="large"
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                    startIcon={
                      isSubmitting && <LoaderIcon className="animate-spin" />
                    }
                  />
                </div>
              </div>
            </form>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
};

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default AddTaskDialog;
