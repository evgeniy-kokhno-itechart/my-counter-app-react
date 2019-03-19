import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies,
      currentGenre,
      sortColumn
    } = this.state;

    const filtered =
      currentGenre && currentGenre._id
        ? movies.filter(m => m.genre._id === currentGenre._id)
        : movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const moviesOnPage = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, moviesOnPage };
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

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

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = genre => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  handleSort = newSortColumn => {
    this.setState({ sortColumn: newSortColumn });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      currentGenre,
      sortColumn
    } = this.state;

    if (count === 0) return <p>There are no movies in the DB</p>;

    const { totalCount, moviesOnPage } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            selectedItem={currentGenre}
            onItemSelect={this.handleGenreChange}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            moviesOnPage={moviesOnPage}
            sortColumn={sortColumn}
            onLikeClick={this.handleLikeClick}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
