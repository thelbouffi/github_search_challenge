import React, { FC } from 'react';
import { Flex } from 'reflexbox';
import './UserDetails.css';
import { UserItem } from '../../interfaces/searchTypes';
type Props = {
  userDetails: UserItem;
};

const UserDetails: FC<Props> = ({ userDetails }) => {
  const { login, avatar_url, html_url } = userDetails;

  return (
    <div style={{margin:'10px'}}>
    <Flex flexDirection="column" className="UD-Card">
      <Flex as="div" flexDirection="column" justifyContent="space-between">
        <Flex flexDirection="row" justifyContent="space-between">
          <a href={html_url}>
            <img src={avatar_url} alt={login} height="300px" width="300px" />
          </a>
        </Flex>
        <Flex flexDirection="row" justifyContent="space-between" className="UD-description">
          {login}
        </Flex>
      </Flex>
    </Flex>
    </div>
  );
};

export default UserDetails;
