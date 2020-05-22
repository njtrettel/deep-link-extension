import React from 'react';

const parseDestination = (rawDestination, { variables = {} }) => {
  const variableRegex = /\${(.+?)}/g;
  const split = rawDestination.split('.com');
  const destinationString = split[split.length - 1];
  const destinationVariables = destinationString.match(variableRegex) || [];
  const destination = destinationVariables.reduce((result, variable) => {
    const variableName = variableRegex.exec(variable)[1] || '';
    const value = variables[variableName];
    return result.replace(variable, value);
  }, destinationString);
  return destination;
};

const DeepLink = (props) => {
  const { name, destination: rawDestination, baseLink, deleteLink } = props;
  const destination = parseDestination(rawDestination, baseLink);
  const encodedDestination = encodeURIComponent(destination);
  const url = `${baseLink.link}${encodedDestination}`;
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
