import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import _, { filter } from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: "",
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handDelete = (movie) => {
    const funMovies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: funMovies });
  };

  toggleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn });
  };

  render() {
    const { pageSize, currentPage } = this.state;

    const filtered =
      this.state.selectedGenre && this.state.selectedGenre._id
        ? this.state.movies.filter(
            (m) => m.genre._id === this.state.selectedGenre._id
          )
        : this.state.movies;

    const sorted = _.orderBy(
      filtered,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const movies = paginate(sorted, currentPage, pageSize);

    if (this.state.movies.length < 1) {
      return <p>There are no Movies in the database!</p>;
    }
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            itemSelected={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {filtered.length > 1 ? (
            <p>There are {filtered.length} movies in the database!</p>
          ) : (
            <p>There is {filtered.length} movie in the database!</p>
          )}
          <MoviesTable
            movies={movies}
            sortColumn={this.state.sortColumn}
            onDelete={this.handDelete}
            onLike={this.toggleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
