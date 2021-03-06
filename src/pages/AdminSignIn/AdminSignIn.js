import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { useAuth } from "base-shell/lib/providers/Auth";
import { useHistory } from "react-router-dom";
import { useMenu } from "material-ui-shell/lib/providers/Menu";
import { Container } from "@material-ui/core";
import CenteredContainer from "components/Container/CenteredContainer";
import CustomTextFeild from "components/Input/CustomTextFeild";
import CustomPageWithLogo from "components/Page/CustomPageWithLogo";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { ERORRS, SNACKBAR_OPTIONS } from "../../contstants";

const AdminSignIn = ({ submitUserToGlobalState, enqueueSnackbar }) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toggleThis } = useMenu();
  const { setAuth } = useAuth();

  function handleSubmit(event) {
    event.preventDefault();
    if (username !== "admin") {
      enqueueSnackbar(ERORRS.INVALID_USERNAME, SNACKBAR_OPTIONS);
      return;
    }
    if (password !== "password") {
      enqueueSnackbar(ERORRS.INVALID_PASSWORD, SNACKBAR_OPTIONS);
      return;
    }
    authenticate({
      displayName: "Admin",
      email: username,
      userType: "admin",
    });
  }

  const authenticate = (user) => {
    setAuth({ isAuthenticated: true, ...user });
    submitUserToGlobalState({ ...user });
    toggleThis("isAuthMenuOpen", false);

    let _location = history.location;
    let _route = "/home";

    if (_location.state && _location.state.from) {
      _route = _location.state.from.pathname;
      history.push(_route);
    } else {
      history.push(_route);
    }
  };

  return (
    <CustomPageWithLogo>
      <CenteredContainer>
        <Container maxWidth="sm">
          <Paper elevation={6} className="p-3">
            <Typography component="h1" variant="h5">
              Admin Sign In
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
              <CustomTextFeild
                value={username}
                onInput={(e) => setUsername(e.target.value)}
                label="Username"
                autoComplete="username"
                autoFocus
              />
              <CustomTextFeild
                value={password}
                onInput={(e) => setPassword(e.target.value)}
                label="Password"
                type="password"
              />
              <Button
                type="submit"
                className="my-3"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
            </form>

            <Link to="/signin">Continue as a User Instead?</Link>
          </Paper>
        </Container>
      </CenteredContainer>
    </CustomPageWithLogo>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    submitUserToGlobalState: (payload) =>
      dispatch({
        type: "UPDATE_USER",
        payload,
      }),
  };
}

const Comp = withSnackbar(AdminSignIn);

export default connect(null, mapDispatchToProps)(Comp);
