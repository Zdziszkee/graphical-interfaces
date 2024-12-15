import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Filled heart
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CenteringBox from '../common/CenteringBox';
import Logo from '../common/Logo';

const MainView: React.FC = () => {
  const [liked, setLiked] = useState<boolean>(false); // State to track heart toggle

  // Toggle the heart state
  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <CenteringBox>
      {/* Phone-like container */}
      <Box
        sx={{
          position: 'relative',
          width: '360px',
          height: '640px',
          backgroundColor: 'black',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Background GIF */}
        <Box
          component="img"
          src="/cooking_gif_1.gif" // Path to the GIF in the public folder
          alt="Cooking Animation"
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
          {/* Heart Toggle Button */}
          <IconButton onClick={toggleLike} sx={{ color: liked ? 'red' : 'white' }}>
            {liked ? <FavoriteIcon fontSize="large" /> : <FavoriteBorderIcon fontSize="large" />}
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
              Mike
            </Typography>
          </Box>
          <Typography variant="h6" fontWeight="bold" mt={1}>
            Pasta prawns
          </Typography>
          <Typography variant="body2" color="grey.300">
            Tap to see in recipes...
          </Typography>
        </Box>
      </Box>
    </CenteringBox>
  );
};

export default MainView;
