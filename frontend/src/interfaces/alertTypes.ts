export const SET_ALERT = 'SET_ALERT';

export interface AlertAction {
  type: typeof SET_ALERT;
  payload: string;
}

export interface AlertState {
  message: string;
}
