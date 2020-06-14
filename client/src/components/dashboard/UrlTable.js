import React from 'react';
import UrlData from './UrlData';

function UrlTable({ urls, deleteURL }) {
  if (urls.length === 0) {
    return (
      <h2 style={{ textAlign: 'center' }}>You have not created any URL</h2>
    );
  } else {
    return (
      <div className="table-responsive">
        <table className="table table-hover mt-2">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Ending</th>
              <th scope="col">Original URL</th>
              <th scope="col">Created At</th>
              <th scope="col">Clicks</th>
              <th scope="col">Statistics</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {urls.map(url => (
              <UrlData key={url._id} url={url} deleteURL={deleteURL} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UrlTable;
