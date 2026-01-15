import React from "react";
import PropTypes from "prop-types";
import { Dialog as DialogMUI } from "@mui/material";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export const Dialog = ({
  children,
  dialogTitle,
  dialogContentText,
  disagreeButtonHandler,
  disagreeButtonText,
  agreeButtonHandler,
  agreeButtonText,
  ...props
}) => {
  return (
    <DialogMUI {...props}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={disagreeButtonHandler}>{disagreeButtonText}</Button>
        <Button onClick={agreeButtonHandler} autoFocus>
          {agreeButtonText}
        </Button>
      </DialogActions>
    </DialogMUI>
  );
};

Dialog.propTypes = {
  dialogTitle: PropTypes.string.isRequired,
  dialogContentText: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  children: PropTypes.node,
  disagreeButtonHandler: PropTypes.func.isRequired,
  disagreeButtonText: PropTypes.string.isRequired,
  agreeButtonHandler: PropTypes.func.isRequired,
  agreeButtonText: PropTypes.string.isRequired,
};
