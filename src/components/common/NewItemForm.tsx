import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface NewItemFormProps {
    addItem: (text: string) => void;
}

export default function NewItemForm({ addItem }: NewItemFormProps) {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedText = text.trim();
        if (trimmedText) {
            addItem(trimmedText);
            setText('');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', mb: 2 }}
        >
            <TextField
                label="Add new item"
                variant="outlined"
                size="small"
                value={text}
                onChange={(e) => setText(e.target.value)}
                sx={{ flexGrow: 1, mr: 1 }}
            />
            <Button variant="contained" type="submit">
                Add
            </Button>
        </Box>
    );
}