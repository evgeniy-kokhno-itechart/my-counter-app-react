import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    const newSortColumn = { ...this.props.sortColumn };
    if (newSortColumn.path === path)
      newSortColumn.order = newSortColumn.order === "asc" ? "desc" : "asc";
    else {
      newSortColumn.path = path;
      newSortColumn.order = "asc";
    }
    this.props.onSort(newSortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path === sortColumn.path) {
      const caretClass =
        sortColumn.order === "asc" ? "fa fa-sort-asc" : "fa fa-sort-desc";
      return <i className={caretClass} />;
    } else return;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
