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
  scale = 1,
  onClick,
  alignText,
  max,
}) {
  const [inputValue, setValue] = useState(defaultValue || "");

  const handleChange = (e) => {
    const { value } = e.target;
    if (max && max < value) return;

    setValue(value);
    onInputChange && onInputChange(+value);
  };

  return (
    <FormControl
      onClick={onClick}
      fullWidth={!autoWidth}
      style={{
        width: width ? `${width}px` : null,
        transform: `scale(${scale})`,
        textAlignLast: alignText,
      }}
      className={noMargin ? "" : "mt-3 "}
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
