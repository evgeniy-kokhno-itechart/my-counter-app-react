import React from "react";

const Like = props => {
  let classes = "clickable fa fa-heart";
  classes += props.liked ? classes : classes + "-o";
  return <i onClick={props.onClick} className={classes} aria-hidden="true" />;
};

export default Like;
