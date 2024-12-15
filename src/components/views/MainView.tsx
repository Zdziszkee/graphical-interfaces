import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CenteringBox from '../common/CenteringBox';
import Logo from '../common/Logo';

const MainView: React.FC = () => {
  const [likedIndex, setLikedIndex] = useState<number | null>(null); // Track liked state for each view

  const toggleLike = (index: number) => {
    setLikedIndex((prev) => (prev === index ? null : index)); // Toggle like for the current view
  };

  const views = [
    { id: 1, src: '/cooking_gif_1.gif', title: 'Pasta prawns', user: 'Mike' },
    { id: 2, src: '/cooking_gif_2.gif', title: 'Stir Fry Veggies', user: 'Anna' },
  ];

  return (
    <CenteringBox>
      {/* Phone-like container */}
      <Box
        sx={{
          position: 'relative',
          width: '360px', // Fixed phone width
          height: '640px', // Fixed phone height
          backgroundColor: 'black',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Scrollable container */}
        <Box
          sx={{
            height: '100%',
            width: '100%',
            overflowY: 'scroll',
            scrollSnapType: 'y mandatory',
            scrollbarWidth: 'none', // Hide scrollbar for Firefox
            '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for Webkit browsers
          }}
        >
          {/* Map through views */}
          {views.map((view, index) => (
            <Box
              key={view.id}
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                scrollSnapAlign: 'start',
                backgroundColor: 'black',
              }}
            >
              {/* Background GIF */}
              <Box
                component="img"
                src={view.src}
                alt={view.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              />

              {/* Top Section */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  right: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: 2,
                }}
              >
                <Logo />
                <IconButton sx={{ color: 'white' }}>
                  <AccountCircleIcon fontSize="large" />
                </IconButton>
              </Box>

              {/* Right Section */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 16,
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  zIndex: 2,
                }}
              >
                {/* Heart Toggle */}
                <IconButton
                  onClick={() => toggleLike(index)}
                  sx={{ color: likedIndex === index ? 'red' : 'white' }}
                >
                  {likedIndex === index ? (
                    <FavoriteIcon fontSize="large" />
                  ) : (
                    <FavoriteBorderIcon fontSize="large" />
                  )}
                </IconButton>

                {/* Send Button */}
                <IconButton sx={{ color: 'white' }}>
                  <SendIcon fontSize="large" />
                </IconButton>
              </Box>

              {/* Bottom Section */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  right: 16,
                  color: 'white',
                  zIndex: 2,
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <AccountCircleIcon />
                  <Typography variant="body1" fontWeight="bold">
                    {view.user}
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight="bold" mt={1}>
                  {view.title}
                </Typography>
                <Typography variant="body2" color="grey.300">
                  Tap to see in recipes...
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </CenteringBox>
  );
};

export default MainView;
