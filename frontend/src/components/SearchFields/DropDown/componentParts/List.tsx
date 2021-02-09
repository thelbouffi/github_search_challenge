import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { CustomRootStore } from '../../../../interfaces/storeType';

import '../DropDown.css';

const List: FC = ({ children }) => {
  const {displayed} = useSelector((state : CustomRootStore) => state.dropDown);

  return displayed ? <div className="DD-List">{children}</div> : null;
};

export default List;
