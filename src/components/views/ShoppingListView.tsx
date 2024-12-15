// ShoppingListView.tsx
import React, { useState, useEffect } from 'react';
import { Box, List, Typography } from '@mui/material';
import NewItemForm from '../common/NewItemForm';
import ShoppingListItem from '../common/ShoppingListItem';

export interface ShoppingItem {
    id: string;
    text: string;
    checked: boolean;
    note: string;
    creationDate: string; // Store as ISO string
}

export default function ShoppingListView() {
    const [items, setItems] = useState<ShoppingItem[]>([]);

    // Load items from local storage on component mount
    useEffect(() => {
        const storedItems = localStorage.getItem('shoppingListItems');
        if (storedItems) {
            // Parse the stored items and ensure dates are strings
            const parsedItems: ShoppingItem[] = JSON.parse(storedItems).map((item: any) => ({
                ...item,
                creationDate: item.creationDate || new Date().toISOString(),
            }));
            setItems(parsedItems);
        }
    }, []);

    // Save items to local storage whenever items change
    useEffect(() => {
        localStorage.setItem('shoppingListItems', JSON.stringify(items));
    }, [items]);

    const addItem = (text: string) => {
        const newItem: ShoppingItem = {
            id: Date.now().toString(),
            text,
            checked: false,
            note: '',
            creationDate: new Date().toISOString(),
        };
        setItems((prevItems) => [...prevItems, newItem]);
    };

    const removeItem = (id: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const toggleChecked = (id: string) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
        );
    };

    const updateItem = (updatedItem: ShoppingItem) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
    };

    // Sort items by creationDate (newest first)
    const sortedItems = [...items].sort(
        (a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    );

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            sx={{ minHeight: '100vh', p: 2 }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Shopping List
            </Typography>
            <Box display="flex" flexDirection="column" sx={{ width: '100%', maxWidth: 600 }}>
                <NewItemForm addItem={addItem} />
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {sortedItems.map((item) => (
                        <ShoppingListItem
                            key={item.id}
                            item={item}
                            removeItem={removeItem}
                            toggleChecked={toggleChecked}
                            updateItem={updateItem}
                        />
                    ))}
                </List>
            </Box>
        </Box>
    );
}