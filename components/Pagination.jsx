export default function Pagination({
  total = 0,
  limit = 20,
  page = 1,
  skip = 0,
  totalPage = 1,
}) {
  const pages = [];
  for (let i = 1; i <= ữa; i++) {
    pages.push(
      <li key={i} className={`page-item ${i === page && "active"}`}>
        <a className="page-link" href={`#product?page=${i}`}>
          {i}
        </a>
      </li>
    );
  }

  return (
    <ul className="pagination justify-content-center mb-0">
      <li className="page-item disabled">
        <span className="page-link">Prev</span>
      </li>
      {pages}
      <li className="page-item">
        <a className="page-link" href="#">
          Next
        </a>
      </li>
    </ul>
  );
}
