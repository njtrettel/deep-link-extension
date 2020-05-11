import React from 'react';
import classnames from 'classnames';

const AddGroup = (props) => {
  const [adding, setAdding] = React.useState(false);
  const [groupName, setGroupName] = React.useState('');
  const [baseLink, setBaseLink] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const onGroupNameChange = (event) => {
    setGroupName(event.target.value);
    setErrors({ ...errors, groupName: false });
  };
  const onBaseLinkChange = (event) => {
    setBaseLink(event.target.value);
    setErrors({ ...errors, baseLink: false });
  };
  const submit = () => {
    if (!groupName || !baseLink) {
      return setErrors({ groupName: !groupName, baseLink: !baseLink });
    }
    props.add(groupName, baseLink);
    setAdding(false);
    setGroupName('');
    setBaseLink('');
  };

  const groupNameClasses = classnames('add-item__field', { 'add-item__field--error': errors.groupName });
  const baseLinkClasses = classnames('add-item__field', { 'add-item__field--error': errors.baseLink });
  if (adding) {
    return (
      <div className="add-item add-group">
        <input className={groupNameClasses} placeholder="Group name..." onChange={onGroupNameChange} />
        <input className={baseLinkClasses} placeholder="Base link..." onChange={onBaseLinkChange} />
        <div className="add-item__actions">
          <button onClick={submit}>Submit</button>
          <button onClick={() => setAdding(false)}>Cancel</button>
        </div>
      </div>
    );
  }
  return (
    <div className="add-item add-group">
      <button className="add-group__button" onClick={() => setAdding(true)}>Add Group +</button>
    </div>
  );
};

export default AddGroup;
