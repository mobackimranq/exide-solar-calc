import Button from "@material-ui/core/Button";
import Page from "material-ui-shell/lib/containers/Page";
import Paper from "@material-ui/core/Paper";
import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useAuth } from "base-shell/lib/providers/Auth";
import { useHistory } from "react-router-dom";
import { useMenu } from "material-ui-shell/lib/providers/Menu";
import CenteredContainer from "components/Container/CenteredContainer";
import { Container } from "@material-ui/core";
import CustomTextFeild from "components/Input/CustomTextFeild";
import CustomDropdown from "components/Input/CustomDropdown";
import states from "../../raw-data/states.json";
import CustomPageWithLogo from "components/Page/CustomPageWithLogo";

const SignIn = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const { toggleThis } = useMenu();
  const { setAuth } = useAuth();

  function handleSubmit(event) {
    event.preventDefault();
    authenticate({
      displayName: name || "User",
      email: userEmail,
      phone,
      location,
      userType: "customer",
    });
  }

  const authenticate = (user) => {
    setAuth({ isAuthenticated: true, ...user });
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
            <div>
              <Typography component="h1" variant="h5">
                User Information
              </Typography>
              <form onSubmit={handleSubmit}>
                <CustomTextFeild
                  value={name}
                  onInput={(e) => setName(e.target.value)}
                  label="Name"
                />

                <CustomTextFeild
                  value={phone}
                  onInput={(e) => setPhone(e.target.value)}
                  label="Phone"
                  type="phone"
                  autoComplete="phone"
                />
                <CustomTextFeild
                  value={userEmail}
                  onInput={(e) => setUserEmail(e.target.value)}
                  label="Email"
                  autoComplete="email"
                />
                <CustomDropdown
                  required
                  className="my-3"
                  onSelect={setLocation}
                  label="Location"
                  data={states}
                  filled
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Continue
                </Button>
              </form>
            </div>
          </Paper>
        </Container>
      </CenteredContainer>
    </CustomPageWithLogo>
  );
};

export default SignIn;
