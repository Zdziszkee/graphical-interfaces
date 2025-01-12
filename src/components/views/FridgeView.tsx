import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CenteringBox from '../common/CenteringBox';
import { useAppContext } from '../../AppContext';
import { displayErrorNotification } from '../../utils/displayNotification';
import { ToastContainer } from 'react-toastify';

const FridgeView: React.FC = () => {
  const { fridge, setFridge } = useAppContext();
  const [newItem, setNewItem] = useState<string>('');
  const [newAmount, setNewAmount] = useState<number>(1);
  const [newUnit, setNewUnit] = useState<string>('');
  const [units, setUnits] = useState<string[]>(['kg', 'g', 'l', 'ml', 'pieces']);
  const [customUnit, setCustomUnit] = useState<string>('');

  const increment = (name: string) => {
    setFridge((prevFridge) =>
      prevFridge.map((item) =>
        item.name === name ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  const decrement = (name: string) => {
    setFridge((prevFridge) =>
      prevFridge.map((item) =>
        item.name === name && item.amount > 1 ? { ...item, amount: item.amount - 1 } : item
      )
    );
  };

  const deleteItem = (name: string) => {
    setFridge((prevFridge) => prevFridge.filter((item) => item.name !== name));
  };

  const addItem = () => {
    if (newItem.trim() === '') {
      displayErrorNotification('Item name is required.');
      return;
    }
    if (newAmount <= 0) {
      displayErrorNotification('Amount must be greater than 0.');
      return;
    }
    if (newUnit.trim() === '') {
      displayErrorNotification('Unit is required.');
      return;
    }
    setFridge((prevFridge) => {
      const existingItem = prevFridge.find((item) => item.name === newItem);
      if (existingItem) {
        return prevFridge.map((item) =>
          item.name === newItem ? { ...item, amount: item.amount + newAmount } : item
        );
      }
      return [...prevFridge, { name: newItem, amount: newAmount, unit: newUnit }];
    });
    setNewItem('');
    setNewAmount(1);
    setNewUnit('');
  };

  const addCustomUnit = () => {
    if (customUnit.trim() && !units.includes(customUnit)) {
      setUnits((prevUnits) => [...prevUnits, customUnit]);
      setCustomUnit('');
    }
  };

  return (
      <CenteringBox>
        <ToastContainer />

        <Box width="100%" maxWidth="400px" p={2}>
        <Typography variant="h4" align="center" gutterBottom>
          Fridge
        </Typography>

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
          <Select
            value={newUnit}
            onChange={(e) => setNewUnit(e.target.value)}
            displayEmpty
            variant="outlined"
            size="small"
            margin="dense"
          >
            <MenuItem value="" disabled>
              Select Unit
            </MenuItem>
            {units.map((unit) => (
              <MenuItem key={unit} value={unit}>
                {unit}
              </MenuItem>
            ))}
            <MenuItem value="custom">Add Custom Unit</MenuItem>
          </Select>

          {newUnit === 'custom' && (
            <Box mt={1} display="flex" flexDirection="column">
              <TextField
                label="Custom Unit"
                variant="outlined"
                size="small"
                value={customUnit}
                onChange={(e) => setCustomUnit(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={addCustomUnit}
                style={{ marginTop: '10px' }}
              >
                Add Custom Unit
              </Button>
            </Box>
          )}

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
