import React from 'react';

function Pagination({ total, currentPage, setPage }) {
  const pageNum = [];
  const numPerPage = 10; //fixed to 10 URL per page

  if (total === 0) return null;

  for (let i = 1; i <= Math.ceil(total / numPerPage); i++) {
    pageNum.push(i);
  }

  return (
    <nav aria-label="...">
      <ul className="pagination justify-content-center">
        <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
          <button
            className="page-link"
            tabIndex="-1"
            onClick={() => setPage(currentPage - 1)}
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {pageNum.map(num => (
          <li
            className={num === currentPage ? 'page-item active' : 'page-item'}
            key={num}
          >
            <button className="page-link" onClick={() => setPage(num)}>
              {num}
            </button>
          </li>
        ))}
        <li
          className={
            currentPage === pageNum.length ? 'page-item disabled' : 'page-item'
          }
        >
          <button
            className="page-link"
            onClick={() => setPage(currentPage + 1)}
            aria-disabled={currentPage === pageNum.length ? 'true' : 'false'}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
