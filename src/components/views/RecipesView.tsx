import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Modal,
  Box,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppContext } from '../../AppContext';
import { useTheme } from '@mui/material/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MarginContainer from '../common/MarginContainer';
import { ToastContainer } from 'react-toastify';

const RecipesView: React.FC = () => {
  const { recipes, addToShoppingList, shoppingLists, selectShoppingList, selectedShoppingList, fridge } = useAppContext();
  const [selectedRecipe, setSelectedRecipe] = useState<typeof recipes[0] | null>(null);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Duplicating recipes for display
  const duplicatedRecipes = Array.from({ length: 30 }, (_, index) => recipes[index % recipes.length]);

  // Filter recipes by search query
  const filteredRecipes = duplicatedRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery)
  );

  return (
    <Box mt={3}>
      <ToastContainer />
      <MarginContainer>
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', mb: 3 }}>
          <TextField
            label="Search Recipes"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ flexGrow: 1 }}
          />
          {searchQuery && (
            <IconButton
              onClick={() => setSearchQuery('')}
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'gray',
              }}
              aria-label="Clear Search"
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        {filteredRecipes.length > 0 ? (
          <Grid container spacing={2}>
            {filteredRecipes.map((recipe, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={`${recipe.id}-${index}`}>
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1}}>
                  <CardActionArea onClick={() => handleOpen(recipe)}>
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
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" sx={{ mt: 3, textAlign: 'center' }}>
            No recipes found
          </Typography>
        )}
      </MarginContainer>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
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
          }}
        >
          {selectedRecipe && (
            <Box sx={{ position: 'relative' }}>
              <IconButton
                onClick={handleClose}
                sx={{ position: 'fixed', top: 8, right: 8, backgroundColor: 'primary.main', color: 'white' }}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Box
                component="img"
                src={selectedRecipe.photo}
                sx={{ maxWidth: '100%', maxHeight: '100%', mt: 2, borderRadius: '1em' }}
              />
              <Typography variant="h5" sx={{ mt: 2 }}>
                {selectedRecipe.name}
              </Typography>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Shopping List</InputLabel>
                <Select
                  value={selectedShoppingList}
                  onChange={(e) => selectShoppingList(e.target.value)}
                  label="Shopping List"
                  variant="outlined"
                >
                  {shoppingLists.map((list) => (
                    <MenuItem key={list.name} value={list.name}>
                      {list.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Ingredients:
              </Typography>
              <List>
                {selectedRecipe.ingredients.map((ingredient) => {
                  const isInFridge = isIngredientInFridge(ingredient.name, ingredient.amount);
                  return (
                    <React.Fragment key={ingredient.name}>
                      <ListItem
                        style={{
                          color: isInFridge ? theme.palette.success.main : theme.palette.error.main,
                        }}
                      >
                        <ListItemText primary={ingredient.name} secondary={`${ingredient.amount} ${ingredient.unit}`} />
                        <IconButton onClick={() => addToShoppingList(ingredient, selectedShoppingList)}>
                          <ShoppingCartOutlinedIcon />
                        </IconButton>
                      </ListItem>
                      <Divider variant="middle" component="li" />
                    </React.Fragment>
                  );
                })}
              </List>
              <Typography variant="h6" mt={2}>
                Steps:
              </Typography>
              <List>
                {selectedRecipe.steps.map((step, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText>
                        {index + 1}. {step}
                      </ListItemText>
                    </ListItem>
                    <Divider variant="middle" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default RecipesView;
