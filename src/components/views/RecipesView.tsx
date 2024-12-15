import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemButton, Typography, Modal, Box, Button, IconButton, Select, MenuItem, FormControl, InputLabel, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppContext } from '../../AppContext';
import RecipeListItem from './recipe/RecipeListItem';
import CenteringBox from '../common/CenteringBox';
import { ToastContainer } from 'react-toastify';
import { displaySuccessNotification } from '../../utils/displayNotification';

const RecipesView: React.FC = () => {
    const { recipes, addToShoppingList, shoppingLists, selectShoppingList, selectedShoppingList } = useAppContext();
    const [selectedRecipe, setSelectedRecipe] = useState<typeof recipes[0] | null>(null);
    const [open, setOpen] = useState(false);

    const handleOpen = (recipe: typeof recipes[0]) => {
        setSelectedRecipe(recipe);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedRecipe(null);
    };

    return (
      <>
          <ToastContainer />
          <Typography variant="h4" gutterBottom>
              Recipes
          </Typography>
          <List>
              {recipes.map((recipe) => (
                <RecipeListItem key={recipe.id} onClick={() => handleOpen(recipe)} name={recipe.name} image={recipe.image} />
              ))}
          </List>

          <Modal open={open} onClose={handleClose}>
              <Box sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                mt: 2,
                overflow: 'auto',
                backgroundColor: 'background.paper',
                px: 2,
                maxWidth: 600,
                margin: 'auto',
                borderRadius: 1,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                '@media (max-width: 600px)': {
                  maxHeight: '100%',
                  maxWidth: '100%',
                  padding: 1,
                },
              }}>

                  {selectedRecipe && (
                    <Box sx={{position: 'relative'}}>
                      <IconButton onClick={handleClose} sx={{ position: 'fixed', top: 8, right: 8,  backgroundColor: 'primary.main', color: 'white'}} aria-label="Close">
                        <CloseIcon />
                      </IconButton>
                      <Box component="img" src={selectedRecipe.image} sx={{maxWidth: '100%', maxHeight: '100%',  mt: 2, borderRadius: "1em"}} />
                      <Typography variant="h5" sx={{mt: 2}}>{selectedRecipe.name}</Typography>
                      <FormControl fullWidth sx={{mt: 2}}>
                        <InputLabel>Shopping List</InputLabel>
                        <Select
                          value={selectedShoppingList}
                          onChange={(e) => selectShoppingList(e.target.value)}
                          label="Shopping List"
                          variant="outlined">
                          {shoppingLists.map((list) => (
                            <MenuItem key={list.name} value={list.name}>
                              {list.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                        <Typography variant="h6" sx={{mt: 2}}>Ingredients:</Typography>
                        <List >
                            {selectedRecipe.ingredients.map((ingredient) => (
                              <>
                                <ListItem key={ingredient.name}>
                                  <ListItemText primary={ingredient.name} secondary={`${ingredient.amount} ${ingredient.unit}`} />
                                <Button onClick={() => addToShoppingList(ingredient, selectedShoppingList)}>
                                  Add to Shopping List
                                </Button>
                              </ListItem>
                                <Divider variant="middle" component="li" />
                              </>
                            ))}
                        </List>
                        <Typography variant="h6" mt={2}>Steps:</Typography>
                        <ol>
                            {selectedRecipe.steps.map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </Box>
                  )}
              </Box>
          </Modal>
      </>
    );
};

export default RecipesView;
