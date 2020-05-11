import React from 'react';
import { Link } from 'react-router-dom';
import AddItem from './AddItem';

const GroupsList = ({ groups, addGroup, deleteGroup }) => {
  return (
    <React.Fragment>
      <div className="groups-list">
        {groups.length ? groups.map((group) => (
          <Link className="groups-list__item" to={{ pathname: `/${group.name}` }}>
            {group.name}
            <i className="fa fa-trash delete-button" onClick={(e) => {
              e.preventDefault();
              deleteGroup(group.name)
            }} />
          </Link>
        )) : <div className="groups-list__empty">Click Add Group Below</div>}
      </div>
      <AddItem
        namePlaceholder="Group name..."
        contentPlaceholder="Base link..."
        buttonText="Add Group"
        add={addGroup}
      />
    </React.Fragment>
  );
};

export default GroupsList;
