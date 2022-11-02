import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import "./pagination.scss";

const Pagination = ({ data, postPerPage, currentPage, setCurrentPage }) => {
  let totalPages = Math.ceil(data.length / postPerPage);
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  function handlePage(e) {
    setCurrentPage(parseInt(e.target.innerText));
  }
  function handleFirst() {
    setCurrentPage(1);
  }
  function handlePrev() {
    currentPage > 1 && setCurrentPage(currentPage - 1);
  }
  function handleNext() {
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  }
  function handleLast() {
    setCurrentPage(totalPages);
  }
  return (
    <div className="pagination">
      <FiChevronsLeft
        className="extra"
        onClick={handleFirst}
        id={currentPage === 1 ? "disable" : ""}
      />
      <FiChevronLeft
        className="extra"
        onClick={handlePrev}
        id={currentPage === 1 ? "disable" : ""}
      />
      {pages.map((page) => (
        <button
          key={page}
          onClick={handlePage}
          id={currentPage === page ? "gray" : " "}
        >
          {page}
        </button>
      ))}
      <FiChevronRight
        className="extra"
        onClick={handleNext}
        id={currentPage === totalPages ? "disable" : ""}
      />
      <FiChevronsRight
        className="extra"
        onClick={handleLast}
        id={currentPage === totalPages ? "disable" : ""}
      />
    </div>
  );
};

export default Pagination;
