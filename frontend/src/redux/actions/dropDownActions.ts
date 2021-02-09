import { ReactNode } from 'react';
import { DropAction } from '../../interfaces/dropDownTypes';
import { SET_DROPDOWNMENU, TOGGLE_DROPDOWNMENU } from '../../interfaces/dropDownTypes';

export const selectDropDownItem = (item: string | ReactNode): DropAction => {
  return {
    type: SET_DROPDOWNMENU,
    payload: item,
  };
};

export const toggleDropDownMenu = (dispaly: boolean): DropAction => {
  return {
    type: TOGGLE_DROPDOWNMENU,
    payload: dispaly,
  };
};