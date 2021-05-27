import React, { useState } from "react";
import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";

export default function CustomNumberInput({
  defaultValue,
  onInputChange,
  label,
  adornment,
  plural,
  autoWidth,
  startAdornment,
  width,
  noMargin,
}) {
  const [inputValue, setValue] = useState(defaultValue || "");

  const handleChange = (e) => {
    const { value } = e.target;

    setValue(value);
    onInputChange && onInputChange(+value);
  };

  return (
    <FormControl
      fullWidth={!autoWidth}
      style={{
        width: width ? `${width}px` : null,
      }}
      className={noMargin ? "" : "mt-3"}
    >
      {label && <InputLabel style={{ fontSize: 18 }}>{label}</InputLabel>}
      <Input
        type="number"
        onChange={handleChange}
        value={inputValue}
        startAdornment={
          startAdornment && (
            <InputAdornment
              className="text-muted mx-1 "
              style={{ fontSize: 15 }}
              position="start"
            >
              {startAdornment}
            </InputAdornment>
          )
        }
        endAdornment={
          adornment && (
            <InputAdornment
              className="text-muted"
              style={{ fontSize: 15 }}
              position="end"
            >
              {!inputValue && "in"} {adornment}
              {plural && inputValue !== "1" && "s"}
            </InputAdornment>
          )
        }
      />
    </FormControl>
  );
}
