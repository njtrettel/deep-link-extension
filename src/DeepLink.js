import React from 'react';

const parseDestination = (rawDestination) => {
  const split = rawDestination.split('.com');
  return split[split.length - 1];
};

const DeepLink = (props) => {
  const { name, destination: rawDestination, baseLink, deleteLink } = props;
  const destination = parseDestination(rawDestination);
  const encodedDestination = encodeURIComponent(destination);
  const url = `${baseLink}${encodedDestination}`;
  return (
    <div className="deep-link">
      <a target="_blank" rel="noopener noreferrer" href={url}>{name}</a>
      <i className="fa fa-trash delete-button" onClick={(e) => {
        e.preventDefault();
        deleteLink(name);
      }} />
    </div>
  );
};

export default DeepLink;
