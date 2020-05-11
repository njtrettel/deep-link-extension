import React from 'react';

const DeepLink = (props) => {
  const { name, destination, baseLink, deleteLink } = props;
  const encodedDestination = encodeURIComponent(destination);
  const url = `${baseLink}${encodedDestination}`;
  return (
    <div className="deep-link">
      <a target="_blank" href={url}>{name}</a>
      <i className="fa fa-trash delete-button" onClick={(e) => {
        e.preventDefault();
        deleteLink(name);
      }} />
    </div>
  );
};

export default DeepLink;
