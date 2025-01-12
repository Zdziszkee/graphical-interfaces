import React, { useState, useEffect } from 'react';
import { ListItem, ListItemText, IconButton, Checkbox, Typography, Box, TextField, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { displayErrorNotification } from '../../utils/displayNotification';

// Define the props interface for ShoppingListItem
interface ShoppingListItemProps {
    item: {
        id: string;
        text: string;
        checked: boolean;
        note: string;
        creationDate: string;
    };
    removeItem: () => void;
    toggleChecked: () => void;
    updateItem: (updatedItem: { id: string; text: string }) => void;
}

const ShoppingListItem: React.FC<ShoppingListItemProps> = ({
                                                               item,
                                                               removeItem,
                                                               toggleChecked,
                                                               updateItem,
                                                           }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [unit, setUnit] = useState('grams');

    // Parse the ingredient details from the text when the item changes
    useEffect(() => {
        const [parsedName, parsedAmountWithUnit] = item.text.split(' - ');
        const [parsedAmount] = parsedAmountWithUnit.split(' '); // Extract only the number
        setName(parsedName);
        setAmount(parsedAmount);
        setUnit(parsedAmountWithUnit.split(' ')[1]); // Extract the unit
    }, [item.text]);

    // Handle saving modifications
    const handleSave = () => {
        const parsedAmount = parseFloat(amount);

        // Validate the amount before saving
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            displayErrorNotification('Amount must be a number greater than 0'); // Show error notification
            return; // Stop the save operation
        }

        const updatedText = `${name} - ${amount} ${unit}`;
        updateItem({ id: item.id, text: updatedText });
        setIsEditing(false);
    };

    return (
        <ListItem
            sx={{
                borderBottom: '1px solid #e0e0e0',
                '&:last-child': { borderBottom: 'none' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: '8px',
            }}
        >
            {/* Checkbox and Item Text */}
            <Box display="flex" alignItems="center" flexGrow={1}>
                <Checkbox
                    checked={item.checked} // Use the checked prop
                    onChange={toggleChecked} // Connect to the toggleChecked function
                />
                {isEditing ? (
                    <Box display="flex" gap={1} alignItems="center">
                        <TextField
                            label="Ingredient Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // Update name
                            size="small"
                        />
                        <TextField
                            label="Amount"
                            type="text" // Use type="text" instead of type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)} // Update amount
                            size="small"
                            sx={{ width: 100 }}
                            error={parseFloat(amount) <= 0 || isNaN(parseFloat(amount))} // Show red border if amount is invalid
                        />
                        <TextField
                            select
                            label="Unit"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value as string)} // Update unit
                            size="small"
                            sx={{ width: 120 }}
                        >
                            <MenuItem value="grams">grams</MenuItem>
                            <MenuItem value="ml">ml</MenuItem>
                            <MenuItem value="pieces">pieces</MenuItem>
                            <MenuItem value="tablespoons">tablespoons</MenuItem>
                            <MenuItem value="teaspoons">teaspoons</MenuItem>
                        </TextField>
                    </Box>
                ) : (
                    <ListItemText
                        primary={item.text}
                        secondary={
                            <>
                                <Typography variant="body2" color="textSecondary">
                                    {item.note}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    Added on: {new Date(item.creationDate).toLocaleDateString()}
                                </Typography>
                            </>
                        }
                    />
                )}
            </Box>

            {/* Action Buttons */}
            <Box display="flex" alignItems="center">
                {isEditing ? (
                    <IconButton
                        aria-label="save"
                        onClick={handleSave}
                        disabled={parseFloat(amount) <= 0 || isNaN(parseFloat(amount))} // Disable if amount is invalid
                    >
                        <SaveIcon />
                    </IconButton>
                ) : (
                    <IconButton aria-label="edit" onClick={() => setIsEditing(true)}>
                        <EditIcon />
                    </IconButton>
                )}
                <IconButton aria-label="delete" onClick={removeItem}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </ListItem>
    );
};

export default ShoppingListItem;