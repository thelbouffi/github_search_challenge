import { ReactNode } from 'react';
export const SET_DROPDOWNMENU = 'SET_DROPDOWNMENU';
export const TOGGLE_DROPDOWNMENU = 'TOGGLE_DROPDOWNMENU';

export interface SetDropDownItemAction {
  type: typeof SET_DROPDOWNMENU;
  payload: string | ReactNode;
}

export interface ToggleAction {
  type: typeof TOGGLE_DROPDOWNMENU;
  payload: boolean;
}

export type DropAction = SetDropDownItemAction | ToggleAction;

export interface DropState {
  slectedType: string | ReactNode;
  displayed: boolean;
}
