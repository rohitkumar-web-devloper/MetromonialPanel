

import type { } from '@mui/x-date-pickers/themeAugmentation';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SideMenu from './SideMenu';
import { AppNavbar } from './AppNavbar';
import { Header } from './Header';
import React from 'react';
import { Paper } from '@mui/material';


export function Main({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <SideMenu />
            <AppNavbar />
            {/* Main content */}
            <Box
                component="main"
                sx={(theme) => ({
                    flexGrow: 1,
                    backgroundColor: theme.vars
                        ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                        : alpha(theme.palette.background.default, 1),
                    overflow: 'auto',
                    padding: { xs: "5px", md: "5px 15px" }

                })}
            >


                {/* <MainGrid /> */}
                <Box sx={{ padding: "20px" }}>
                    <Header />
                    <Box sx={{ mt: 1 }}>
                        {children}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}