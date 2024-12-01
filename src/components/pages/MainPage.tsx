import NavBar from "../common/NavBar";
import MainView from "../views/MainView";
import FridgeView from "../views/FridgeView";
import RecipesView from "../views/RecipesView";
import ShoppingListView from "../views/ShoppingListView";
import { useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";



const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const views = [<MainView />, <FridgeView />, <ShoppingListView />, <RecipesView />];
  const icons = [
    <ShoppingCartOutlinedIcon />,
    <AutoStoriesOutlinedIcon />,
    <KitchenOutlinedIcon />,
    <CalendarMonthOutlinedIcon />
  ];

  return (
      <>
        <NavBar
            currentIdx={currentPage}
            updateCurrentIdx={setCurrentPage}
            views={views}
            icons={icons}
        />
        {views[currentPage]}
      </>
  );
};

export default MainPage;