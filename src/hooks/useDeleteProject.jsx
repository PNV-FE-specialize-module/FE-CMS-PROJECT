import { useMutation } from 'react-query';

const deleteProject = async (projectId) => {
  const response = await fetch(`/api/projects/${projectId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error deleting project');
  }

  return response.json();
};

const useDeleteProject = () => {
  return useMutation(deleteProject);
};

export { useDeleteProject };
