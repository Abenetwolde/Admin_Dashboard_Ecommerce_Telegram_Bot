import React from 'react';
import { Grid, Card,Typography, ButtonGroup, Button, Box } from '@mui/material';
import { ResponsiveContainer } from 'recharts';
import UsersSpentTimePerScene from './UsersSpentTimePerScene';

const UserClicksSection = ({ filterScene, handlefilterScene }) => (
  
    <Grid item xs={12} lg={12} textAlign="center">
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
      <Typography sx={{ color: 'text.secondary', fontSize: 'subtitle1.fontSize', textAlign: 'left' }}>
        Time Per-Scene 
      </Typography>
      <Box m={2} >
      <ButtonGroup  variant="outlined" aria-label="Basic button group">
        <Button onClick={() => handlefilterScene("perWeek")}>Per Week</Button>
        <Button onClick={() => handlefilterScene("perMonth")}>Per Month</Button>
        <Button onClick={() => handlefilterScene("perYear")}>Per Year</Button>
      </ButtonGroup>
      </Box>

      <ResponsiveContainer height={400} width="100%">
        <UsersSpentTimePerScene filter={filterScene} />
      </ResponsiveContainer>
      </Card>
    </Grid>

);

export default UserClicksSection;
