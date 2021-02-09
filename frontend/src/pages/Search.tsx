import React, { FC } from 'react';
import { Flex } from 'reflexbox';

import SearchFields from '../components/SearchFields/SearchFields';

const Search: FC = () => {
  return (
    <Flex
      margin="auto"
      as="main"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      flex="1"
    >
      <SearchFields />
    </Flex>
  );
};
export default Search;
