import React, { useState } from 'react';
import { Avatar, Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePic: 'https://via.placeholder.com/150',
  });
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);

  const handleEdit = () => setEditMode(!editMode);

  const handleSave = () => {
    setEditMode(false);
    if (profilePicFile) {
      const newProfilePic = URL.createObjectURL(profilePicFile);
      setUserInfo((prev) => ({ ...prev, profilePic: newProfilePic }));
      setProfilePicFile(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicFile(e.target.files[0]);
    }
  };

  const handleReturn = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
        p: 2,
      }}
    >
      {/* Profile Picture */}
      <Box sx={{ position: 'relative', mb: 2 }}>
        <Avatar
          src={profilePicFile ? URL.createObjectURL(profilePicFile) : userInfo.profilePic}
          alt={userInfo.name}
          sx={{ width: 100, height: 100 }}
        />
        {editMode && (
          <IconButton
            component="label"
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '50%',
              boxShadow: 2,
              '&:hover': {
                backgroundColor: 'gray',
              },
            }}
          >
            <PhotoCamera />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleProfilePicChange}
            />
          </IconButton>
        )}
      </Box>

      <Typography variant="h4" gutterBottom>
        {userInfo.name}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        {userInfo.email}
      </Typography>

      {/* Editable Fields */}
      <Box sx={{ width: '100%', maxWidth: 400, mt: 2 }}>
        <TextField
          label="Name"
          name="name"
          value={userInfo.name}
          onChange={handleInputChange}
          fullWidth
          disabled={!editMode}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          name="email"
          value={userInfo.email}
          onChange={handleInputChange}
          fullWidth
          disabled={!editMode}
        />
      </Box>

      {/* Action Buttons */}
      <Button
        variant="contained"
        color={editMode ? 'success' : 'primary'}
        startIcon={editMode ? <SaveIcon /> : <EditIcon />}
        sx={{ mt: 3 }}
        onClick={editMode ? handleSave : handleEdit}
      >
        {editMode ? 'Save Changes' : 'Edit Profile'}
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={handleReturn}
      >
        Return to Main Page
      </Button>
    </Box>
  );
};

export default ProfilePage;
