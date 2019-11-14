import * as types from './../types';

const initialState = {
  todos: [],
};

export default function reducerTodos(state = initialState, action) {
  switch (action.type) {
    case types.GET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case types.ADD_TODOS:
      state.todos.push(action.payload);
      return {
        ...state,
      };
    case types.UPDATE_TODOS:
      const index = state.todos.findIndex(
        item => item.id === action.payload.id,
      );
      state.todos[index] = action.payload;
      return {
        ...state,
      };
    case types.DELETE_TODOS:
      const deleteData = state.todos.filter(
        item => item.id !== action.payload.id,
      );
      console.log(deleteData);
      return {
        ...state,
        todos: deleteData,
      };
    default:
      return state;
  }
}
