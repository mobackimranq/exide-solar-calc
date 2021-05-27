import React, { useState } from "react";
import { IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

export default function CustomizedDialog({
  open,
  handleClose,
  title,
  children,
  actionButtons,
}) {
  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose}>{title}</DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions className="d-flex align-items-center">
          {actionButtons}
        </DialogActions>
      </Dialog>
    </div>
  );
}

const DialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography
      className="d-flex align-items-center justify-content-between"
      {...other}
    >
      <Typography variant="h5">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};
