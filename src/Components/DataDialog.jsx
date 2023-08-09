import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function DataDialog({ open, onClose, data }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      data-testid="modal"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Additional Data
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Location: {data?.location}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Entity: {data?.entity}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Sensor Type: {data?.sensorType}
        </Typography>
        <Button
          onClick={onClose}
          variant="outlined"
          data-testid="modal-close-button"
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default DataDialog;
