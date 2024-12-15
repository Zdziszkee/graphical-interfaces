import React, { useState } from 'react';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox,
    IconButton,
    Typography,
    Tooltip,
    Box,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteDialog from './NoteDialog';
import { ShoppingItem } from '../views/ShoppingListView';

interface ShoppingListItemProps {
    item: ShoppingItem;
    removeItem: (id: string) => void;
    toggleChecked: (id: string) => void;
    updateItem: (item: ShoppingItem) => void;
}

export default function ShoppingListItem({
                                             item,
                                             removeItem,
                                             toggleChecked,
                                             updateItem,
                                         }: ShoppingListItemProps) {
    const [openNoteDialog, setOpenNoteDialog] = useState(false);

    const handleNoteDialogOpen = () => {
        setOpenNoteDialog(true);
    };

    const handleNoteDialogClose = (note?: string) => {
        setOpenNoteDialog(false);
        if (note !== undefined) {
            updateItem({ ...item, note });
        }
    };

    // Format the creation date
    const creationDateTime = new Date(item.creationDate).toLocaleString();

    return (
        <>
            <ListItem
                alignItems="flex-start"
                sx={{ pl: 0 }}
                secondaryAction={
                    <>
                        <Tooltip title="Add/Edit Note">
                            <IconButton edge="end" aria-label="add note" onClick={handleNoteDialogOpen}>
                                <CommentIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Item">
                            <IconButton edge="end" aria-label="delete" onClick={() => removeItem(item.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                }
            >
                <ListItemIcon sx={{ minWidth: '36px' }}>
                    <Checkbox
                        edge="start"
                        checked={item.checked}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': `checkbox-list-label-${item.id}` }}
                        onChange={() => toggleChecked(item.id)}
                    />
                </ListItemIcon>
                <ListItemText
                    id={`checkbox-list-label-${item.id}`}
                    primary={
                        <Box>
                            <Typography
                                variant="body1"
                                style={{ textDecoration: item.checked ? 'line-through' : 'none' }}
                            >
                                {item.text}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                Added on: {creationDateTime}
                            </Typography>
                        </Box>
                    }
                    secondary={
                        item.note && (
                            <Typography variant="body2" color="text.secondary">
                                {item.note}
                            </Typography>
                        )
                    }
                />
            </ListItem>
            {/* Note Dialog */}
            <NoteDialog open={openNoteDialog} onClose={handleNoteDialogClose} note={item.note} />
        </>
    );
}