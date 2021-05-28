import React from "react";
import { Checkbox, ListItem } from "@material-ui/core";
import CustomNumberInput from "../Input/CustomNumberInput";

class CustomAccordionListItem extends React.Component {
  itemObject = this.props.itemObject;

  state = {
    checked: this.itemObject?.checked || false,
    load: this.itemObject?.load || 0, //in Watts
    quantity: this.itemObject?.quantity || 1,
  };

  onChange = this.props.onChange;

  componentDidMount() {
    console.log(this.state);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.checked !== this.state.checked ||
      prevState.quantity !== this.state.quantity
    ) {
      this.updateLoadState();
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState((state) => ({ checked: !state.checked }));
  };

  onInputChange = (quantity) => {
    this.setState({ quantity, checked: true });
  };

  updateLoadState = () => {
    const { checked, quantity } = this.state;
    const { name, oPower } = this.itemObject;
    let load;
    if (checked) {
      load = oPower * quantity;
    } else {
      load = 0;
    }
    if (typeof this.onChange === "function") {
      this.onChange({ load, name, quantity, checked });
    }
  };

  render() {
    return (
      <ListItem className="p-0" alignItems="center" dense button>
        <Checkbox
          disableRipple
          disableTouchRipple
          disableFocusRipple
          onClick={this.handleClick}
          size="small"
          color="primary"
          checked={this.state.checked}
        />
        <p onClick={this.handleClick} className="w-100 my-2 font-italic ">
          {this.itemObject.name}
        </p>
        <p
          onClick={this.handleClick}
          className="w-25 m-2 text-muted "
          style={{ textAlign: "right" }}
        >{`[${this.itemObject.oPower}W]`}</p>
        <CustomNumberInput
          onInputChange={this.onInputChange}
          defaultValue={this.state.quantity}
          center
          noMargin
          startAdornment="×"
          width={80}
        />
      </ListItem>
    );
  }
}

export default CustomAccordionListItem;
