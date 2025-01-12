import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Grid2,
    Typography,
    Modal,
    Box,
} from '@mui/material';
import {
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppContext } from '../../AppContext';
import { useTheme } from '@mui/material/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const RecipesView: React.FC = () => {
    const { recipes, addToShoppingList, shoppingLists, selectShoppingList, selectedShoppingList, fridge } = useAppContext();
    const [selectedRecipe, setSelectedRecipe] = useState<typeof recipes[0] | null>(null);
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const handleOpen = (recipe: typeof recipes[0]) => {
        setSelectedRecipe(recipe);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedRecipe(null);
    };

    const isIngredientInFridge = (ingredientName: string, requiredAmount: number) => {
      const ingredientInFridge = fridge.find(item => item.name === ingredientName);
      return ingredientInFridge ? ingredientInFridge.amount >= requiredAmount : false;
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Recipes
            </Typography>
            <Grid2 container spacing={2}>
                {recipes.map((recipe) => (
                    <Box
                        key={recipe.id}
                        sx={{
                            gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4', lg: 'span 3' },
                        }}
                    >
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardActionArea onClick={() => handleOpen(recipe)} sx={{ flexGrow: 1 }}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        height: 140,
                                        objectFit: 'cover',
                                    }}
                                    image={recipe.photo}
                                    alt={recipe.name}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {recipe.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Box>
                ))}
            </Grid2>


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
                        <List>
                            {selectedRecipe.ingredients.map((ingredient) => {
                              const isInFridge = isIngredientInFridge(ingredient.name, ingredient.amount);
                              console.log(isInFridge)
                              return (<>
                                <ListItem style={{color: isInFridge ? theme.palette.success.main : theme.palette.error.main, }} key={ingredient.name}>
                                  <ListItemText
                                     primary={ingredient.name} secondary={`${ingredient.amount} ${ingredient.unit}`} />
                                <IconButton onClick={() => addToShoppingList(ingredient, selectedShoppingList)}>
                                  <ShoppingCartOutlinedIcon />
                                </IconButton>
                              </ListItem>
                                <Divider variant="middle" component="li" />
                              </>)
                            })}
                        </List>
                        <Typography variant="h6" mt={2}>Steps:</Typography>
                        <List>
                            {selectedRecipe.steps.map((step, index) => (
                              <>
                                <ListItem key={index}>
                                  <ListItemText>{index + 1}. {step}</ListItemText>
                                </ListItem>
                                <Divider variant="middle" component="li" />
                              </>
                              ))}
                        </List>
                    </Box>
                  )}
              </Box>
          </Modal>
      </div>
    );
};

export default RecipesView;
