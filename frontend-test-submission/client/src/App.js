import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import UrlShortener from './components/UrlShortener';
import UrlStatistics from './components/UrlStatistics';
import TermsAndConditions from './components/TermsAndConditions';

function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              URL Shortener
            </Typography>
            <Button 
              component={RouterLink} 
              to="/" 
              color="inherit"
              sx={{ mr: 2 }}
            >
              Shorten URLs
            </Button>
            <Button 
              component={RouterLink} 
              to="/statistics" 
              color="inherit"
              sx={{ mr: 2 }}
            >
              Statistics
            </Button>
            <Button 
              component={RouterLink} 
              to="/terms" 
              color="inherit"
            >
              Terms
            </Button>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<UrlShortener />} />
            <Route path="/statistics" element={<UrlStatistics />} />
            <Route path="/terms" element={<TermsAndConditions />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App; 