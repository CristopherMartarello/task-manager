import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '../../lib/axios';

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: 'add-task',
    mutationFn: async (newTask) => {
      const { data: createdTask } = await api.post('/tasks', newTask);
      return createdTask;
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData('tasks', (currentTasks) => {
        return [...currentTasks, createdTask];
      });
    },
  });
};
