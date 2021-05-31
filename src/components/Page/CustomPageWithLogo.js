import React, { Component } from "react";
const { default: Page } = require("material-ui-shell/lib/containers/Page");

class CustomPageWithLogo extends Component {
  render() {
    const { children } = this.props;
    return (
      <Page
        appBarContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "40px",
              paddingTop: "8px",
            }}
          >
            <div className="d-flex flex-column align-items-center">
              <img
                src={require("../../assets/logo/exide-logo.svg").default}
                width={130}
                alt="Exide"
              />
              Solar Calculator
            </div>
          </div>
        }
      >
        {children}
      </Page>
    );
  }
}

export default CustomPageWithLogo;
