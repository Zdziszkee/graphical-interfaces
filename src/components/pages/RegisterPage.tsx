import React, { useState } from "react";
:import { TextField, Button, Typography, Link, Box } from "@mui/material";
import CenteringBox from "../common/CenteringBox";
import WelcomeBanner from "../common/WelcomeBanner";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Registering:", { email, username, password });
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setPasswordMatch(false);
        navigate("/"); // Navigate to the main page after successful registration
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordMatch(newPassword === confirmPassword);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        setPasswordMatch(password === newConfirmPassword);
    };

    const handleLoginLinkClick = () => {
        navigate("/login"); // Redirect to login page
    };

    return (
        <CenteringBox>
            <WelcomeBanner />
            <Box
                component="form"
                sx={{display: 'flex', flexDirection: 'column', placeItems: 'center', gap: '1em', "mt": 5}}
                noValidate
                autoComplete="off"
            >

                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="Username"
                    value={username}
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={handlePasswordChange}
                    color={passwordMatch || password === "" ? "primary" : "error"}
                    required
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    color={passwordMatch || confirmPassword === "" ? "primary" : "error"}
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!passwordMatch || !email || !username || !password || !confirmPassword}
                    onClick={handleSubmit}
                >
                    Register
                </Button>
                <Typography variant="body2" align="center">
                    Already have an account?{" "}
                    <Link
                        onClick={handleLoginLinkClick}
                        style={{
                            cursor: "pointer",
                            textDecoration: "none",
                            color: "#8B0000", // Matches theme's secondary main color
                        }}
                    >
                        Login here
                    </Link>
                </Typography>
            </Box>
        </CenteringBox>
    );
};

export default RegisterPage;
