import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CenteringBox from '../common/CenteringBox';
import { useAppContext } from '../../AppContext';

const FridgeView: React.FC = () => {
  const { fridge, setFridge } = useAppContext(); // Access fridge and setFridge from global context
  const [newItem, setNewItem] = useState<string>(''); // Name input for new item
  const [newAmount, setNewAmount] = useState<number>(1); // Amount input for new item

  // Increment an item's amount
  const increment = (name: string) => {
    setFridge((prevFridge) =>
      prevFridge.map((item) =>
        item.name === name ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  // Decrement an item's amount
  const decrement = (name: string) => {
    setFridge((prevFridge) =>
      prevFridge.map((item) =>
        item.name === name && item.amount > 1 ? { ...item, amount: item.amount - 1 } : item
      )
    );
  };

  // Delete an item from the fridge
  const deleteItem = (name: string) => {
    setFridge((prevFridge) => prevFridge.filter((item) => item.name !== name));
  };

  // Add a new item to the fridge
  const addItem = () => {
    if (newItem.trim() === '') return;
    setFridge((prevFridge) => {
      const existingItem = prevFridge.find((item) => item.name === newItem);
      if (existingItem) {
        return prevFridge.map((item) =>
          item.name === newItem ? { ...item, amount: item.amount + newAmount } : item
        );
      }
      return [...prevFridge, { name: newItem, amount: newAmount, unit: '' }];
    });
    setNewItem('');
    setNewAmount(1);
  };

  return (
    <CenteringBox>
      <Box width="100%" maxWidth="400px" p={2}>
        <Typography variant="h4" align="center" gutterBottom>
          Fridge
        </Typography>

        {/* Fridge Items List */}
        {fridge.length > 0 ? (
          fridge.map((item) => (
            <Box
              key={item.name}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={1}
            >
              <Typography>
                {item.name} ({item.amount} {item.unit || ''})
              </Typography>
              <Box>
                <IconButton onClick={() => increment(item.name)} size="small" color="primary">
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => decrement(item.name)} size="small" color="secondary">
                  <RemoveIcon />
                </IconButton>
                <IconButton
                  onClick={() => deleteItem(item.name)}
                  size="small"
                  color="error"
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            </Box>
          ))
        ) : (
          <Typography align="center" color="textSecondary">
            No items in the fridge. Add something!
          </Typography>
        )}

        {/* Add New Item */}
        <Box display="flex" flexDirection="column" mt={2}>
          <TextField
            label="New Item"
            variant="outlined"
            size="small"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            margin="dense"
          />
          <TextField
            label="Amount"
            type="number"
            variant="outlined"
            size="small"
            value={newAmount}
            onChange={(e) => setNewAmount(parseInt(e.target.value) || 1)}
            margin="dense"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addItem}
            style={{ marginTop: '10px' }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </CenteringBox>
  );
};

export default FridgeView;
