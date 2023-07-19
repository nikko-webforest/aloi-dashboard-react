import { Skeleton, CircularProgress } from "@mui/material";
import {
  Button,
  Dialog as DialogMUI,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
// @ts-ignore
import jiveAlertIcon from "../icons/custom/alert.svg";
// @ts-ignore
import jiveQuestionIcon from "../icons/custom/question.svg";

const ModalAloi = (props) => {
  const {
    open,
    close,
    agree,
    type,
    title,
    loading,
    disableSubmit = false,
    message,
    onClose,
    onSubmit,
    hideSubmit = false
  } = props;

  return (
    <DialogMUI
      open={open}
      className={type}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <img alt="modal-icon" src={jiveAlertIcon} className={type == "alert" ? "active modal-icon" : "modal-icon"} />
      <img
        alt="modal-icon"
        src={jiveQuestionIcon}
        className={type == "question" ? "active modal-icon" : "modal-icon"}
      />
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={disableSubmit} onClick={() => onClose()} autoFocus>
          {close}
        </Button>
        <Button disabled={disableSubmit} className={hideSubmit ? "hide" : ""} onClick={() => onSubmit()}>
          {agree}
        </Button>
      </DialogActions>
    </DialogMUI>
  );
};

export default ModalAloi;
