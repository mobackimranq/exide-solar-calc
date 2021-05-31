import Button from "@material-ui/core/Button";
import Home from "@material-ui/icons/Home";
import React from "react";
import Typography from "@material-ui/core/Typography";

import CenteredContainer from "components/Container/CenteredContainer";

const PageNotFound = () => {
  return (
    <CenteredContainer>
      <Typography variant="h4">404</Typography>
      <Typography variant="subtitle1">Page Not Found</Typography>
      <Button color="secondary" aria-label="home" href="/">
        <Home />
      </Button>
    </CenteredContainer>
  );
};

export default PageNotFound;
