import React from 'react';
import classnames from 'classnames';

const AddItem = (props) => {
  const {
    add,
    namePlaceholder = 'Name...',
    contentPlaceholder = 'Content...',
    buttonText = 'Add',
    nameRequired = true,
    contentRequired = true
  } = props;
  const [adding, setAdding] = React.useState(false);
  const [name, setName] = React.useState('');
  const [content, setContent] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const onNameChange = (event) => {
    setName(event.target.value);
    setErrors({ ...errors, name: false });
  };
  const onContentChange = (event) => {
    setContent(event.target.value);
    setErrors({ ...errors, content: false });
  };
  const validateName = () => nameRequired ? !!name : true;
  const validateContent = () => contentRequired ? !!content : true;
  const submit = () => {
    if (!validateName() || !validateContent()) {
      return setErrors({ name: !validateName(), content: !validateContent() });
    }
    add(name, content);
    setAdding(false);
    setName('');
    setContent('');
  };

  const nameClasses = classnames('add-item__field', { 'add-item__field--error': errors.name });
  const contentClasses = classnames('add-item__field', { 'add-item__field--error': errors.content });
  return (
    <div className="add-item">
      {adding ? (
        <React.Fragment>
          <input className={nameClasses} placeholder={namePlaceholder} onChange={onNameChange} />
          <input className={contentClasses} placeholder={contentPlaceholder} onChange={onContentChange} />
          <div className="add-item__actions">
            <button onClick={submit}>Submit</button>
            <button onClick={() => setAdding(false)}>Cancel</button>
          </div>
        </React.Fragment>
      ) : <button className="add-list__button" onClick={() => setAdding(true)}>{buttonText}</button>}
    </div>
  );
}

export default AddItem;
