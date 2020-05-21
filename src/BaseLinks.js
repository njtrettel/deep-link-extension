import React from 'react';
import classnames from 'classnames';
import AddItem from './AddItem';

const BaseLinks = ({ baseLinks = [], selectedBaseLink, setSelectedBaseLink, addBaseLink }) => {
  return (
    <div className="base-links">
      {baseLinks.map((link, i) => {
        const isSelected = selectedBaseLink === i;
        const classes = classnames('base-links__link', { 'base-links__link--selected': isSelected });
        return (
          <button className={classes} onClick={() => setSelectedBaseLink(i)}>
            {link.name}
          </button>
        );
      })}
      <AddItem buttonText="+" classes="add-base-link" add={addBaseLink} />
    </div>
  );
};

export default BaseLinks;
