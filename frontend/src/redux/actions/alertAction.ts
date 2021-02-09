import { SET_ALERT, AlertAction } from '../../interfaces/alertTypes';

export const setAlert = (message: string): AlertAction => {
  return {
    type: SET_ALERT,
    payload: message,
  };
};
