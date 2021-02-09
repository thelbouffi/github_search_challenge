import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleDropDownMenu } from '../../../../redux/actions/dropDownActions';
import { CustomRootStore } from '../../../../interfaces/storeType';

import '../DropDown.css';

const Toggle: FC = () => {
  const { displayed, slectedType } = useSelector((state: CustomRootStore) => state.dropDown);
  const dispatch = useDispatch();

  const toggleHandler = () => {
    dispatch(toggleDropDownMenu(!displayed));
  };

  return (
    <div className="DD-Toggle" onClick={toggleHandler}>
      <span>{slectedType}</span>
      {displayed ? (
        <svg data-name="Layer 1" viewBox="0 0 24 24" style={ {height: '12px'}}>
          <path
            fill="none"
            stroke="#4d4d4d"
            strokeLinejoin="round"
            d="M2 16.81l9.873-9.873L22 17.063"
          />
          <path fill="none" d="M0 0h24v24H0z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" style={ {height: '12px'}}>
          <path
            fill="none"
            stroke="#4d4d4d"
            strokeLinejoin="round"
            d="M22 7.19l-9.873 9.873L2 6.937"
          />
          <path fill="none" d="M0 0h24v24H0z" />
        </svg>
      )}
    </div>
  );
};

export default Toggle;
