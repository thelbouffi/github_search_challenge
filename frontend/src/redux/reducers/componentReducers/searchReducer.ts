import { SearchState, SearchAction, GET_DATA, SET_LOADING, SET_ERROR, CLEAR_SEARCH } from '../../../interfaces/searchTypes';

const initialState: SearchState = {
  data: null,
  loading: false,
  error: '',
};

const serachReducer = (state = initialState, action: SearchAction): SearchState => {
  switch(action.type) {
    case GET_DATA:
      return {
        data: action.payload,
        loading: false,
        error: '',
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ERROR: 
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        data: null ,
      };
    default: 
      return state;
  }
};

export default serachReducer;