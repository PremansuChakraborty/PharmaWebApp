import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <Box className="flex justify-center w-screen m-2">
      <CircularProgress />
    </Box>
  );
}