import * as types from '../types';

const initialState = {
  isLoading: false,
  isError: true,
  rooms: [],
  response: [],
};

export default function reducerRooms(state = initialState, action) {
  switch (action.type) {
    //
    // =================== GET ROOM =================================
    case `${types.GET_ROOMS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${types.GET_ROOMS}_FULFILLED`:
      return {
        ...state,
        rooms: action.payload.data,
        isLoading: false,
      };
    case `${types.GET_ROOMS}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    //
    // =================== ADD ROOM ================================
    case `${types.ADD_ROOMS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${types.ADD_ROOMS}_FULFILLED`:
      return {
        ...state,
        response: action.payload.data,
        isLoading: false,
      };
    case `${types.ADD_ROOMS}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    //
    // =================== EDIT ROOM ================================
    case `${types.UPDATE_ROOMS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${types.UPDATE_ROOMS}_FULFILLED`:
      return {
        ...state,
        response: action.payload.data,
        isLoading: false,
      };
    case `${types.UPDATE_ROOMS}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    //
    //
    // =================== DELETE ROOM ================================
    case `${types.DELETE_ROOMS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${types.DELETE_ROOMS}_FULFILLED`:
      return {
        ...state,
        response: action.payload.data,
        isLoading: false,
      };
    case `${types.DELETE_ROOMS}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    default:
      return state;
  }
}
