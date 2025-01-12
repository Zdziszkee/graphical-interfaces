import * as React from 'react';
import { SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { AccountCircle } from "@mui/icons-material";

export default function NavBar(
    {
        updateCurrentIdx,
        currentIdx,
        icons
    }:
    {
        updateCurrentIdx: React.Dispatch<SetStateAction<number>>,
        currentIdx: number,
        icons: React.ReactNode[]
    }
) {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleIconClick = (index: number) => {
        updateCurrentIdx(index);
    };

    const handleProfileClick = () => {
        navigate('/profile'); // Navigate directly to the Profile Page
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        {icons.map((icon, index) => (
                            <IconButton
                                key={index}
                                size="large"
                                edge="start"
                                color={index === currentIdx ? "secondary" : "inherit"}
                                aria-label="menu"
                                sx={{
                                    mr: 2,
                                    backgroundColor: index === currentIdx ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                                    borderRadius: 1,
                                }}
                                onClick={() => handleIconClick(index)}
                            >
                                {icon}
                            </IconButton>
                        ))}
                    </Box>

                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        onClick={handleProfileClick} // Navigate directly when clicked
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
