import React, { Component } from "react";

const Like = props => {
  let classes = "fa fa-heart";
  classes += props.liked ? classes : classes + "-o";
  return (
    <i
      onClick={props.onClick}
      className={classes}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    />
  );
};

export default Like;
