import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

export default function CustomDropdown({
  label,
  data,
  onSelect,
  defaultValue,
}) {
  const [selectedVal, setSelectedVal] = useState(defaultValue || "");

  function handleChange(e) {
    const { value } = e.target;
    setSelectedVal(value);
    onSelect && onSelect(value);
  }

  return (
    <FormControl className="mt-3 pl-2" fullWidth>
      <InputLabel style={{ fontSize: 18 }}>{label}</InputLabel>
      <Select value={selectedVal} onChange={handleChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {data?.map((item, i) => (
          <MenuItem key={i} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
