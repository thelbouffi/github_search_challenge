import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { CustomRootStore } from '../../interfaces/storeType';
import {
  SearchAction,
  SearchData,
  GET_DATA,
  SET_LOADING,
  SET_ERROR,
  CLEAR_SEARCH
} from '../../interfaces/searchTypes';

export const getData = (
  queryBody: string,
  type: string | undefined,
): ThunkAction<void, CustomRootStore, null, SearchAction> => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: 'post',
        url: '/api/search',
        data: {
          queryBody,
          type,
        },
      });
      const resData: SearchData = res?.data;
      dispatch({
        type: GET_DATA,
        payload: resData,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.message,
      });
    }
  };
};

export const setLoading = (): SearchAction => {
  return {
    type: SET_LOADING,
  };
};

export const setError = (): SearchAction => {
  return {
    type: SET_ERROR,
    payload: '',
  };
};

export const clearSearch = (): SearchAction => {
  return {
    type: CLEAR_SEARCH,
    payload: null,
  };
};