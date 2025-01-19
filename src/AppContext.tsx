// src/AppContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { displaySuccessNotification } from './utils/displayNotification';

// Define the type for an ingredient with a unit
export interface Ingredient {
	name: string;
	amount: number;
	unit: string; // e.g., 'grams', 'ml', 'pieces'
	checked?: boolean; // Optional property to track if the item is checked
}

// Define the type for a recipe with ingredients and steps
interface Recipe {
	id: number;
	name: string;
	ingredients: Ingredient[];
	image: string;
	steps: string[]; // List of steps for the recipe
	photo: string;
}

// Define the type for a shopping list
interface ShoppingList {
	name: string;
	ingredients: Ingredient[];
}

// Define the type for the context state
interface AppContextType {
	fridge: Ingredient[];
	setFridge: React.Dispatch<React.SetStateAction<Ingredient[]>>;
	shoppingLists: ShoppingList[];
	setShoppingLists: React.Dispatch<React.SetStateAction<ShoppingList[]>>;
	recipes: Recipe[];
	setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
	addToShoppingList: (ingredient: Ingredient, listName: string) => void;
	updateFridge: (ingredient: Ingredient) => void;
	createShoppingList: (name: string) => void;
	selectShoppingList: (name: string) => void;
	selectedShoppingList: string
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component props
interface AppProviderProps {
	children: ReactNode;
}

// Provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	// Fridge state with units
	const [fridge, setFridge] = useState<Ingredient[]>([
		{ name: 'Spaghetti', amount: 500, unit: 'grams' },
		{ name: 'Ground Beef', amount: 300, unit: 'grams' },
		{ name: 'Tomato Sauce', amount: 200, unit: 'ml' },
		{ name: 'Onion', amount: 2, unit: 'pieces' },
		{ name: 'Garlic', amount: 5, unit: 'cloves' },
		{ name: 'Broccoli', amount: 1, unit: 'head' },
		{ name: 'Soy Sauce', amount: 100, unit: 'ml' },
	]);

	const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([
		{ name: 'Weekly Shopping', ingredients: [] },
		{ name: 'Special Diet', ingredients: [] },
	]);

	const [selectedShoppingList, setSelectedShoppingList] = useState<string>('Weekly Shopping');

	const [recipes, setRecipes] = useState<Recipe[]>([
		{
			id: 1,
			name: 'Spaghetti Bolognese',
			ingredients: [
				{ name: 'Spaghetti', amount: 200, unit: 'grams' },
				{ name: 'Ground Beef', amount: 150, unit: 'grams' },
				{ name: 'Tomato Sauce', amount: 100, unit: 'ml' },
				{ name: 'Garlic', amount: 2, unit: 'cloves' },
				{ name: 'Onion', amount: 1, unit: 'pieces' },
			],
			image: "/spaghetti.jpeg",
			steps: [
				'Boil the spaghetti in salted water for 8-10 minutes.',
				'Sauté chopped onions and garlic in a pan.',
				'Add ground beef and cook until browned.',
				'Add tomato sauce and simmer for 10 minutes.',
				'Serve the sauce over the cooked spaghetti.',
			],
			photo: 'https://cdn.stoneline.de/media/c5/63/4f/1727429313/spaghetti-bolognese.jpeg',
		},
		{
			id: 2,
			name: 'Chicken Curry',
			ingredients: [
				{ name: 'Chicken', amount: 300, unit: 'grams' },
				{ name: 'Curry Powder', amount: 2, unit: 'tablespoons' },
				{ name: 'Coconut Milk', amount: 200, unit: 'ml' },
				{ name: 'Onion', amount: 1, unit: 'pieces' },
			],
			image: "/curry.jpg",
			steps: [
				'Sauté chopped onions until translucent.',
				'Add chicken pieces and brown them.',
				'Add curry powder and stir well.',
				'Pour in the coconut milk and simmer for 20 minutes.',
				'Serve with rice or naan.',
			],
			photo: 'https://assets.bonappetit.com/photos/61a7d632234db3ec67e4fdfa/1:1/w_2000,h_2000,c_limit/20211122%20Japanese%20Curry%20LEDE.jpg',
		},
	]);

	const addToShoppingList = (ingredient: Ingredient, listName: string) => {
		setShoppingLists((prevLists) => {
			return prevLists.map((list) => {
				if (list.name === listName) {
					const existingItem = list.ingredients.find((item) => item.name === ingredient.name);
					if (existingItem) {
						return {
							...list,
							ingredients: list.ingredients.map((item) =>
								item.name === ingredient.name ? { ...item, amount: item.amount + ingredient.amount } : item
							),
						};
					}
					return {
						...list,
						ingredients: [...list.ingredients, ingredient],
					};
				}
				return list;
			});
		});
		displaySuccessNotification("Item added to shopping list!");
	};

	const updateFridge = (ingredient: Ingredient) => {
		setFridge((prevFridge) => {
			const existingItem = prevFridge.find((item) => item.name === ingredient.name);
			if (existingItem) {
				return prevFridge.map((item) =>
					item.name === ingredient.name ? { ...item, amount: item.amount + ingredient.amount } : item
				);
			}
			return [...prevFridge, ingredient];
		});
	};

	const createShoppingList = (name: string) => {
		setShoppingLists((prevLists) => [
			...prevLists,
			{ name, ingredients: [] },
		]);
		displaySuccessNotification("Shopping list created successfully!");

	};

	const selectShoppingList = (name: string) => {
		setSelectedShoppingList(name);
	};

	return (
		<AppContext.Provider
			value={{
				fridge,
				setFridge,
				selectedShoppingList,
				shoppingLists,
				setShoppingLists,
				recipes,
				setRecipes,
				addToShoppingList,
				updateFridge,
				createShoppingList,
				selectShoppingList,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within an AppProvider');
	}
	return context;
};