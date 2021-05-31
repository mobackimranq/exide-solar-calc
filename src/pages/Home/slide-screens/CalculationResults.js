import React, { PureComponent } from "react";
import { Button, Paper } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import { connect } from "react-redux";

class CalculationResults extends PureComponent {
  render() {
    const { onReturn, calculation } = this.props;
    const {
      dailyEneryDemand,
      recPCSModel,
      numberOfBatteries,
      numberOfPV,
      recPVConfig,
      recBatteryConfig,
      requiredArea,
    } = calculation?.result;

    return (
      <>
        <Button
          variant="text"
          color="secondary"
          autoCapitalize="false"
          className="mt-2"
          startIcon={<ArrowBackIos />}
          onClick={onReturn}
        >
          Return
        </Button>

        <Paper elevation={3} className="form-card p-2 mt-2 mb-3">
          <CustomTableItem
            label="Total Enery Used (in 24 hrs)"
            item={`${dailyEneryDemand} Watt Hours`}
          />
          <CustomTableItem
            label="Pojected Usage per Week"
            item={`${((dailyEneryDemand * 7) / 100).toFixed(
              3
            )} kilo Watt Hours`}
          />
          <CustomTableItem label="Number of Solar Panels" item={numberOfPV} />
          <CustomTableItem
            label="Number of Batteries"
            item={numberOfBatteries}
          />
          <CustomTableItem label="Recommended PCS Model" item={recPCSModel} />
          <CustomTableItem
            label="Recommended PV configuration"
            item={recPVConfig}
          />
          <CustomTableItem
            label="Recommended Battery configuration"
            item={recBatteryConfig}
          />
          <CustomTableItem
            label="Estimated Area Required for PV Array"
            item={`${requiredArea} Square Meter`}
          />
        </Paper>
      </>
    );
  }
}

function CustomTableItem({ label, item }) {
  return (
    <div className="my-3">
      <div>
        <strong style={{ color: "#888" }}>{label}</strong>
      </div>
      <div
        style={{
          borderBottom: "2px solid #888",
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {item}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  calculation: state.calculationsArray.reduce((a, b) => b, null),
});

export default connect(mapStateToProps, null)(CalculationResults);
