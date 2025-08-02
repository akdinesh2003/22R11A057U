import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  Snackbar,
  Paper
} from '@mui/material';
import axios from 'axios';

const UrlShortener = () => {
  const [urls, setUrls] = useState([
    { url: '', validity: 30, shortcode: '', shortLink: '', expiry: '', error: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const addUrl = () => {
    if (urls.length < 5) {
      setUrls([...urls, { url: '', validity: 30, shortcode: '', shortLink: '', expiry: '', error: '' }]);
    }
  };

  const removeUrl = (index) => {
    if (urls.length > 1) {
      const newUrls = urls.filter((_, i) => i !== index);
      setUrls(newUrls);
    }
  };

  const updateUrl = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    newUrls[index].error = '';
    setUrls(newUrls);
  };

  const createShortUrls = async () => {
    setLoading(true);
    const newUrls = [...urls];
    let successCount = 0;

    try {
      for (let i = 0; i < newUrls.length; i++) {
        const urlData = newUrls[i];
        if (urlData.url.trim()) {
          try {
            const response = await axios.post('/shorturls', {
              url: urlData.url.trim(),
              validity: urlData.validity ? parseInt(urlData.validity) : 30,
              shortcode: urlData.shortcode.trim() || undefined
            });

            newUrls[i] = {
              ...urlData,
              shortLink: response.data.shortLink,
              expiry: response.data.expiry,
              error: ''
            };
            successCount++;
          } catch (error) {
            newUrls[i].error = error.response?.data?.error || 'Failed to create short URL';
          }
        }
      }

      setUrls(newUrls);
      
      if (successCount > 0) {
        setSnackbar({ 
          open: true, 
          message: `Created ${successCount} short URL(s)`, 
          severity: 'success' 
        });
      }
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: 'Error creating short URLs', 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Shorten up to 5 URLs at once. Each URL can have custom validity and shortcode.
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">URLs to Shorten</Typography>
            <Button
              variant="outlined"
              onClick={addUrl}
              disabled={urls.length >= 5}
            >
              Add URL
            </Button>
          </Box>

          {urls.map((urlData, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2, border: urlData.error ? '1px solid #f44336' : '1px solid #e0e0e0' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Original URL"
                    value={urlData.url}
                    onChange={(e) => updateUrl(index, 'url', e.target.value)}
                    error={!!urlData.error}
                    helperText={urlData.error}
                    placeholder="https://example.com/very-long-url"
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    fullWidth
                    label="Validity (minutes)"
                    type="number"
                    value={urlData.validity}
                    onChange={(e) => updateUrl(index, 'validity', e.target.value)}
                    inputProps={{ min: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Custom Shortcode (optional)"
                    value={urlData.shortcode}
                    onChange={(e) => updateUrl(index, 'shortcode', e.target.value)}
                    placeholder="mycustom123"
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeUrl(index)}
                    disabled={urls.length === 1}
                    fullWidth
                  >
                    Remove
                  </Button>
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    #{index + 1}
                  </Typography>
                </Grid>
              </Grid>

              {urlData.shortLink && (
                <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Shortened URL:
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      wordBreak: 'break-all',
                      fontFamily: 'monospace',
                      bgcolor: 'white',
                      p: 1,
                      borderRadius: 1,
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    {urlData.shortLink}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Expires: {new Date(urlData.expiry).toLocaleString()}
                  </Typography>
                </Box>
              )}
            </Paper>
          ))}

          <Button
            variant="contained"
            size="large"
            onClick={createShortUrls}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? 'Creating...' : `Create ${urls.length} Short URL(s)`}
          </Button>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UrlShortener; 