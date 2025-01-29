import Alert from '@mui/material/Alert';
import { Button, useTheme } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { tokens } from "../theme";

const MensajeError = ({error, popUpAbrir, handleClose }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Dialog
        open={popUpAbrir === undefined ? false : popUpAbrir }
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert variant="filled" severity="error">
                {error.mensaje}
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{display:'flex', justifyContent:'center'}}>
          <Button sx={{ backgroundColor: colors.blueAccent[600], color: '#ffffff' }} onClick={() => {
            handleClose(error.id)
          }}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    )
}

export default MensajeError