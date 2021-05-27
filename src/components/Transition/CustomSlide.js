import React from "react";
import { Slide } from "@material-ui/core";

export default function CustomSlide({
  show = true,
  onExited,
  component,
  direction = "left",
}) {
  return (
    <Slide
      direction={direction}
      in={show}
      mountOnEnter
      unmountOnExit
      onExited={onExited}
    >
      <div>{component}</div>
    </Slide>
  );
}
