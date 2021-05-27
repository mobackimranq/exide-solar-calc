import React from "react";
import { Button, Typography } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";

import { connect } from "react-redux";
import Appliances from "components/Appliances";
import CustomizedDialog from "components/Dialogue/CustomizedDialog";

class EstimationTool extends React.Component {
  state = {
    loadObject: {},
    modalOpen: false,
    totalLoad: 0,
  };

  componentDidUpdate() {}

  sumUpLoad = (object) => {
    let totalLoad = 0;
    recursion(object);
    function recursion(obj) {
      for (let elem in obj) {
        const value = obj[elem];
        if (typeof value === "object") {
          recursion(value);
        } else if (typeof value === "number") {
          totalLoad += value;
        }
      }
    }
    return totalLoad;
  };

  handleEstimate = () => {
    const totalLoad = this.sumUpLoad(this.state.loadObject);
    this.setState({ modalOpen: true, totalLoad });
  };

  closeModal = (e) => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { onReturn } = this.props;
    return (
      <div className="d-flex mb-5 flex-column ">
        <Button
          className="align-self-start "
          variant="text"
          color="secondary"
          autoCapitalize="false"
          startIcon={<ArrowBackIos />}
          onClick={onReturn}
        >
          Return
        </Button>

        <Appliances onUpdate={(obj) => this.setState({ loadObject: obj })} />
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
              onClick={() => {
                const { totalLoad } = this.state;
                if (totalLoad)
                  this.props.submitEstimatedToGlobalState({
                    input: { load: totalLoad },
                  });
                onReturn();
              }}
            >
              Go To Project Calculator
            </Button>
          }
          title="Estimated Load"
        >
          <Typography>
            Estimated Maximum Load for Your Project is:
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

export default connect(null, mapDispatchToProps)(EstimationTool);
