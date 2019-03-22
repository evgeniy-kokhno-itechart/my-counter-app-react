import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    searchQuery: "",
    currentPage: 1,
    currentGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      currentGenre,
      sortColumn,
      searchQuery
    } = this.state;

    // const filtered =
    //   currentGenre && currentGenre._id
    //     ? movies.filter(m => m.genre._id === currentGenre._id)
    //     : movies;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (currentGenre && currentGenre._id)
      filtered = allMovies.filter(m => m.genre._id === currentGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const moviesOnPage = paginate(sorted, currentPage, pageSize);
    // console.log(moviesOnPage);
    // moviesOnPage.forEach(m => {
    //   m.title = <Link to="/rentals">{m.title}</Link>;
    // });

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
    this.setState({ currentGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = newSortColumn => {
    this.setState({ sortColumn: newSortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentGenre: null, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      currentGenre,
      sortColumn,
      searchQuery
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
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
