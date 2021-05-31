import TextField from "@material-ui/core/TextField";
import React from "react";

export default function CustomTextFeild(props) {
  return (
    <TextField {...props} variant="filled" margin="normal" required fullWidth />
  );
}
