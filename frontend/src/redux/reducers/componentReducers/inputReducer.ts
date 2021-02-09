import {
    InputAction,
    SET_SEARCHQUERY,
    InputState
  } from '../../../interfaces/inputTypes';
  
  const initialState: InputState = {
    searchQuery: '',
  };
  
  const inputReducer = (state = initialState, action: InputAction): InputState => {
    switch (action.type) {
      case SET_SEARCHQUERY:
        return {
          ...state,
          searchQuery: action.payload,
        };
        
      default:
        return state;
    }
  };
  
  export default inputReducer;
  