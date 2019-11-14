import * as types from '../types';
import axios from 'axios';

export const handleGetRooms = token => ({
  type: types.GET_ROOMS,
  payload: axios({
    method: 'GET',
    url: 'http://192.168.0.44:5000/api/v1/rooms',
    headers: {
      Authorization: `${token}`,
    },
  }),
});
export const handleGetCust = token => ({
  type: types.GET_CUST,
  payload: axios({
    method: 'GET',
    url: 'http://192.168.0.44:5000/api/v1/customers',
    headers: {
      Authorization: `${token}`,
    },
  }),
});
export const handleGetEps = id => ({
  type: types.GET_EPS,
  payload: axios.get(
    `https://webtoon-backend.herokuapp.com/api/v1/webtoon/${id}/episodes`,
  ),
});
export const handleGetImg = (id, idImg) => ({
  type: types.GET_IMG,
  payload: axios.get(
    `https://webtoon-backend.herokuapp.com/api/v1/webtoon/${id}/episode/${idImg}`,
  ),
});
export const handleGetMyCreation = params => ({
  type: types.GET_MYCREATION,
  payload: axios({
    method: 'get',
    url: `https://webtoon-backend.herokuapp.com/api/v1//user/${
      params.userid
    }/webtoons`,
    headers: {
      Authorization: `${params.token}`,
    },
  }),
});

export const handleAddWebtoons = params => ({
  type: types.ADD_WEBTOONS,
  payload: params,
});
export const handleUpdateWebtoons = params => ({
  type: types.UPDATE_WEBTOONS,
  payload: params,
});
export const handleDeleteWebtoons = params => ({
  type: types.DELETE_WEBTOONS,
  payload: params,
});
