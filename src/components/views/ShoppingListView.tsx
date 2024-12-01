import * as React from 'react';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ShoppingListView() {
    const [checked, setChecked] = React.useState<number[]>([]);
    const [notes, setNotes] = React.useState<{ [key: number]: string }>({});
    const [editNote, setEditNote] = React.useState<number | null>(null);
    const [items, setItems] = React.useState<{ id: number; text: string }[]>([]);
    const [newItemText, setNewItemText] = React.useState('');

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleNoteChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        value: number
    ) => {
        setNotes({ ...notes, [value]: event.target.value });
    };

    const handleNoteEdit = (value: number) => () => {
        setEditNote(editNote === value ? null : value); // Toggle the edit mode
    };

    const handleAddItem = () => {
        if (newItemText.trim() !== '') {
            const newItem = {
                id: items.length > 0 ? items[items.length - 1].id + 1 : 0,
                text: newItemText.trim(),
            };
            setItems([...items, newItem]);
            setNewItemText('');
        }
    };

    const handleRemoveItem = (id: number) => () => {
        setItems(items.filter((item) => item.id !== id));
        setChecked(checked.filter((value) => value !== id));

        const newNotes = { ...notes };
        delete newNotes[id];
        setNotes(newNotes);

        if (editNote === id) {
            setEditNote(null);
        }
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            sx={{ minHeight: '100vh' }}
        >
            <Box
                display="flex"
                alignItems="center"
                sx={{ mb: 2 }}
            >
                <TextField
                    label="New item"
                    variant="outlined"
                    size="small"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    sx={{ width: '70%', marginRight: 1 }}
                />
                <Button variant="contained" onClick={handleAddItem}>
                    Add Item
                </Button>
            </Box>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {items.map((item) => {
                    const labelId = `checkbox-list-label-${item.id}`;

                    return (
                        <ListItem key={item.id} alignItems="flex-start">
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.includes(item.id)}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    onClick={handleToggle(item.id)}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                primary={item.text}
                                secondary={
                                    notes[item.id] && (
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {notes[item.id]}
                                        </Typography>
                                    )
                                }
                            />
                            <IconButton edge="end" aria-label="comments" onClick={handleNoteEdit(item.id)}>
                                <CommentIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={handleRemoveItem(item.id)}>
                                <DeleteIcon />
                            </IconButton>
                            {editNote === item.id && (
                                <TextField
                                    label="Add a note"
                                    variant="outlined"
                                    size="small"
                                    value={notes[item.id] || ''}
                                    onChange={(event) => handleNoteChange(event, item.id)}
                                    sx={{ ml: 2, width: '70%' }}
                                />
                            )}
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
}