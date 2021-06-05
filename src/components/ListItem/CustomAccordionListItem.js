import React from "react";
import { Checkbox, ListItem } from "@material-ui/core";
import CustomNumberInput from "../Input/CustomNumberInput";

class CustomAccordionListItem extends React.Component {
  itemObject = this.props.itemObject;

  state = {
    checked: this.itemObject?.checked || false,
    load: this.itemObject?.load || 0, //in Watts
    quantity: this.itemObject?.quantity || 1,
    useHours: this.itemObject?.useHours || 24, //perday
  };

  onChange = this.props.onChange;

  componentDidUpdate(prevProps, prevState) {
    const { checked, quantity, useHours } = this.state;
    if (
      prevState.checked !== checked ||
      prevState.quantity !== quantity ||
      prevState.useHours !== useHours
    ) {
      this.updateLoadState();
    }
  }

  handleClick = (e) => {
    e.preventDefault();

    this.setState((state) => ({ checked: !state.checked }));
  };

  onQuantityChange = (quantity) => {
    this.setState({ quantity, checked: true });
  };

  onUseHourChange = (useHours) => {
    this.setState({ useHours, checked: true });
  };

  updateLoadState = () => {
    const { checked, quantity, useHours } = this.state;
    const { name, oPower } = this.itemObject;
    let load;
    if (checked) {
      load = oPower * quantity;
    } else {
      load = 0;
    }
    if (typeof this.onChange === "function") {
      this.onChange({ load, name, quantity, checked, useHours });
    }
  };

  render() {
    return (
      <ListItem
        className="p-0"
        alignItems="center"
        dense
        button
        onClick={this.handleClick}
      >
        <Checkbox
          size="small"
          className="p-1"
          color="primary"
          checked={this.state.checked}
        />
        <div className="w-100 p-1">
          <div className="d-flex justify-content-between pt-2 align-items-end">
            <div>
              <strong>{this.itemObject.name}</strong>
            </div>
            <div
              className="text-muted small"
              style={{ textAlign: "right" }}
            >{`[${this.itemObject.oPower}W]`}</div>
          </div>

          <div className="d-flex align-items-center justify-content-between font-italic small">
            <div className="d-flex align-items-center">
              Quantity:
              <CustomNumberInput
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onInputChange={this.onQuantityChange}
                defaultValue={this.state.quantity}
                noMargin
                scale={0.9}
                startAdornment="×"
                width={60}
                alignText="center"
              />
            </div>
            <div className="d-flex align-items-center text-center">
              On Time:
              <CustomNumberInput
                max={24}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onInputChange={this.onUseHourChange}
                defaultValue={this.state.useHours}
                noMargin
                scale={0.9}
                adornment="hrs"
                width={60}
                alignText="center"
              />
            </div>
          </div>
        </div>
      </ListItem>
    );
  }
}

export default CustomAccordionListItem;
