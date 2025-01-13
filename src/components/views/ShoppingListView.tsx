import React, { useState } from 'react';
import { Box, List, Typography, Paper, TextField, MenuItem, Button, Select, FormControl, InputLabel } from '@mui/material';
import ShoppingListItem from '../common/ShoppingListItem';
import { displayErrorNotification } from '../../utils/displayNotification';
import { useAppContext } from '../../AppContext'; // Adjust the import path

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

    const [newListName, setNewListName] = useState(''); // State for creating a new shopping list

    // Find the currently selected shopping list
    const currentList = shoppingLists.find((list) => list.name === selectedShoppingList);

    // Handle adding a new ingredient to the shopping list
    const handleAddIngredient = () => {
        const amount = parseFloat(newIngredient.amount);

        // Validate the amount
        if (isNaN(amount) || amount <= 0) {
            displayErrorNotification('Amount must be a number greater than 0'); // Show error notification
            return; // Stop the add operation
        }

        if (newIngredient.name.trim() && amount > 0) {
            addToShoppingList(
                { name: newIngredient.name, amount, unit: newIngredient.unit },
                selectedShoppingList
            );
            setNewIngredient({ name: '', amount: '', unit: 'grams' }); // Reset form
        }
    };

    // Handle creating a new shopping list
    const handleCreateList = () => {
        if (newListName.trim()) {
            createShoppingList(newListName);
            setNewListName(''); // Reset the input field
        }
    };

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

                {/* Shopping List Selection */}
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

                    {/* Create New Shopping List */}
                    <Box display="flex" gap={1} alignItems="center">
                        <TextField
                            label="New List Name"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            size="small"
                        />
                        <Button variant="contained" onClick={handleCreateList} sx={{ background: '#4caf50' }}>
                            Create
                        </Button>
                    </Box>
                </Box>

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
                            type="text" // Use type="text" instead of type="number"
                            value={newIngredient.amount}
                            onChange={(e) => setNewIngredient({ ...newIngredient, amount: e.target.value })}
                            size="small"
                            sx={{ width: 100 }}
                        />
                        <TextField
                            select
                            label="Unit"
                            value={newIngredient.unit}
                            onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
                            size="small"
                            sx={{ width: 120 }}
                        >
                            <MenuItem value="grams">grams</MenuItem>
                            <MenuItem value="ml">ml</MenuItem>
                            <MenuItem value="pieces">pieces</MenuItem>
                            <MenuItem value="tablespoons">tablespoons</MenuItem>
                            <MenuItem value="teaspoons">teaspoons</MenuItem>
                        </TextField>
                        <Button variant="contained" onClick={handleAddIngredient} sx={{ background: '#4caf50' }}>
                            Add
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
                                    note: '',
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