import React from 'react';
import classnames from 'classnames';
import AddItem from './AddItem';

const AddBaseLinkVariable = (props) => {
  const [name, setName] = React.useState('');
  const [value, setValue] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const onNameChange = (event) => {
    setName(event.target.value)
    setErrors({ ...errors, name: null });
  };
  const onValueChange = (event) => {
    setValue(event.target.value);
    setErrors({ ...errors, value: null });
  };
  const submit = () => {
    const validName = !!name;
    const validValue = !!value;
    if (!validName || !validValue) {
      return setErrors({ name: !validName, value: !validValue });
    }
    props.add(name, value);
    setName('');
    setValue('');
  };
  const nameClasses = classnames('add-base-link__field', { 'add-base-link__field--error': errors.name });
  const valueClasses = classnames('add-base-link__field', { 'add-base-link__field--error': errors.value });
  return (
    <div className="add-base-link__field-group">
      <input className={nameClasses} placeholder="Variable Name..." value={name} onChange={onNameChange} />
      <input className={valueClasses} placeholder="Value..." value={value} onChange={onValueChange} />
      <button className="add-base-link__submit" onClick={submit}>Add Variable</button>
    </div>
  );
};

const AddBaseLink = ({ add, close }) => {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const [variables, setVariables] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const onNameChange = (event) => {
    setName(event.target.value);
    setErrors({ ...errors, name: null });
  };
  const onLinkChange = (event) => {
    setLink(event.target.value);
    setErrors({ ...errors, link: null });
  }
  const addVariable = (key, value) => setVariables({ ...variables, [key]: value });
  const submit = () => {
    const validName = !!name;
    const validLink = !!link;
    if (!validName || !validLink) {
      return setErrors({ name: !validName, link: !validLink });
    }
    add(name, link, variables);
    setName('');
    setLink('');
    setVariables([]);
  };

  const nameClasses = classnames('add-base-link__field', { 'add-base-link__field--error': errors.name });
  const linkClasses = classnames('add-base-link__field', { 'add-base-link__field--error': errors.link });
  return (
    <div className="add-base-link">
      <i className="add-base-link__close fa fa-close" onClick={close} />
      <h3>New Base Link</h3>
      <input className={nameClasses} placeholder="Name..." onChange={onNameChange} />
      <input className={linkClasses} placeholder="Link..." onChange={onLinkChange} />
      {Object.keys(variables).map((key) => {
        const value = variables[key] || '';
        return (
          <div className="add-base-link__group">
            <span>{key}</span>: <span>{value}</span>
          </div>
        );
      })}
      <AddBaseLinkVariable add={addVariable} />
      <button className="add-base-link__submit" onClick={submit}>Add Base Link</button>
    </div>
  );
};

const BaseLinks = ({ baseLinks = [], selectedBaseLink, setSelectedBaseLink, addBaseLink }) => {
  const [adding, setAdding] = React.useState(false);
  const close = () => setAdding(false);
  const addBaseLinkAndClose = (...baseLink) => {
    close();
    addBaseLink(...baseLink);
  };
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
      <button className="base-links__add" onClick={() => setAdding(true)}>+</button>
      {adding ? (
        <AddBaseLink add={addBaseLinkAndClose} close={close} />
      ) : null}
    </div>
  );
};

export default BaseLinks;
