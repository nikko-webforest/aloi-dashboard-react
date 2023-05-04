import { Skeleton, CircularProgress } from "@mui/material";
import {
  Button,
  Dialog as DialogMUI,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
const ModalAloi = (props) => {
  const { open, close, agree, title, loading, disableSubmit = false, message, onClose, onSubmit } = props;

  return (
    <DialogMUI open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={disableSubmit} onClick={() => onClose()} autoFocus>
          {close}
        </Button>
        <Button disabled={disableSubmit} onClick={() => onSubmit()}>
          {agree}
        </Button>
      </DialogActions>
    </DialogMUI>
  );
};

export default ModalAloi;
