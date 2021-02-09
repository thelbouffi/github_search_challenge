import React, { FC } from 'react';
import { Flex } from 'reflexbox';
import './RepoDetails.css';
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  repoDetails: any;
};

const RepoDetails: FC<Props> = ({ repoDetails }) => {
  const { full_name, owner, description, html_url } = repoDetails;

  return (
    <div style={{ margin: '10px' }}>
      <Flex flexDirection="column" className="UD-Card">
        <Flex as="div" flexDirection="column" justifyContent="space-between">
          <Flex flexDirection="row" justifyContent="space-between" className="UD-description">
            <Flex flexDirection="column">
              Repo: <a href={html_url}>{full_name}</a>
            </Flex>
            <Flex flexDirection="column">Owner: {owner?.login}</Flex>
          </Flex>
          <Flex flexDirection="row" justifyContent="space-between">
            <h5>{description}</h5>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default RepoDetails;
