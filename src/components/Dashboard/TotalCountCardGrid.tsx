// TotalCountCardGrid.js
import React from 'react';
import { Grid, Box } from '@mui/material';
import { DashboardTotalCountCard } from './total-count-card';
const renderTotalCountCard = (resource, isLoading, totalCount, data) => (

    <Grid item xs={12} sm={4} md={4}>
      <DashboardTotalCountCard
        resource={resource}
        isLoading={isLoading}
        totalCount={totalCount}
        data={data.map((entry, index) => ({
          index: String(index + 1),
          value: resource === "User" ? entry.total : entry.count,
        }))}
      />

    </Grid>


  );
const TotalCountCardGrid = ({ isLoading, totalUserCount, userCounts, isOrderLoading, totalOrderCount, newOrderData, isCancelOrderLoading, totalCancelOrderCount, newCancelOrderData }) => (
  <Box m={2}>
    <Grid container spacing={2}>
      <Grid container item spacing={3} justifyContent="center">
        {renderTotalCountCard("User", isLoading, totalUserCount, userCounts)}
        {renderTotalCountCard("Order", isOrderLoading, totalOrderCount, newOrderData)}
        {renderTotalCountCard("Cancel", isCancelOrderLoading, totalCancelOrderCount, newCancelOrderData)}
      </Grid>
    </Grid>
  </Box>
);

export default TotalCountCardGrid;
