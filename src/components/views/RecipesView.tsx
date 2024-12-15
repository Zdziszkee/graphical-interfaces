// import { List, ListItemButton, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
// import ImageIcon from "@mui/icons-material/Image";
//
// const RecipesView = () => {
//     const recipes = [
//         {id: 1, name: "Medium rare steak", ingredients: [{name: "water", amount: "2 cups"}]}
//     ]
//
//     return <List sx={{ width: '100%', maxWidth: 360}}>
//         {["a", "b", "c"].map((elem, idx) => {
//             return <ListItemButton key={idx}>
//                 <ListItemAvatar>
//                     <Avatar>
//                         <ImageIcon />
//                     </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText primary={elem} secondary={elem} />
//             </ListItemButton>})}
//     </List>;
// }
//
// export default RecipesView;

// src/RecipeList.tsx
import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemButton, Typography, Modal, Box, Button, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppContext } from '../../AppContext';

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
      <div>
          <Typography variant="h4" gutterBottom>
              Recipes
          </Typography>
          <List>
              {recipes.map((recipe) => (
                <ListItem key={recipe.id}>
                    <ListItemButton onClick={() => handleOpen(recipe)}>
                        <ListItemText primary={recipe.name} />
                    </ListItemButton>
                </ListItem>
              ))}
          </List>

          <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 4,
                    boxShadow: 24,
                }}
              >
                  <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
                      <CloseIcon />
                  </IconButton>
                  {selectedRecipe && (
                    <>
                        <Typography variant="h5">{selectedRecipe.name}</Typography>
                        <Typography variant="h6" mt={2}>Ingredients:</Typography>
                        <FormControl fullWidth>
                            <InputLabel>Shopping List</InputLabel>
                            <Select
                              value={selectedShoppingList}
                              onChange={(e) => selectShoppingList(e.target.value)}
                              label="Shopping List"
                            >
                                {shoppingLists.map((list) => (
                                  <MenuItem key={list.name} value={list.name}>
                                      {list.name}
                                  </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <ul>
                            {selectedRecipe.ingredients.map((ingredient) => (
                              <li key={ingredient.name}>
                                  {ingredient.name} - {ingredient.amount} {ingredient.unit}
                                  <Button onClick={() => addToShoppingList(ingredient, selectedShoppingList)}>
                                      Add to Shopping List
                                  </Button>
                              </li>
                            ))}
                        </ul>
                        <Typography variant="h6" mt={2}>Steps:</Typography>
                        <ol>
                            {selectedRecipe.steps.map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </>
                  )}
              </Box>
          </Modal>
      </div>
    );
};

export default RecipesView;
