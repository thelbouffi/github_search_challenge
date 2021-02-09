import React, { FC, ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Flex } from 'reflexbox';
import DropDown from './DropDown';
import './SearchFields.css';
import { CustomRootStore } from '../../interfaces/storeType';
import { insertSearchQuery } from '../../redux/actions/inputActions';

const SearchFields: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const myStore = useSelector((state: CustomRootStore) => state);
  const { slectedType } = myStore?.dropDown;
  const { searchQuery } = myStore?.input;

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const serachqr = e.currentTarget.value;
    dispatch(insertSearchQuery(serachqr));
  };

  useEffect(() => {
    const typeqr = slectedType?.toString();
    if (searchQuery.length >= 3) {
      if (typeqr === 'Users') {
        history.push('/users');
      }
      if (typeqr === 'Repositories') {
        history.push('/repos');
      }
    }
  }, [slectedType, searchQuery, history]);

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="row" marginBottom="15px">
        <svg
          height="32"
          viewBox="0 0 16 16"
          version="1.1"
          width="32"
          style={{ width: '40px', height: '40px' }}
        >
          <path
            fillRule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          ></path>
        </svg>
        <Flex flexDirection="column" marginLeft="10px">
          <p className="SF-Title">GitHub Searcher</p>
          <p className="SF-SubTitle">Search users or repositories below</p>
        </Flex>
      </Flex>
      <Flex flexDirection="row">
        <input
          placeholder="Start typing to search ..."
          onChange={changeHandler}
          className="SF-Input"
          value={searchQuery}
          autoFocus
        />
        <DropDown items={['Users', 'Repositories']} />
      </Flex>
    </Flex>
  );
};

export default SearchFields;
