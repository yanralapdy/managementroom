import * as types from '../types';
import axios from 'axios';

export const handleGetCheckins = token => ({
  type: types.GET_CHECKINS,
  payload: axios({
    method: 'GET',
    url: 'https://backend-managementroom.herokuapp.com/api/v1/checkins',
    headers: {
      Authorization: `${token}`,
    },
  }),
});

export const handleCheckIn = (
  token,
  duration,
  order_end_time,
  customer,
  room,
) => ({
  type: types.CHECKINS,
  payload: axios({
    method: 'POST',
    url: 'https://backend-managementroom.herokuapp.com/api/v1/checkin',
    headers: {
      Authorization: `${token}`,
    },
    data: {
      duration,
      is_booked: true,
      is_done: false,
      order_end_time,
      customer,
      room,
    },
  }),
});

export const handleCheckOut = (token, id) => ({
  type: types.CHECKOUT,
  payload: axios({
    method: 'PUT',
    url: `https://backend-managementroom.herokuapp.com/api/v1/checkout/${id}`,
    headers: {
      Authorization: `${token}`,
    },
    data: {is_booked: false, is_done: true},
  }),
});
