import React from 'react';
import classnames from 'classnames';

const AddLink = (props) => {
  const [adding, setAdding] = React.useState(false);
  const [name, setName] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const onNameChange = (event) => {
    setName(event.target.value);
    setErrors({ ...errors, name: false });
  };
  const onDestinationChange = (event) => {
    setDestination(event.target.value);
    setErrors({ ...errors, destination: false });
  };
  const submit = () => {
    if (!name || !destination) {
      return setErrors({ name: !name, destination: !destination });
    }
    props.add(name, destination);
    setAdding(false);
    setName('');
    setDestination('');
  };

  const nameClasses = classnames('add-item__field', { 'add-item__field--error': errors.name });
  const destinationClasses = classnames('add-item__field', { 'add-item__field--error': errors.destination });
  if (adding) {
    return (
      <div className="add-item add-link">
        <input className={nameClasses} placeholder="Link name..." onChange={onNameChange} />
        <input className={destinationClasses} placeholder="Link destination..." onChange={onDestinationChange} />
        <div className="add-item__actions">
          <button onClick={submit}>Submit</button>
          <button onClick={() => setAdding(false)}>Cancel</button>
        </div>
      </div>
    )
  };
  return (
    <div className="add-item add-link">
      <button className="add-link__button" onClick={() => setAdding(true)}>Add Link +</button>
    </div>
  );
};

export default AddLink;
