import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BackButton from './BackButton';

const NavBar = (props) => {
  return (
    <div className="nav-bar" style={{ backgroundColor: props.color }}>
      <Switch>
        <Route exact path="/" render={() => <div className="nav-bar__title">Groups</div>} />
        <Route exact path="/:group" render={(rrProps) => {
          const groupName = rrProps.match.params.group;
          return (
            <React.Fragment>
              <BackButton />
              <div className="nav-bar__title nav-bar__title--group">{groupName}</div>
            </React.Fragment>
          );
        }} />
      </Switch>
    </div>
  );
};

export default NavBar;
