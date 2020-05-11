import React from 'react';
import DeepLink from './DeepLink';
import AddLink from './AddLink';

const Group = (props) => {
  const { group, add, deleteLink } = props;
  const { name, baseLink, links } = group;
  const addLink = (linkName, destination) => {
    add(name, linkName, destination);
  };
  const deleteLinkFromGroup = (linkName) => deleteLink(name, linkName);
  return (
    <React.Fragment>
      <div className="group">
        {links.length
          ? links.map((link) => (
            <DeepLink baseLink={baseLink} {...link} deleteLink={deleteLinkFromGroup} />
          ))
          : <div className="group__empty">Click Add Link Below</div>
        }
      </div>
      <AddLink add={addLink} />
    </React.Fragment>
  );
};

export default Group;
