import React, { useState } from 'react';
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Modal,
    Box,
    Button,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid2, GridProps
} from '@mui/material';
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