import React from 'react';

function ErrorAlert(props) {
  return <div className="text-danger">{props.children}</div>;
}

export default ErrorAlert;
