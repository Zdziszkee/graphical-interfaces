import * as React from 'react';
import {SetStateAction} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {AccountCircle} from "@mui/icons-material";


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
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleIconClick = (index: number) => {
        updateCurrentIdx(index);
    };

    return (
        <Box sx={{flexGrow: 1}}>
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
                                color={index === currentIdx ? "secondary" : "inherit"} // Zmieniono kolor
                                aria-label="menu"
                                sx={{
                                    mr: 2,
                                    backgroundColor: index === currentIdx ? 'rgba(255, 255, 255, 0.2)' : 'transparent', // Dodano tle
                                    borderRadius: 1,
                                }}
                                onClick={() => handleIconClick(index)}
                            >
                                {icon}
                            </IconButton>
                        ))}
                    </Box>

                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}