import React, { Component } from "react";

const ListGroup = (props) => {
  const {
    items,
    textProperty,
    valueProperty,
    itemSelected,
    onItemSelect,
  } = props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          className={
            itemSelected === item ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
