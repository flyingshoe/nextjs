import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Add, Close, Delete, Save } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

function JobModal({ jobQuery, setJobQuery }, ref) {
  const [open, setOpen] = useState(false);
  const [job, setJob] = useState(jobQuery);

  useImperativeHandle(ref, () => ({
    handleOpen: () => {
      setOpen(true);
    },
  }));

  const handleClose = () => {
    setOpen(false);
  };

  function editQuery(id, key, val) {
    const { data: tempQuery } = { ...job }; // Clone job query
    const idx = tempQuery.findIndex((q) => q.id === id); // find index of corresponding id
    tempQuery[idx][key] = val; // Mutate temp job query
    setJob({ ...job, data: tempQuery }); // Update new state
  }

  const deleteQuery = (id) => {
    let { data: tempQuery } = { ...job }; // Clone job query
    tempQuery = tempQuery.filter((q) => q.id !== id); // Remove job query
    setJob({ ...job, data: tempQuery }); // Update new state
  };

  const addQuery = () => {
    let { data: tempQuery } = { ...job }; // Clone job query
    tempQuery.push({
      id: Date.now(),
      search: "",
      enabled: true,
    }); // Add Job Query
    setJob({ ...job, data: tempQuery }); // Update new state
  };

  function save() {
    handleClose(); // Close Modal
    setJobQuery(job); // Save parent state with modal's state
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Search</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent className="max-sm:px-1.5">
        <List>
          <ListItem>
            <ListItemText style={{ marginLeft: 34, marginRight: 38 }}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                type="number"
                margin="dense"
                label="Monthly Moolah"
                fullWidth
                value={job.salary}
                onChange={(e) => {
                  const tempData = { ...job };
                  tempData.salary = +e.target.value;
                  setJob(tempData);
                }}
                onFocus={(event) => {
                  event.target.select();
                }}
              />
            </ListItemText>
          </ListItem>
          {job.data.map(({ id, enabled, search }) => (
            <ListItem disablePadding key={id} className="gap-2">
              <ListItemIcon className="min-w-0">
                <Checkbox
                  checked={enabled}
                  disableRipple
                  onChange={(_, val) => {
                    editQuery(id, "enabled", val);
                  }}
                />
              </ListItemIcon>
              <ListItemText>
                <TextField
                  margin="dense"
                  label="Job title"
                  fullWidth
                  disabled={!enabled}
                  value={search}
                  onChange={(e) => {
                    editQuery(id, "search", e.target.value);
                  }}
                  onFocus={(event) => {
                    event.target.select();
                  }}
                />
              </ListItemText>
              <ListItemIcon className="min-w-0" onClick={() => deleteQuery(id)}>
                <IconButton /* color="error" */ size="large" className="p-2">
                  <Delete className="text-gray-500" fontSize="inherit" />
                </IconButton>
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={addQuery}
          variant="contained"
          startIcon={<Add />}
          // color="success"
        >
          Add Job
        </Button>
        <Button variant="outlined" startIcon={<Save />} onClick={save}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default forwardRef(JobModal);
