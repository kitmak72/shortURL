import React, { useState } from 'react';

function UrlResult({ short }) {
  const [copyBtn, setCopyBtn] = useState({
    style: 'btn btn-success',
    value: 'Copy'
  });

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(short).then(
      () => {
        setCopyBtn({ style: 'btn btn-warning', value: 'Copied' });
        setTimeout(() => {
          setCopyBtn({ style: 'btn btn-success', value: 'Copy' });
        }, 2000);
      },
      () => console.log('copy fail')
    );
  };

  return (
    <div className="result">
      <span>{short}</span>
      <button type="button" className={copyBtn.style} onClick={copyToClipBoard}>
        {copyBtn.value}
      </button>
    </div>
  );
}

export default UrlResult;
