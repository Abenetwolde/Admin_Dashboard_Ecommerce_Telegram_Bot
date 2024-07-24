// UserClicksChart.js
import React, { useState } from 'react';
import { Box, Typography, ButtonGroup, Button, Card, CardHeader } from '@mui/material';
import { ResponsiveContainer } from 'recharts';
// import UserClicks from './UserClicks';
// import UserClicks from './UserClicks';
import UserClicks from './userClicks';
import FilterButtonGroup from '../FilterButtonGroup';

const UserClicksChart = () => {
    const [filterClick, setfilterClick] = useState("perMonth"); 

    const handlefilterClickChange = (newFilter) => {
        setfilterClick(newFilter);
    
      };
    return(<Card className='p-3 mt-5' >
        <Box sx={{ mb: 3, textAlign: 'left' }}>
            <CardHeader sx={{ mb: 3, textAlign: 'left' }} title={" Users Clicks"} sx={{ mb: 3 }} />
        </Box>
        <Box width="100%" textAlign="center">
            <FilterButtonGroup handlefilter={handlefilterClickChange} filter={filterClick} />
            <ResponsiveContainer height={400}>
                <UserClicks filter={filterClick} />
            </ResponsiveContainer>
        </Box>
    </Card>
    )

}

export default UserClicksChart;
