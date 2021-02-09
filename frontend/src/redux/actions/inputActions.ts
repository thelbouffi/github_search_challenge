import { InputAction, SET_SEARCHQUERY } from '../../interfaces/inputTypes';

export const insertSearchQuery = (searchQuery: string): InputAction => {
  return {
    type: SET_SEARCHQUERY,
    payload: searchQuery,
  };
};
