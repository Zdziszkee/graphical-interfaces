import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CenteringBox from "../common/CenteringBox";
import { Button, Link, Typography } from '@mui/material';
import {useState} from 'react'
import Logo from '../common/Logo';
import {useNavigate} from 'react-router-dom'; // Import useNavigate



const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const isFormFilled = username.trim() !== '' && password.trim() !== '';
    const navigateFunction = useNavigate();
    const handleRegisterClick = () => {
        navigateFunction('/register');
    };

    const handleLoginClick = () => {
        navigateFunction('/');

    };

    const handleForgotPasswordClick = () => {
        navigateFunction('/forgot-password');
    };

    return (
        <CenteringBox>
            <Typography variant={"h4"} sx={{fontWeight: 500, mb: 1}}>Welcome to</Typography>
            <Logo />
            <Box
                component="form"
                sx={{display: 'flex', flexDirection: 'column', placeItems: 'center', gap: '1em', "mt": 5}}
                noValidate
                autoComplete="off"
            >
                <TextField
                    variant="outlined"
                    id="outlined-required"
                    label="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Link
                    sx={{ alignSelf: 'center', fontSize: '0.875rem', cursor: 'pointer', textDecoration: 'none', color: 'text.primary' }}
                    onClick={handleForgotPasswordClick}
                >
                    Forgot Password?
                </Link>
                <Box sx={{display: 'flex', gap: '2em', justifyContent: 'space-between'}}>

                    <Button variant="contained" onClick = {handleLoginClick} disabled={!isFormFilled}
                    >
                        Login
                    </Button>
                    <Button variant="contained"
                            onClick={handleRegisterClick}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </CenteringBox>
    );
};

export default LoginPage;


