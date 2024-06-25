import React from 'react';
import { Grid, Box, Typography, useTheme } from '@mui/material';

const UserPerformanceIndicator = () => {
    const stats = [
        { label: 'User Total Spent Time', value: '40%' },
        { label: 'User Total Click', value: '30%' },
        { label: 'User Total Order', value: '30%' },
    ];
    const theme: any = useTheme()
    return (
        <Grid container sx={{ p: 2 }}>
            <Grid item xs={12} md={12} container spacing={2} alignItems={'center'} justifyContent="center">


                <Box display="flex" flexDirection="column" gap={2}>
                    {stats.map((stat, index) => (
                        <Box display="flex" alignItems={'center'} justifyContent="flex-start" flexDirection="row" gap={2}>

                            <Box height={15} bgcolor={theme.palette.primary.lighter} width={15} />

                            <Typography
                                key={index}
                                sx={{ color: 'text.primary', fontSize: 'subtitle1.fontSize', textAlign: { xs: 'center', md: 'left' } }}
                            >
                                {stat.label}
                            </Typography>
                            <Typography
                                key={index}
                                sx={{ color: 'text.primary', fontSize: 'subtitle1.fontSize', textAlign: { xs: 'center', md: 'left' } }}
                            >
                                {stat.value}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Grid>


        </Grid>
    );
};

export default UserPerformanceIndicator;
