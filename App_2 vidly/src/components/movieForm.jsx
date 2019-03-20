import React, { Component } from "react";
// import queryString from "query-string";

class MovieForm extends Component {
  handleSave = () => {
    this.props.history.push("/movies");
  };

  render() {
    // const { movieId } = queryString.parse(this.props.location.search);
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <h1>Movie Form {id}</h1>
        <button onClick={this.handleSave} className="bth btn-primary btn-sm">
          Save
        </button>
      </React.Fragment>
    );
  }
}
export default MovieForm;
