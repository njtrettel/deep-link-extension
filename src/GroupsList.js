import React from 'react';
import { Link } from 'react-router-dom';

const GroupsList = ({ groups, deleteGroup }) => {
  return (
    <div className="groups-list">
      {groups.length
        ? groups.map((group) => (
          <Link className="groups-list__item" to={{ pathname: `/${group.name}` }}>
            {group.name}
            <i className="fa fa-trash delete-button" onClick={(e) => {
              e.preventDefault();
              deleteGroup(group.name)
            }} />
          </Link>
        ))
        : <div className="groups-list__empty">Click Add Group Below</div>
      }
    </div>
  );
};

export default GroupsList;
