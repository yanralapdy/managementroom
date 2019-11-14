import * as types from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  cust: [],
  resp: [],
};

export default function reducerCustomers(state = initialState, action) {
  switch (action.type) {
    //
    //Get All Customer
    case `${types.GET_CUST}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${types.GET_CUST}_FULFILLED`:
      return {
        ...state,
        cust: action.payload.data,
        isLoading: false,
      };
    case `${types.GET_CUST}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    //
    //Add a new Customer
    case `${types.ADD_CUST}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${types.ADD_CUST}_FULFILLED`:
      return {
        ...state,
        resp: action.payload.data,
        isLoading: false,
      };
    case `${types.ADD_CUST}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    //
    //Update Customer Information
    case `${types.UPDATE_CUST}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${types.UPDATE_CUST}_FULFILLED`:
      return {
        ...state,
        resp: action.payload.data,
        isLoading: false,
      };
    case `${types.UPDATE_CUST}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    //
    //Delete Customer Information
    case `${types.DELETE_CUST}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${types.DELETE_CUST}_FULFILLED`:
      return {
        ...state,
        resp: action.payload.data,
        isLoading: false,
      };
    case `${types.DELETE_CUST}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    default:
      return state;
  }
}
