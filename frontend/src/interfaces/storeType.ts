import {DropState } from './dropDownTypes';
import {SearchState } from './searchTypes';
import {AlertState } from './alertTypes';
import {InputState } from './inputTypes';
export interface CustomRootStore {
  search: SearchState;
  alert: AlertState;
  dropDown: DropState;
  input: InputState;
}
