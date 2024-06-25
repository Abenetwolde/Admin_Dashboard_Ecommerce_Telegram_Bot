import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import api from '../../services/api';
import { Box, Card, Typography } from '@mui/material';

const UserClicks = ({ filter }: any) => {
  const [chartData, setChartData] = useState([]);
  console.log("....................", filter);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`kpi/get-user-clicks?interval=${filter}`);
        setChartData(response.data?.clicksByDate);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filter]);
  const xAxis = chartData?.map(data => data?.clicksByDate?.map((d) => d?.date))
  const yAxis = chartData?.map(data => data?.clicksByDate?.map((d) => d?.totalProductClicks))
  console.log(xAxis[0])
  return (

    <Box height={300}>
      <Box sx={{ mt: 3, mb: 3, flex: 1, width: "100%", justifyContent: 'flex-end', alignItems: 'center' }}>
        {chartData.length > 0 ? (
          <Typography>Total Clicks: {chartData[0]?.totalClicks && chartData[0]?.totalClicks.toFixed(2)} Clicks {filter}</Typography>
        ) : (
          <Typography>There aren't any Clicks {filter}</Typography>
        )}
      </Box>
      <div style={{ height: "100%", flexGrow: 1 }}>
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
            // title: {
            //   text: 'Product Trends by Month',
            //   align: 'left'
            // },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
              },
            },
            xaxis: {
              categories: xAxis[0],
            }
          }}
          series={[{
            name: 'Total Clicks',
            data: yAxis[0],
          }]}
          type="line"
          height={"100%"}
        />
      </div>



    </Box>
  );
};

export default UserClicks;
