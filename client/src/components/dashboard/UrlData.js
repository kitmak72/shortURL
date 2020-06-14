import React from 'react';
import { Link } from 'react-router-dom';

function UrlData({ url, deleteURL }) {
  return (
    <tr>
      <th scope="row">{url.urlCode}</th>
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
