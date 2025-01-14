import React from 'react';
import { Container, Grid, Typography, Link, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f8f8f8', padding: '20px 0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between" sx={{ textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Copyright Section */}
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              © 2024 [PHARMA]. All Rights Reserved.
            </Typography>
          </Grid>

          {/* Footer Links */}
          <Grid item xs={12} container spacing={2} justifyContent="center">
            <Grid item>
              <Link href="/contact-us" color="inherit" variant="body2">Contact Us</Link>
            </Grid>
            <Grid item>
              <Link href="/help" color="inherit" variant="body2">Help & Support</Link>
            </Grid>
            <Grid item>
              <Link href="/about-us" color="inherit" variant="body2">Get to Know Us</Link>
            </Grid>
            <Grid item>
              <Link href="/careers" color="inherit" variant="body2">Careers | Make Money with Us</Link>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
