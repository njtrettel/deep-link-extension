import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BackButton from './BackButton';

const exists = a => !!a;

const NavBar = (props) => {
  return (
    <div className="nav-bar" style={{ backgroundColor: props.color }}>
      <Switch>
        <Route exact path="/" render={() => <div className="nav-bar__title">Groups</div>} />
        <Route path="/:group" render={(rrProps) => {
          const groups = rrProps.location.pathname.split('/').filter(exists);
          const groupName = groups.join(' - ');
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
