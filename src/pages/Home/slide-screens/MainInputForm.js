import React, { Component } from "react";
import { Button, Paper, Typography } from "@material-ui/core";
import states from "../../../raw-data/states.json";
import inverterModels from "../../../raw-data/inverterModels.json";
import CustomDropdown from "components/Input/CustomDropdown";
import CustomNumberInput from "components/Input/CustomNumberInput";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
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

  componentDidMount() {}

  componentDidUpdate() {}

  handleCalculate = (e) => {
    const { submitCalculation, onCalculate, enqueueSnackbar } = this.props;
    const { load, loadDuration, dependency, location, inverterType } =
      this.state;
    if (load && loadDuration && dependency && location && inverterType) {
      const input = { load, loadDuration, dependency, location, inverterType };
      const dailyEneryDemand = Math.round(
        load * loadDuration * (dependency / 100)
      ); //in Wh
      const recPCSModel =
        inverterType === "MPPT" ? "Exide 5kVA 48V MPPT PCS" : null;
      const numberOfPV = Math.ceil(dailyEneryDemand / (335 * sunlightHours));
      const numberOfBatteries = Math.ceil(dailyEneryDemand / 400);
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
      enqueueSnackbar("Please Input All Fields", {
        variant: "error",
      });
    }
  };

  render() {
    const { onOpenEstTool } = this.props;

    const { load, loadDuration, dependency, location, inverterType } =
      this.state;

    return (
      <div className="my-3">
        <div className="mb-3 d-flex flex-column">
          <Paper elevation={3} className="p-2 pb-5 mb-3 form-card">
            <CustomNumberInput
              defaultValue={load}
              onInputChange={(load) => this.setState({ load })}
              plural
              label="Enter Total Load"
              adornment="Watt"
            />
            <CustomNumberInput
              defaultValue={loadDuration}
              onInputChange={(loadDuration) => this.setState({ loadDuration })}
              plural
              label="Enter Load Duration"
              adornment="Hour"
              max={24}
            />
            <CustomNumberInput
              defaultValue={dependency}
              onInputChange={(dependency) => this.setState({ dependency })}
              label="Dependency on Solar Power"
              adornment="%"
              max={100}
            />
            <CustomDropdown
              className="mt-3"
              fontSize={18}
              defaultValue={location}
              onSelect={(location) => this.setState({ location })}
              label="Select Project Location"
              data={states}
            />
            <CustomDropdown
              className="mt-3"
              fontSize={18}
              defaultValue={inverterType}
              onSelect={(inverterType) => this.setState({ inverterType })}
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

const Comp = withSnackbar(MainInputForm);

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
