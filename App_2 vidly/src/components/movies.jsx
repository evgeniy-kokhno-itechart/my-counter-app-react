import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLikeClick = movie => {
    const changedMoviesArr = [...this.state.movies];
    const index = changedMoviesArr.indexOf(movie);
    changedMoviesArr[index] = { ...changedMoviesArr[index] };
    changedMoviesArr[index].liked = !changedMoviesArr[index].liked;
    this.setState({ movies: changedMoviesArr });
  };

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) return <p>There are no movies in the DB</p>;

    return (
      <React.Fragment>
        <p>Showing {count} movies in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(mov => (
              <tr key={mov._id}>
                <td>{mov.title}</td>
                <td>{mov.genre.name}</td>
                <td>{mov.numberInStock}</td>
                <td>{mov.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={mov.liked}
                    onClick={() => this.handleLikeClick(mov)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(mov)}
                    className="bth btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
