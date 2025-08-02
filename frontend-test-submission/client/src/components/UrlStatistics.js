import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Alert,
  CircularProgress
} from '@mui/material';

const UrlStatistics = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const mockUrls = [
    {
      shortcode: 'abc123',
      originalUrl: 'https://example.com/very-long-url-that-needs-shortening',
      shortLink: 'http://localhost:5000/abc123',
      createdAt: '2024-01-15T10:30:00Z',
      expiry: '2024-01-15T11:00:00Z',
      totalClicks: 15,
      isExpired: false,
      clickDetails: [
        {
          timestamp: '2024-01-15T10:35:00Z',
          referrer: 'https://google.com',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          ip: '192.168.1.1',
          location: 'New York, US'
        },
        {
          timestamp: '2024-01-15T10:40:00Z',
          referrer: 'Direct',
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
          ip: '192.168.1.2',
          location: 'London, UK'
        }
      ]
    },
    {
      shortcode: 'xyz789',
      originalUrl: 'https://another-example.com/another-very-long-url',
      shortLink: 'http://localhost:5000/xyz789',
      createdAt: '2024-01-15T09:00:00Z',
      expiry: '2024-01-15T09:30:00Z',
      totalClicks: 8,
      isExpired: true,
      clickDetails: [
        {
          timestamp: '2024-01-15T09:15:00Z',
          referrer: 'https://facebook.com',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          ip: '192.168.1.3',
          location: 'San Francisco, US'
        }
      ]
    }
  ];

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    setLoading(true);
    setError('');
    
    try {
      setTimeout(() => {
        setUrls(mockUrls);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError('Failed to fetch URL statistics');
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          URL Statistics
        </Typography>
        <Button
          variant="outlined"
          onClick={fetchUrls}
        >
          Refresh
        </Button>
      </Box>

      {urls.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h6" textAlign="center" color="text.secondary">
              No shortened URLs found
            </Typography>
            <Typography variant="body2" textAlign="center" color="text.secondary">
              Create some short URLs to see their statistics here
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              All Shortened URLs ({urls.length})
            </Typography>
            
            {urls.map((url, index) => (
              <Box key={url.shortcode} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Shortcode: {url.shortcode}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Original URL: {url.originalUrl}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Short Link: {url.shortLink}
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Created: {formatDate(url.createdAt)}
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Expires: {formatDate(url.expiry)}
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Status: {url.isExpired ? 'Expired' : 'Active'}
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Total Clicks: {url.totalClicks}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  Click Details
                </Typography>
                
                {url.clickDetails.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No clicks recorded yet
                  </Typography>
                ) : (
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Timestamp</TableCell>
                          <TableCell>Referrer</TableCell>
                          <TableCell>User Agent</TableCell>
                          <TableCell>IP Address</TableCell>
                          <TableCell>Location</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {url.clickDetails.map((click, clickIndex) => (
                          <TableRow key={clickIndex}>
                            <TableCell>
                              {formatDate(click.timestamp)}
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ maxWidth: 200, wordBreak: 'break-all' }}>
                                {click.referrer}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ maxWidth: 300, wordBreak: 'break-all' }}>
                                {click.userAgent}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" fontFamily="monospace">
                                {click.ip}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {click.location}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            ))}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default UrlStatistics; 