import React, { Component } from "react";
import TableHeader from "./tableHeader";

const Table = (props) => {
  const { columns, sortColumn, onSort, data } = props;
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      {/* <TableBody data={movies} columns={this.columns} /> */}
      <tbody>
        {data.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like liked={movie.like} onClick={() => onLike(movie)} />
            </td>
            <td>
              <button
                onClick={() => onDelete(movie)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
