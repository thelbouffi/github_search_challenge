import React, { FC } from 'react';
import Item from './componentParts/Item';
import List from './componentParts/List';
import Toggle from './componentParts/Toggle';
type Props = {
  items: Array<string>;
}

const DropDown: FC<Props> = ({items}) => {
  return (
    <div>
      <Toggle />
      <List>
        {items?.map((itm, idx) => <Item key={idx}>{itm}</Item>)}
      </List>
    </div>
  );
};

export default DropDown;
