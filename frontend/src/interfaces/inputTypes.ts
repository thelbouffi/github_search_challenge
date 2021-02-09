export const SET_SEARCHQUERY = 'SET_SEARCHQUERY';

export interface SerchQueryAction {
  type: typeof SET_SEARCHQUERY;
  payload: string;
}

export type InputAction = SerchQueryAction;

export interface InputState {
  searchQuery: string;
}
