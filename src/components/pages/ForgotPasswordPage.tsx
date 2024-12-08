import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import CenteringBox from "../common/CenteringBox";
import Box from "@mui/material/Box";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {displaySuccessNotification} from "../../utils/displayNotification";
import WelcomeBanner from '../common/WelcomeBanner';


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
          <WelcomeBanner />
            <Box sx={{display: 'flex', alignItems: 'center', gap: '1em', flexDirection: 'column', "mt": 4}}>
            <Typography sx={{m: 0}} variant={"h6"}>Forgot Password</Typography>
                <TextField
                    variant="outlined"
                    label="Email Address"
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
