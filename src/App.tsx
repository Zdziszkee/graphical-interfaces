import React from 'react';
import './App.css';
import LoginPage from "./components/pages/LoginPage";
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from "@mui/material";
import RegisterPage from "./components/pages/RegisterPage";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#cfb528', // Golden yellow
      contrastText: '#FFFFFF', // White text for contrast
    },
    secondary: {
      main: '#8B0000', // Dark red
      contrastText: '#FFFFFF', // White text for contrast
    },
    text: {
      primary: '#333333', // Dark gray for main text
      secondary: '#555555', // Slightly lighter gray for secondary text
    },
    error: {
      main: '#FF0000', // Red for error
    },
    success: {
      main: '#008000', // Green for success
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Default font
    h1: { color: '#333333' }, // Ensure headers use the text color
    h2: { color: '#333333' },
    body1: { color: '#333333' },
    body2: { color: '#555555' }, // For secondary text
  },
});

function App() {
  return (
      <ThemeProvider theme={theme}>
            <ToastContainer />
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<MainPage />}/>
                  <Route path="/login" element={<LoginPage />} /> {/* Login page route */}
                  <Route path="/register" element={<RegisterPage />} /> {/* Register page route */}
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* New Forgot Password Route */}
              </Routes>
          </BrowserRouter>

        <CssBaseline />
      </ThemeProvider>
  );
}

export default App;
