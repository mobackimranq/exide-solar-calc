import React, { Component } from "react";
import { Button, Paper, Typography } from "@material-ui/core";
import states from "../raw-data/states.json";
import inverterModels from "../raw-data/inverterModels.json";
import CustomDropdown from "components/Input/CustomDropdown";
import CustomNumberInput from "components/Input/CustomNumberInput";
import { connect } from "react-redux";

const pVArea = 1; //square meter per piece
const sunlightHours = 6;

class MainInputForm extends Component {
  recentInput = this.props.recentInput;

  state = {
    load: this.recentInput?.load,
    loadDuration: this.recentInput?.loadDuration,
    dependency: this.recentInput?.dependency,
    location: this.recentInput?.location,
    inverterType: this.recentInput?.inverterType,
  };

  handleCalculate = (e) => {
    const { submitCalculation, onCalculate } = this.props;
    const { load, loadDuration, dependency, location, inverterType } =
      this.state;
    if (load && loadDuration && dependency && location && inverterType) {
      const input = { load, loadDuration, dependency, location, inverterType };
      const dailyEneryDemand = load * loadDuration * (dependency / 100); //in Wh
      const recPCSModel =
        inverterType === "MPPT" ? "Exide 5kVA 48V MPPT PCS" : null;
      const numberOfPV = parseInt(dailyEneryDemand / (335 * sunlightHours));
      const numberOfBatteries = parseInt(dailyEneryDemand / 400);
      const requiredArea = pVArea * numberOfPV;
      const recPVConfig = `335Wp x ${numberOfPV} Nos.`;
      const recBatteryConfig = `400Ah x ${numberOfBatteries} Nos.`;
      const result = {
        dailyEneryDemand,
        recPCSModel,
        numberOfBatteries,
        numberOfPV,
        recPVConfig,
        recBatteryConfig,
        requiredArea,
      };

      onCalculate(e);
      submitCalculation({ input, result });
    } else {
      alert("Please fill All fields");
    }
  };

  render() {
    const { onOpenEstTool } = this.props;
    const { load, loadDuration, dependency, location, inverterType } =
      this.state;

    function setStateState(item) {
      this.setState({ item });
    }
    return (
      <div className="my-3">
        <div className="mb-3 d-flex flex-column">
          <Paper elevation={3} className="p-2 pb-5 mb-3 form-card">
            <CustomNumberInput
              defaultValue={load}
              onInputChange={setStateState}
              plural
              label="Enter Total Load"
              adornment="Watt"
            />
            <CustomNumberInput
              defaultValue={loadDuration}
              onInputChange={setStateState}
              plural
              label="Enter Load Duration"
              adornment="Hour"
            />
            <CustomNumberInput
              defaultValue={dependency}
              onInputChange={setStateState}
              label="Dependency on Solar Power"
              adornment="%"
            />
            <CustomDropdown
              defaultValue={location}
              onSelect={setStateState}
              label="Select Project Location"
              data={states}
            />
            <CustomDropdown
              defaultValue={inverterType}
              onSelect={setStateState}
              label="Select Inverter Type"
              data={inverterModels}
            />
          </Paper>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleCalculate}
          >
            Calculate
          </Button>
        </div>
        <div className="d-flex flex-column align-items-center ">
          <Typography variant="caption" display="block" gutterBottom>
            Not Sure About Load?
          </Typography>
          <Button variant="contained" color="default" onClick={onOpenEstTool}>
            Estimate Total Load
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recentInput: state.calculationsArray?.reduce((a, b) => b, null)?.input,
});

const mapDispatchToProps = (dispatch) => ({
  submitCalculation: (payload) =>
    dispatch({
      type: "ADD_CALCULATION",
      payload,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainInputForm);
