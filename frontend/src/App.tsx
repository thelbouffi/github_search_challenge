import { FC } from 'react';
import { Router, Switch, Route} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Flex } from 'reflexbox';
import Search from './pages/Search';
import Users from './pages/Users';
import Repos from './pages/Repos';

const history = createBrowserHistory();

const App: FC = () => {
  return (
    <Router history={history}>
    <Flex as="main" flex={1} flexDirection="column" padding="50px">
      <Switch>
        <Route exact component={Search} path="/" />
        <Route component={Users} path="/users" />
        <Route component={Repos} path="/repos" />
      </Switch>
    </Flex>
    </Router>
  );
};

export default App;
