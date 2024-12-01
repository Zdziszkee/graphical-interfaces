import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CenteringBox from "../common/CenteringBox";
import {Button, Link} from "@mui/material";
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'; // Import useNavigate



const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Check if both fields are filled
    const isFormFilled = username.trim() !== '' && password.trim() !== '';
    const navigateFunction = useNavigate();
    const handleRegisterClick = () => {
        navigateFunction('/register'); // Redirect to the register page
    };

    const handleLoginClick = () => {
        navigateFunction('/'); // Redirect to the register page

    };

    const handleForgotPasswordClick = () => {
        navigateFunction('/forgot-password'); // Redirect to the forgot password page
    };

    return (
        <CenteringBox>
            <Box
                component="form"
                sx={{display: 'flex', flexDirection: 'column', placeItems: 'center', gap: '1em'}}
                noValidate
                autoComplete="off"
            >
                <TextField
                    required
                    variant="filled"
                    id="outlined-required"
                    label="Username"
                    onChange={(e) => setUsername(e.target.value)} // Update username state
                />
                <TextField
                    required
                    variant="filled"
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                />
                <Link
                    sx={{ alignSelf: 'center', fontSize: '0.875rem', cursor: 'pointer', textDecoration: 'none' }}
                    onClick={handleForgotPasswordClick}
                >
                    Forgot Password?
                </Link>
                <Box sx={{display: 'flex', gap: '2em', justifyContent: 'space-between'}}>

                    <Button variant="contained" onClick = {handleLoginClick} disabled={!isFormFilled} // Disable if the form is not filled
                    >
                        Login
                    </Button>
                    <Button variant="contained"
                            onClick={handleRegisterClick} // Handle register click
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </CenteringBox>
    );
};

export default LoginPage;


