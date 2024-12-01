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

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});


function App() {
  return (
      <ThemeProvider theme={darkTheme}>
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
