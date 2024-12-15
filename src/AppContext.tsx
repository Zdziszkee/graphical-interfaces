// src/AppContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for an ingredient with a unit
interface Ingredient {
	name: string;
	amount: number;
	unit: string; // e.g., 'grams', 'ml', 'pieces'
}

// Define the type for a recipe with ingredients and steps
interface Recipe {
	id: number;
	name: string;
	ingredients: Ingredient[];
	steps: string[]; // List of steps for the recipe
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
			steps: [
				'Boil the spaghetti in salted water for 8-10 minutes.',
				'Sauté chopped onions and garlic in a pan.',
				'Add ground beef and cook until browned.',
				'Add tomato sauce and simmer for 10 minutes.',
				'Serve the sauce over the cooked spaghetti.',
			],
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
			steps: [
				'Sauté chopped onions until translucent.',
				'Add chicken pieces and brown them.',
				'Add curry powder and stir well.',
				'Pour in the coconut milk and simmer for 20 minutes.',
				'Serve with rice or naan.',
			],
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