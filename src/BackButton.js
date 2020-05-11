import React from 'react';
import { useHistory } from 'react-router-dom';

const BackButton = () => {
  const history = useHistory();
  return <span className="back-button" onClick={() => history.goBack()}>&#x25C4;</span>
};

export default BackButton;
