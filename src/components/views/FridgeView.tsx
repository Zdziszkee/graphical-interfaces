import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Updated Icon Import
import CenteringBox from "../common/CenteringBox";

const FridgeView: React.FC = () => {
  const [items, setItems] = useState<{ id: number; name: string; amount: number }[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  const [newAmount, setNewAmount] = useState<number>(1);

  const increment = (id: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, amount: item.amount + 1 } : item)));
  };

  const decrement = (id: number) => {
    setItems(items.map((item) => (item.id === id && item.amount > 1 ? { ...item, amount: item.amount - 1 } : item)));
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const addItem = () => {
    if (newItem.trim() === '') return;
    setItems([...items, { id: Date.now(), name: newItem, amount: newAmount > 0 ? newAmount : 1 }]);
    setNewItem('');
    setNewAmount(1);
  };

  return (
    <CenteringBox>
      <Box width="100%" maxWidth="400px" p={2}>
        <Typography variant="h4" align="center" gutterBottom>
          Fridge
        </Typography>
        {items.length > 0 ? (
          items.map((item) => (
            <Box
              key={item.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={1}
            >
              <Typography>{item.name} ({item.amount})</Typography>
              <Box>
                <IconButton onClick={() => increment(item.id)} size="small" color="primary">
                  <AddIcon sx={{ color: 'black' }} />
                </IconButton>
                <IconButton onClick={() => decrement(item.id)} size="small" color="secondary">
                  <RemoveIcon />
                </IconButton>
                <IconButton onClick={() => deleteItem(item.id)} size="small" color="error">
                  <DeleteOutlineIcon /> {/* Updated Icon */}
                </IconButton>
              </Box>
            </Box>
          ))
        ) : (
          <Typography align="center" color="textSecondary">
            No items in the fridge. Add something!
          </Typography>
        )}

        {/* Input for new items */}
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
