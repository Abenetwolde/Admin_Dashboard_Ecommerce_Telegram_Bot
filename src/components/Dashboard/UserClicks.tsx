import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import api from '../../services/api';
import { Box, Card, Skeleton, Typography } from '@mui/material';
import { useGetUserClcikQuery } from '../../redux/Api/userKpiSlice';
const UserClicks = ({filter}:any) => {
  const {data, isLoading, error, refetch}:any =useGetUserClcikQuery(filter)

// console.log("data?.clicksByDate?.totalClicks" ,data?.clicksByDate[0]?.totalClicks)

// 
  useEffect(() => {
  refetch()
  }, [filter]);
  const xAxis = data?.clicksByDate?.map(data => data?.clicksByDate?.map((d) => d?.date))
  const yAxis = data?.clicksByDate?.map(data => data?.clicksByDate?.map((d) => d?.totalProductClicks))
const x_axis=xAxis&&xAxis[0]
const y_axis=yAxis&&yAxis[0]
  return (

    <Box height={300}>
      <Box sx={{ mt: 3, mb: 3, flex: 1, width: "100%", justifyContent: 'flex-end', alignItems: 'center' }}>
        {isLoading ? (
          <Skeleton variant="text" width={200} />
        ) : (
          data ? (
            <Typography>Total Clicks: {data?.clicksByDate[0]?.totalClicks && data?.clicksByDate[0]?.totalClicks.toFixed(2)}</Typography>
          ) : (
            <Typography>There aren't any Clicks {filter}</Typography>
          )
        )}
      </Box>
      <div style={{ height: "100%", flexGrow: 1 }}>
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        ) : (
          <ReactApexChart
            options={{
              chart: {
                height: '100%',
                type: 'line',
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'],
                  opacity: 0.5
                },
              },
              xaxis: {
                categories: x_axis,
              }
            }}
            series={[{
              name: 'Total Clicks',
              data: y_axis,
            }]}
            type="line"
            height={"100%"}
          />
        )}
      </div>
    </Box>
  );
};

export default UserClicks;
