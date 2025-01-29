import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TableListadoArticulos from '../../components/TableListadoArticulos';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ListadoArticulos({open, setOpen, articulosSeleccionados}) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog 
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="1000px"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Articulos que componen tu producto:
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent   dividers>
          <TableListadoArticulos articulosSeleccionados={articulosSeleccionados}/>
        </DialogContent>
        <DialogActions>
          <Button sx={{color: colors.redAccent[100]}} autoFocus onClick={handleClose}>
            Cerrar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}