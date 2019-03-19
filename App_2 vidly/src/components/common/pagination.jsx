import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1);

  // console.log(pagesCount);
  // console.log(pages);
  // console.log(currentPage);
  //   let numberOfpages = Math.ceil(objects.length / numberOfpages);
  if (pagesCount === 1) return null;
  return (
    <nav>
      <ul className="pagination">
        {pages.map(p => (
          <li
            key={p}
            className={currentPage === p ? "page-item active" : "page-item"}
          >
            <a onClick={() => onPageChange(p)} className="page-link">
              {p}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
