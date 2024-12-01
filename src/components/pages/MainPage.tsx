import NavBar from "../common/NavBar";
import MainView from "../views/MainView";
import FridgeView from "../views/FridgeView";
import RecipesView from "../views/RecipesView";
import ShoppingListView from "../views/ShoppingListView";
import MealPlannerView from "../views/MealPlannerView";
import { useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';



const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const views = [<MainView />, <FridgeView />, <ShoppingListView />, <RecipesView />, <MealPlannerView />];
  const icons = [
          <HomeOutlinedIcon />,
      <KitchenOutlinedIcon />,
    <ShoppingCartOutlinedIcon />,
    <AutoStoriesOutlinedIcon />,
    <CalendarMonthOutlinedIcon />
  ];

  return (
      <>
        <NavBar
            currentIdx={currentPage}
            updateCurrentIdx={setCurrentPage}
            icons={icons}
        />
        {views[currentPage]}
      </>
  );
};

export default MainPage;