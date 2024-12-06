import React, { forwardRef, useRef } from 'react';
import { SnackbarProvider as NotistackProvider } from 'notistack';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';


export function SnackbarProvider({ children }: { children: React.ReactNode }) {



  const notistackRef = useRef(null);

  const onClose = (key: string) => () => {
    if (notistackRef && notistackRef?.current) {
      notistackRef?.current.closeSnackbar(key)
    }
  };

  return (
    <>
      <NotistackProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={3000}
        variant="success" // Set default variant
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        action={(key) => (
          <IconButton size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        )}
      >
        {children}
      </NotistackProvider>
    </>
  );
}


function SnackbarIcon({ icon, color }) {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        color: `${color}.main`,
        bgcolor: (theme) => alpha(theme.palette[color].main, 0.16),
      }}
    >
      <Iconify icon={icon} width={24} />
    </Box>
  );
}


const Iconify = forwardRef(({ icon, width = 20, sx, ...other }: { icon: any, width: number }, ref) => (
  <Box
    ref={ref}
    component={icon}
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
));
