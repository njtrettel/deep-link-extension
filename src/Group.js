import React from 'react';
import DeepLink from './DeepLink';
import AddItem from './AddItem';

const Group = (props) => {
  const { group, addLinkToGroup, deleteLinkFromGroup } = props;
  const { name, baseLink, links } = group;
  const addLink = (linkName, destination) => {
    addLinkToGroup(name, linkName, destination);
  };
  const deleteLink = (linkName) => deleteLinkFromGroup(name, linkName);
  return (
    <React.Fragment>
      <div className="group">
        {links.length ? links.map((link) => (
          <DeepLink baseLink={baseLink} {...link} deleteLink={deleteLink} />
        )) : <div className="group__empty">Click Add Link Below</div>}
      </div>
      <AddItem
        namePlaceholder="Link name..."
        contentPlaceholder="Link destination..."
        buttonText="Add Link"
        add={addLink}
      />
    </React.Fragment>
  );
};

export default Group;
