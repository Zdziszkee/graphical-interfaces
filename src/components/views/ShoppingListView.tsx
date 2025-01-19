import React, { useState } from 'react';
import {
    Box,
    List,
    Typography,
    Paper,
    TextField,
    MenuItem,
    Button,
    Select,
    FormControl,
    InputLabel,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import ShoppingListItem from '../common/ShoppingListItem';
import { displayErrorNotification, displaySuccessNotification } from '../../utils/displayNotification';
import { useAppContext } from '../../AppContext';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ShoppingListView() {
    const {
        shoppingLists,
        selectedShoppingList,
        addToShoppingList,
        setShoppingLists,
        createShoppingList,
        selectShoppingList,
    } = useAppContext();

    const [newIngredient, setNewIngredient] = useState<{ name: string; amount: string; unit: string }>({
        name: '',
        amount: '',
        unit: 'grams',
    });

    const [newListName, setNewListName] = useState(''); // For the new list name in the dialog
    const [openCreateDialog, setOpenCreateDialog] = useState(false); // For create new list dialog
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // For delete confirmation

    // Find the currently selected shopping list
    const currentList = shoppingLists.find((list) => list.name === selectedShoppingList);

    const handleAddIngredient = () => {
        const amount = parseFloat(newIngredient.amount);

        if (isNaN(amount) || amount <= 0) {
            displayErrorNotification('Amount must be a number greater than 0');
            return;
        }

        if (newIngredient.name.trim() && amount > 0) {
            addToShoppingList(
                { name: newIngredient.name, amount, unit: newIngredient.unit },
                selectedShoppingList
            );
            setNewIngredient({ name: '', amount: '', unit: 'grams' });
        }
    };

    // Handle creating a new list (from the dialog)
    const handleCreateList = () => {
        if (newListName.trim()) {
            createShoppingList(newListName);
            setNewListName(''); // Clear the input
            setOpenCreateDialog(false); // Close the dialog
        }
    };

    const handleDeleteList = () => {
        if (selectedShoppingList) {
            setShoppingLists(shoppingLists.filter(list => list.name !== selectedShoppingList));
            selectShoppingList(shoppingLists[0]?.name || ''); // Select the first list or empty string if none exist
            setOpenDeleteDialog(false); // Close the dialog
            displaySuccessNotification("Shopping list deleted successfully!");
        }
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            sx={{ minHeight: '100vh', p: 2, background: '#f5f5f5' }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    p: 3,
                    background: '#fff9c4',
                    borderRadius: 2,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h4" align="center" gutterBottom sx={{ color: '#5d4037' }}>
                    Shopping List
                </Typography>

                {/* Shopping List Selection and Actions */}
                <Box display="flex" gap={2} alignItems="center" mb={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Select Shopping List</InputLabel>
                        <Select
                            value={selectedShoppingList}
                            onChange={(e) => selectShoppingList(e.target.value as string)}
                            label="Select Shopping List"
                        >
                            {shoppingLists.map((list) => (
                                <MenuItem key={list.name} value={list.name}>
                                    {list.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Create and Delete List Buttons */}
                    <Button
                        variant="contained"
                        onClick={() => setOpenCreateDialog(true)}
                        sx={{ background: '#4caf50', height: '40px' }}
                    >
                        Add {/* Button to create a new list */}
                    </Button>
                    <IconButton
                        aria-label="delete"
                        onClick={() => setOpenDeleteDialog(true)}
                        disabled={!selectedShoppingList}
                        sx={{ height: '40px' }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>

                {/* Dialog for Creating a New List */}
                <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
                    <DialogTitle>Create New Shopping List</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="List Name"
                            type="text"
                            fullWidth
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
                        <Button onClick={handleCreateList} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Confirmation Dialog for Delete */}
                <Dialog
                    open={openDeleteDialog}
                    onClose={() => setOpenDeleteDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete the shopping list "{selectedShoppingList}"?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
                        <Button onClick={handleDeleteList} autoFocus color="error">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* New Ingredient Form */}
                <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" gap={1} alignItems="center">
                        <TextField
                            label="Ingredient Name"
                            value={newIngredient.name}
                            onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                            fullWidth
                            size="small"
                        />
                        <TextField
                            label="Amount"
                            type="text"
                            value={newIngredient.amount}
                            onChange={(e) => setNewIngredient({ ...newIngredient, amount: e.target.value })}
                            size="small"
                            sx={{ width: 200 }}
                        />
                        <TextField
                            select
                            label="Unit"
                            value={newIngredient.unit}
                            onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
                            size="small"
                            sx={{ width: 200 }}
                        >
                            <MenuItem value="grams">grams</MenuItem>
                            <MenuItem value="ml">ml</MenuItem>
                            <MenuItem value="pieces">pieces</MenuItem>
                            <MenuItem value="tablespoons">tablespoons</MenuItem>
                            <MenuItem value="teaspoons">teaspoons</MenuItem>
                        </TextField>
                        <Button variant="contained" onClick={handleAddIngredient} sx={{ background: '#4caf50' }}>
                            Add {/* Button to add ingredient to list */}
                        </Button>
                    </Box>

                    {/* Shopping List Items */}
                    <List sx={{ width: '100%' }}>
                        {currentList?.ingredients.map((ingredient, index) => (
                            <ShoppingListItem
                                key={index}
                                item={{
                                    id: index.toString(),
                                    text: `${ingredient.name} - ${ingredient.amount} ${ingredient.unit}`,
                                    checked: false,
                                    note: '', // Note functionality not implemented yet
                                    creationDate: new Date().toISOString(),
                                }}
                                removeItem={() => {
                                    const updatedList = currentList.ingredients.filter((_, i) => i !== index);
                                    const updatedLists = shoppingLists.map((list) =>
                                        list.name === selectedShoppingList ? { ...list, ingredients: updatedList } : list
                                    );
                                    setShoppingLists(updatedLists);
                                }}
                                toggleChecked={() => {}}
                                updateItem={(updatedItem) => {
                                    const [name, amountWithUnit] = updatedItem.text.split(' - ');
                                    const [amount, unit] = amountWithUnit.split(' ');

                                    const updatedLists = shoppingLists.map((list) => {
                                        if (list.name === selectedShoppingList) {
                                            return {
                                                ...list,
                                                ingredients: list.ingredients.map((ingredient, i) =>
                                                    i.toString() === updatedItem.id
                                                        ? { ...ingredient, name, amount: parseFloat(amount), unit }
                                                        : ingredient
                                                ),
                                            };
                                        }
                                        return list;
                                    });
                                    setShoppingLists(updatedLists);
                                }}
                            />
                        ))}
                    </List>
                </Box>
            </Paper>
        </Box>
    );
}