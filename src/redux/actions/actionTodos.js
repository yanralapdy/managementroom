import * as types from './../types';

export const handleGetTodos = () => ({
  type: types.GET_TODOS,
  payload: [
    {
      id: 1,
      name: 'Shuhua',
      description: 'Uri Yoshin',
    },
  ],
});
export const handleAddTodos = params => ({
  type: types.ADD_TODOS,
  payload: params,
});
export const handleUpdateTodos = params => ({
  type: types.UPDATE_TODOS,
  payload: params,
});
export const handleDeleteTodos = params => ({
  type: types.DELETE_TODOS,
  payload: params,
});
