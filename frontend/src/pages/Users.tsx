import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import { Flex } from 'reflexbox';
// import { debounce } from '../helpers';

import SearchFields from '../components/SearchFields/SearchFields';
import UserDetails from '../components/UserDetails';
import Alert from '../components/Alert';

import { CustomRootStore } from '../interfaces/storeType';
import { getData, setLoading, clearSearch, setError } from '../redux/actions/searchActions';
import { insertSearchQuery } from '../redux/actions/inputActions';

const Users: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const myStore = useSelector((state: CustomRootStore) => state);
  const { data, loading, error } = myStore?.search;
  const { slectedType } = myStore?.dropDown;
  const { searchQuery } = myStore?.input;
  const items = data?.results?.data?.items ?? [];

  useEffect(() => {
    const typeqr = slectedType?.toString();
    if (searchQuery?.length >= 3 && typeqr) {
      // const innerFunction = debounce(
      //   (dispatch) => setTimeout(() => dispatch(getData(searchQuery, typeqr)), 500),
      //   1000,
      // );
      // const asyncActionDebounced = () => innerFunction;

      // asyncActionDebounced();
      dispatch(setLoading());
      dispatch(getData(searchQuery, typeqr));
    }
    if (searchQuery.length < 3) {
      dispatch(clearSearch());
      history.push('/');
    }
  }, [slectedType, searchQuery, history]);

  return (
    <Flex flexDirection="column" alignItems="flex-start" flex="1">
      <SearchFields />
      {loading && !error ? (
        <div>
          <h1>Loading ...</h1>
        </div>
      ) : (
        <Flex flexDirection="row" alignItems="center" width="100%" flexWrap="wrap">
          {items.map((i, key) => {
            return <UserDetails userDetails={i} key={key} />;
          })}
        </Flex>
      )}

      {error && (
        <Alert
          message={error}
          onClick={() => {
            dispatch(setError());
            dispatch(insertSearchQuery(''));
            history.push('/');
          }}
        />
      )}
    </Flex>
  );
};
export default withRouter(Users);
