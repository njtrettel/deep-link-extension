import React from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import DeepLink from './DeepLink';
import AddItem from './AddItem';

const List = ({ baseLink = {}, group, addGroup, deleteGroup, addLink, deleteLink }) => {
  const match = useRouteMatch();

  const addGroupToThisGroup = (name, groupPath = []) => {
    const path = [group.name, ...groupPath];
    return addGroup(name, path);
  };

  const addLinkToThisGroup = (name, destination, groupPath = []) => {
    const path = [group.name, ...groupPath];
    return addLink(name, destination, path);
  };

  const deleteGroupFromThisGroup = (name, groupPath = []) => {
    const path = [group.name, ...groupPath];
    return deleteGroup(name, path);
  };

  const deleteLinkFromThisGroup = (name, groupPath = []) => {
    const path = [group.name, ...groupPath];
    return deleteLink(name, path);
  }

  const normalizePath = (path) => path.replace(/^\/\//, '/');
  const groups = group.groups || [];
  const links = group.links || [];
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={`${match.url}`} render={(rrProps) => (
          <React.Fragment>
            <div className="list">
              {groups.length ? groups.map((group) => {
                const pathname = normalizePath(`${match.url}/${group.name}`);
                return (
                  <Link className="list__item" to={{ pathname }}>
                    {group.name}
                    <i className="fa fa-trash delete-button" onClick={(e) => {
                      e.preventDefault();
                      deleteGroupFromThisGroup(group.name)
                    }} />
                  </Link>
                );
              }) : null}
              {links.length ? links.map((link) => (
                <DeepLink baseLink={baseLink} {...link} deleteLink={deleteLinkFromThisGroup} />
              )) : null}
              {(!groups.length && !links.length) && <div className="list__empty">Click Add Below</div>}
            </div>
            <AddItem
              classes="add-group"
              namePlaceholder="Group name..."
              includeContent={false}
              buttonText="Add Group"
              add={addGroupToThisGroup}
            />
            <AddItem
              classes="add-list"
              namePlaceholder="Link name..."
              contentPlaceholder="Destination..."
              buttonText="Add Link"
              add={addLinkToThisGroup}
            />
          </React.Fragment>
        )} />
        <Route path={normalizePath(`${match.url}/:group`)} render={(rrProps) => {
          const name = rrProps.match.params.group;
          const group = groups.find(g => g.name === name);
          return (
            <List
              baseLink={baseLink}
              group={group}
              addGroup={addGroupToThisGroup}
              deleteGroup={deleteGroupFromThisGroup}
              addLink={addLinkToThisGroup}
              deleteLink={deleteLinkFromThisGroup}
            />
          )
        }} />
      </Switch>
    </React.Fragment>
  )
};

export default List;
