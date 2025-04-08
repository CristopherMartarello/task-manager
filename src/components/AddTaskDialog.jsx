import './AddTaskDialog.css';

import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Button from './Button';
import Input from './Input';
import InputLabel from './InputLabel';

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const nodeRef = useRef();

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
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-[#35383E]">
                Nova tarefa
              </h2>
              <p className="mb-4 mt-1 text-sm text-[#9A9C9F]">
                Insira as informações abaixo
              </p>

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder={'Insira o título da tarefa'}
                />
                <div className="flex flex-col gap-1 text-left">
                  <InputLabel htmlFor="time">Horário</InputLabel>
                  <select
                    id="time"
                    className="rounded-lg border border-solid px-4 py-3 text-sm outline-[#00ADB5] placeholder:text-[#9A9C9F]"
                  >
                    <option value="morning">Manhã</option>
                    <option value="afternoon">Tarde</option>
                    <option value="night">Noite</option>
                  </select>
                </div>
                <Input
                  id="description"
                  label="Descrição"
                  placeholder={'Descreva a tarefa'}
                />
                <div className="flex gap-3">
                  <Button
                    text={'Cancelar'}
                    size="large"
                    className="w-full"
                    variant="default"
                    onClick={handleClose}
                  />
                  <Button text={'Salvar'} size="large" className="w-full" />
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
};

export default AddTaskDialog;
