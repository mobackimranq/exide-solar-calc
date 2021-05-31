import React, { Component } from "react";
import Page from "material-ui-shell/lib/containers/Page";
import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import { Container } from "@material-ui/core";
import CustomSlide from "components/Transition/CustomSlide";
import EstTool from "pages/EstimationTool/slide-screens/EstTool";
import { withRouter } from "react-router-dom";

class EstimationTool extends Component {
  state = {
    show: true,
  };

  handleGoBack = () => {
    this.setState({ show: false });
  };

  render() {
    const { show } = this.state;
    return (
      <Page pageTitle="Estimation Tool" onBackClick={this.handleGoBack}>
        <Scrollbar className="scrollbar flex-grow-1">
          <Container
            maxWidth="sm"
            className="d-flex flex-column h-100 pt-2"
            id="container"
          >
            <CustomSlide
              show={show}
              onExited={() => {
                this.props.history.push("/home");
              }}
              component={<EstTool handleExit={this.handleGoBack} />}
            />
          </Container>
        </Scrollbar>
      </Page>
    );
  }
}

export default withRouter(EstimationTool);
