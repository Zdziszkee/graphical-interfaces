import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';

interface NoteDialogProps {
    open: boolean;
    onClose: (note?: string) => void;
    note: string;
}

export default function NoteDialog({
                                       open,
                                       onClose,
                                       note: initialNote,
                                   }: NoteDialogProps) {
    const [note, setNote] = useState(initialNote || '');

    const handleSave = () => {
        onClose(note);
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
            <DialogTitle>Add/Edit Note</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Note"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave} variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}