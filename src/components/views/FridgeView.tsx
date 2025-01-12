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
import {Grid, Card, CardContent, CardActions } from '@mui/material';


const FridgeView: React.FC = () => {
  const { fridge, setFridge } = useAppContext();
  const [newItem, setNewItem] = useState<string>('');
  const [newAmount, setNewAmount] = useState<number>(1);
  const [newUnit, setNewUnit] = useState<string>('');
  const [units, setUnits] = useState<string[]>(['kg', 'g', 'l', 'ml', 'pieces']);

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

  return (
      <CenteringBox>
        <ToastContainer />

        <Box
          sx={{
            width: '100%',
            maxWidth: '600px',
            padding: 2,
            bgcolor: '#f0f8ff', // Light fridge-like background
            borderRadius: 2,
            border: '2px solid #e0e0e0',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Your Fridge
          </Typography>

          {/* Fridge Items */}
          <Box sx={{
            mt: 2,
            mb: 2,
            maxHeight: '400px', // Limit height
            overflowY: 'auto', // Enable vertical scrolling
            padding: 1,
            bgcolor: '#ffffff',
            borderRadius: 2,
            border: '1px solid #ddd',
          }}>
            <Grid container spacing={2}>
              {fridge.length > 0 ? (
                fridge.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.name}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        borderRadius: 2,
                        border: '1px solid #ddd',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        bgcolor: '#fff',
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography color="textSecondary">
                          {item.amount} {item.unit || ''}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'space-between' }}>
                        <IconButton
                          onClick={() => increment(item.name)}
                          color="primary"
                          size="small"
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => decrement(item.name)}
                          color="secondary"
                          size="small"
                        >
                          <RemoveIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteItem(item.name)}
                          color="error"
                          size="small"
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography align="center" color="textSecondary">
                  No items in the fridge. Add something!
                </Typography>
              )}
            </Grid>
          </Box>

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
