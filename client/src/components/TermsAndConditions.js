import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button
} from '@mui/material';

const TermsAndConditions = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Terms and Conditions
      </Typography>
      
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            TERMS AND CONDITIONS FOR URL SHORTENER SERVICE
          </Typography>
          
          <Typography variant="body1" paragraph>
            1. ACCEPTANCE OF TERMS
          </Typography>
          <Typography variant="body2" paragraph sx={{ ml: 2 }}>
            By using this URL shortener service, you agree to these terms and conditions.
          </Typography>
          
          <Typography variant="body1" paragraph>
            2. SERVICE DESCRIPTION
          </Typography>
          <Typography variant="body2" paragraph sx={{ ml: 2 }}>
            This service allows you to create shortened URLs that redirect to original URLs.
          </Typography>
          
          <Typography variant="body1" paragraph>
            3. USER RESPONSIBILITIES
          </Typography>
          <Typography variant="body2" paragraph sx={{ ml: 2 }}>
            - You must not create links to illegal or harmful content
            - You must not spam or abuse the service
            - You are responsible for the content of your shortened URLs
          </Typography>
          
          <Typography variant="body1" paragraph>
            4. SERVICE LIMITATIONS
          </Typography>
          <Typography variant="body2" paragraph sx={{ ml: 2 }}>
            - URLs expire after 30 minutes by default
            - We do not guarantee 100% uptime
            - We may delete URLs that violate our terms
          </Typography>
          
          <Typography variant="body1" paragraph>
            5. PRIVACY
          </Typography>
          <Typography variant="body2" paragraph sx={{ ml: 2 }}>
            - We collect basic usage data (IP, user agent, referrer)
            - We do not sell your data to third parties
            - Data is stored temporarily and may be deleted
          </Typography>
          
          <Typography variant="body1" paragraph>
            6. DISCLAIMER
          </Typography>
          <Typography variant="body2" paragraph sx={{ ml: 2 }}>
            This service is provided "as is" without any warranties.
            We are not responsible for any damages or losses.
          </Typography>
          
          <Typography variant="body1" paragraph>
            7. CHANGES TO TERMS
          </Typography>
          <Typography variant="body2" paragraph sx={{ ml: 2 }}>
            We may update these terms at any time.
            Continued use means you accept the new terms.
          </Typography>
          
          <Typography variant="body1" paragraph>
            8. CONTACT
          </Typography>
          <Typography variant="body2" paragraph sx={{ ml: 2 }}>
            For questions about these terms, contact the service administrator.
          </Typography>
          
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button variant="contained" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TermsAndConditions; 