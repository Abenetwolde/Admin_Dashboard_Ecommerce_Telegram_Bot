// UserClicksChart.js
import React from 'react';
import { Box, Typography, ButtonGroup, Button, Card } from '@mui/material';
import { ResponsiveContainer } from 'recharts';
// import UserClicks from './UserClicks';
import UserClicks from './userClicks';

const UserClicksChart = ({ filterClick, handlefilterClickChange }) => (
    <Card
        sx={{
            width: { xs: '100%', lg: '100%' },
            mb: { xs: 5, lg: 2 },
            mt: { xs: 5, lg: 2 },
            height: '100%',
            borderRadius: '16px',
            boxShadow: 3,
            p: 2,
            textAlign: 'center'
        }}
    >
   <Box width="100%" textAlign="center">
            <Typography sx={{ color: 'text.secondary', fontSize: 'subtitle1.fontSize', textAlign: 'left' }}>
                Users Clicks
            </Typography>
            <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button onClick={() => handlefilterClickChange("perWeek")}>Per Week</Button>
                <Button onClick={() => handlefilterClickChange("perMonth")}>Per Month</Button>
                <Button onClick={() => handlefilterClickChange("perYear")}>Per Year</Button>
            </ButtonGroup>
            <ResponsiveContainer>
                <UserClicks filter={filterClick} />
            </ResponsiveContainer>
        </Box>
    </Card>
);

export default UserClicksChart;
