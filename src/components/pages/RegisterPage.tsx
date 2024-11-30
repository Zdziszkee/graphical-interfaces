import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import CenteringBox from "../common/CenteringBox";
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Registering:", { email, username, password });
        setPassword("");
        setEmail("");
        setUsername("");
        setConfirmPassword("");
        setPasswordMatch(false);
        navigate("/");
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

    return (
    <CenteringBox>
        <Box
            sx={{
                maxWidth: 400,
                margin: "auto",
                padding: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                boxShadow: 3,
                borderRadius: 2,
            }}
        >
            <Typography variant="h4" textAlign="center" gutterBottom>
                Register
            </Typography>

            <TextField
                label="Email"
                type="email"
                variant="filled"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
            />
            <TextField
                label="Username"
                value={username}
                variant="filled"
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                required
            />
            <TextField
                label="Password"
                type="password"
                variant="filled"
                value={password}
                onChange={handlePasswordChange}
                color={passwordMatch ? "success" : "error"} // Dynamically change color
                fullWidth
                required
                focused
            />
            <TextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                variant="filled"
                onChange={handleConfirmPasswordChange}
                color={passwordMatch ? "success" : "error"} // Dynamically change color
                fullWidth
                required
                focused
            />

            <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth disabled={!passwordMatch}>
                Register
            </Button>
        </Box>
    </CenteringBox>
    );
};

export default RegisterPage;
