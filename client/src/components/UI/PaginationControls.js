import { useState } from "react";

function PaginationControls({ n, onPageChange }) {
  const arr = Array.from({ length: n });
  const [page, setPage] = useState(1);

  function handlePageChange(e) {
    const val = Number(e.target.textContent);
    setPage(val);
    onPageChange(val);
  }

  function handleBack() {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
    onPageChange(page - 1);
  }

  function handleForward() {
    if (page === n) {
      return;
    }
    setPage(page + 1);
    onPageChange(page + 1);
  }

  return (
    <ul className="pagination d-flex justify-content-center">
      <li className="page-item">
        <button disabled={page <= 1} className="page-link" onClick={handleBack}>
          &lt;
        </button>
      </li>
      {arr.map((_, i) => {
        return (
          <li className="page-item" key={i}>
            <button className="page-link" onClick={handlePageChange}>
              {i + 1}
            </button>
          </li>
        );
      })}
      <li className="page-item">
        <button
          disabled={page === n}
          className="page-link"
          onClick={handleForward}
        >
          &gt;
        </button>
      </li>
    </ul>
  );
}

export default PaginationControls;
