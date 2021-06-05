import Page from "material-ui-shell/lib/containers/Page";
import React, { Component } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { Button, Container, Paper } from "@material-ui/core";
import DisplayData from "./DisplayData";
import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";

class ConsumerData extends Component {
  state = {
    startDate: new Date() - 6.048e8, //from one week ago
    endDate: new Date(),
  };

  handleStartDateChange = (startDate) => this.setState({ startDate });

  handleEndDateChange = (endDate) => this.setState({ endDate });

  render() {
    return (
      <Page pageTitle="Consumer Data">
        <Scrollbar>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Container maxWidth="lg">
              <div className="d-flex justify-content-around align-items-center flex-wrap">
                <div className="d-flex justify-content-around flex-wrap">
                  <KeyboardDatePicker
                    inputVariant="filled"
                    disableFuture
                    label="From"
                    className="m-2"
                    value={this.state.startDate}
                    onChange={this.handleStartDateChange}
                  />
                  <KeyboardDatePicker
                    inputVariant="filled"
                    disableFuture
                    className="m-2"
                    label="Till"
                    value={this.state.endDate}
                    onChange={this.handleEndDateChange}
                  />
                </div>
                <Button variant="contained" color="primary">
                  Fetch
                </Button>
              </div>
              <Paper className="m-2 " elevation={5}>
                <DisplayData />
              </Paper>
            </Container>
          </MuiPickersUtilsProvider>
        </Scrollbar>
      </Page>
    );
  }
}

export default ConsumerData;
