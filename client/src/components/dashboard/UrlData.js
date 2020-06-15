import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const codeStyle = {
  cursor: 'pointer'
};

function UrlData({ url, deleteURL }) {
  const [tooltip, setTooltip] = useState('Copy link');
  const timeoutID = useRef(0);

  const copyToClipBoard = data => {
    navigator.clipboard.writeText(data).then(
      () => {
        clearTimeout(timeoutID.current);
        setTooltip('Copied');
        timeoutID.current = setTimeout(() => setTooltip('Copy Link'), 1000);
      },
      () => console.log('copy fail')
    );
  };

  return (
    <tr>
      <th scope="row">
        <Tippy content={tooltip} delay={500}>
          <span onClick={() => copyToClipBoard(url.short)} style={codeStyle}>
            {url.urlCode}
          </span>
        </Tippy>
      </th>
      <td>
        <a href={url.origin}>{url.origin}</a>
      </td>
      <td> {url.createdAt.split('T')[0]} </td>
      <td className="text-center">{url.clicks}</td>
      <td>
        {url.clicks > 0 ? (
          <Link to={`/dashboard/stats/${url.urlCode}`}>More...</Link>
        ) : (
          <span>No data</span>
        )}
      </td>
      <td>
        <span
          className="btn btn-outline-light"
          role="img"
          aria-label="delete"
          onClick={() => deleteURL(url.urlCode)}
        >
          &#10060;
        </span>
      </td>
    </tr>
  );
}

export default UrlData;
