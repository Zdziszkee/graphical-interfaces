import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import CenteringBox from "../common/CenteringBox";
import Box from "@mui/material/Box";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {displaySuccessNotification} from "../../utils/displayNotification";


function ForgotPasswordPage() {
    const [inputText, setInputText] = useState("");

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value);
    }

    function notifyAndReset() {
        displaySuccessNotification("Password reset link has been sent to your email!")
        setInputText("");
    }

    return (
        <CenteringBox>
            <ToastContainer />
            <Box sx={{display: 'flex', alignItems: 'center', gap: '1em', flexDirection: 'column'}}>
            <h2>Forgot Password</h2>
                <TextField
                    variant="filled"
                    label="Email Address"
                    required
                    type="email"
                    value={inputText}
                    onChange={handleInputChange}
                />
                <Button disabled={!inputText.trim()} variant="contained" type="submit" onClick={notifyAndReset}>
                    Reset Password
                </Button>
            </Box>
        </CenteringBox>
    );
}

export default ForgotPasswordPage;
