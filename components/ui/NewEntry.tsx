import { ChangeEvent, useState, useContext } from "react";
import { Button, Box, TextField } from "@mui/material";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

import { EntriesContext } from "../../context/entries/EntriesContext";
import { UIContext } from "../../context/ui";

export const NewEntry = () => {
  const [isAdding, setIsAdding] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setInputValue("");
  };

  return (
    <Box mb={2}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            multiline
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva entrada"
            autoFocus
            value={inputValue}
            onChange={handleChange}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }} mb={2}>
            <Button
              variant="contained"
              endIcon={<CancelPresentationOutlinedIcon />}
              color="error"
              onClick={() => setIsAddingEntry(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              endIcon={<SaveOutlinedIcon />}
              disabled={inputValue.length <= 0}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          variant="contained"
          startIcon={<AddBoxOutlinedIcon />}
          onClick={() => setIsAddingEntry(true)}
          fullWidth
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
