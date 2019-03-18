import React, { Component } from "react";

class Counter extends Component {
  state = {
    value: this.props.counter.value
    // tags: ["tag1", "tag2", "tag3"]
  };

  // handleIncrement = productId => {
  //   this.setState({ value: this.state.value + 1 });
  //   console.log(productId);
  // };

  render() {
    console.log("Counter has been rendered");
    return (
      <div className="row">
        <div className="col-1">
          {/* <h4>{this.props.counter.id}</h4> */}
          <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        </div>
        <div className="col">
          <button
            onClick={() => this.props.onIncrement(this.props.counter)}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>
          <button
            onClick={() => this.props.onDecrement(this.props.counter)}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.props.counter.value === 0 ? "disabled" : ""}
          >
            -
          </button>
          <button
            onClick={() => this.props.onDelete(this.props.counter.id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
          {/* <ul>
          {this.state.tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul> */}
        </div>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value: cnt } = this.props.counter;
    return cnt === 0 ? "Zero" : cnt;
  }
}

export default Counter;
