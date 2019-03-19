import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { items, columns } = this.props;
    return (
      <tbody>
        {items.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
        {/* {moviesOnPage.map(mov => (
        <tr key={mov._id}>
          <td>{mov.title}</td>
          <td>{mov.genre.name}</td>
          <td>{mov.numberInStock}</td>
          <td>{mov.dailyRentalRate}</td>
          <td>
            <Like liked={mov.liked} onClick={() => onLikeClick(mov)} />
          </td>
          <td>
            <button
              onClick={() => onDelete(mov)}
              className="bth btn-danger btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      ))} */}
      </tbody>
    );
  }
}

export default TableBody;
