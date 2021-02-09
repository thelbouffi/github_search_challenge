import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectDropDownItem,
  toggleDropDownMenu
} from '../../../../redux/actions/dropDownActions';
import { CustomRootStore } from '../../../../interfaces/storeType';

const Item: FC = ({ children }) => {
  const dispatch = useDispatch();
  const myStore = useSelector((state: CustomRootStore) => state);

  const { displayed } = myStore?.dropDown;

  const selectHandler = () => {
    dispatch(selectDropDownItem(children));
    dispatch(toggleDropDownMenu(!displayed));
  };
  
  return <div className="DD-Item" onClick={selectHandler}>{children}</div>;
};

export default Item;
