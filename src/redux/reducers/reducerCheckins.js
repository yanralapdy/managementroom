import * as types from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  checkins: [],
  response: [],
};

export default function reducerCheckins(state = initialState, action) {
  switch (action.type) {
    //
    // =================== GET CHECKINS =================================
    case `${types.GET_CHECKINS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${types.GET_CHECKINS}_FULFILLED`:
      return {
        ...state,
        checkins: action.payload.data,
        isLoading: false,
      };
    case `${types.GET_CHECKINS}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    //
    // =================== CHECKINS ================================
    case `${types.CHECKINS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${types.CHECKINS}_FULFILLED`:
      return {
        ...state,
        response: action.payload.data,
        isLoading: false,
      };
    case `${types.CHECKINS}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    //
    // =================== CheckOut ================================
    case `${types.CHECKOUT}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${types.CHECKOUT}_FULFILLED`:
      return {
        ...state,
        response: action.payload.data,
        isLoading: false,
      };
    case `${types.CHECKOUT}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    default:
      return state;
  }
}
