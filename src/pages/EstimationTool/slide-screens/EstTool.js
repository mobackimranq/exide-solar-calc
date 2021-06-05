import React from "react";
import { Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import Appliances from "components/Appliances";
import CustomizedDialog from "components/Dialogue/CustomizedDialog";

class EstTool extends React.Component {
  state = {
    loadObject: {},
    modalOpen: false,
    totalLoad: 0,
  };

  componentDidUpdate() {}

  sumUpLoad = (object) => {
    let powerConsumed = 0; //PER DAY
    recursion(object);
    function recursion(obj) {
      for (let elem in obj) {
        const value = obj[elem];
        if (typeof value === "object") {
          recursion(value);
        } else if (elem === "load") {
          powerConsumed += +(value * obj.useHours);
        }
      }
    }
    return +(powerConsumed / 24).toFixed(3);
  };

  handleEstimate = () => {
    const totalLoad = this.sumUpLoad(this.state.loadObject);
    this.setState({ modalOpen: true, totalLoad });
  };

  closeModal = (e) => {
    this.setState({ modalOpen: false });
  };

  handleGoToCalc = () => {
    const { totalLoad } = this.state;
    if (totalLoad)
      this.props.submitEstimatedToGlobalState({
        input: { load: totalLoad, loadDuration: 24 },
      });
    this.props.handleExit();
  };

  render() {
    return (
      <div className="d-flex mb-5 flex-column ">
        <Appliances onUpdate={(loadObject) => this.setState({ loadObject })} />
        <Button
          onClick={this.handleEstimate}
          className="my-2 position-fixed"
          variant="contained"
          color="secondary"
          style={{ bottom: 0, alignSelf: "center" }}
        >
          Estimate
        </Button>
        <CustomizedDialog
          open={this.state.modalOpen}
          handleClose={this.closeModal}
          actionButtons={
            <Button
              variant="contained"
              color="primary"
              autoCapitalize="false"
              onClick={this.handleGoToCalc}
            >
              Go To Project Calculator
            </Button>
          }
          title="Estimated Load"
        >
          <Typography>
            Estimated per Day Average Load for Your Project is:
            <strong> {this.state.totalLoad} Watts</strong>
          </Typography>
        </CustomizedDialog>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitEstimatedToGlobalState: (payload) =>
    dispatch({
      type: "ADD_CALCULATION",
      payload,
    }),
});

export default connect(null, mapDispatchToProps)(EstTool);
