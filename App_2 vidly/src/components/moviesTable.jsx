import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: mov => <Link to={`/movies/${mov._id}`}>{mov.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: mov => (
        <Like liked={mov.liked} onClick={() => this.props.onLikeClick(mov)} />
      )
    },
    {
      key: "delete",
      content: mov => (
        <button
          onClick={() => this.props.onDelete(mov)}
          className="bth btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { moviesOnPage, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        items={moviesOnPage}
      />
    );
  }
}

export default MoviesTable;
