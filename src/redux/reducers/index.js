import {combineReducers} from 'redux';
import {createNavigationReducer} from 'react-navigation-redux-helpers';

import reducerTodos from './../reducers/reducerTodos';
import reducerRooms from './reducerRooms';
import reducerLogin from './reducerLogin';
import reducerCust from './reducerCust';
import reducerCheckin from './reducerCheckins';
import MainNav from './../../navigation/MainNav';

const reducerRouter = createNavigationReducer(MainNav);

const appReducer = combineReducers({
  router: reducerRouter,
  rooms: reducerRooms,
  checkins: reducerCheckin,
  todos: reducerTodos,
  cust: reducerCust,
  login: reducerLogin,
});

export default appReducer;
