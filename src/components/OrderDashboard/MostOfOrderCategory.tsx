import PropTypes from 'prop-types';
// @mui
import { Card, CardHeader, Typography, Stack, LinearProgress, Box, useTheme } from '@mui/material';
import { fPercent } from '../../utils/formatNumber';
import FilterButtonGroup from '../FilterButtonGroup';

import Chart from 'react-apexcharts';
import BaseOptionChart from '../chart/BaseOptionChart';
import ReactApexChart from 'react-apexcharts';
import { merge } from 'lodash';
import useResponsive from '../../hooks/useResponsive';

export default function MostOfOrderCategory({ data, handleFilterOFStatusChange, filterOfStatus }: any) {
  const theme=useTheme()
  const isEmpty = data?.every(series => series?.data?.length === 0);

  const labels=data?.map((m)=>m.categoryName)
  const value=data?.map((m)=>m.count)

  const OrdersChart = ({ data }) => {
    const isDesktop = useResponsive('up', 'sm');
    const chartOptions = merge(BaseOptionChart(), {
      labels: labels,
      // colors: [
      //   theme.palette.primary.main,
      //   theme.palette.info.darker,
      //   theme.palette.chart.yellow[0],
      //   theme.palette.chart.blue[0],
      //   theme.palette.chart.red[0],
      //   theme.palette.chart.violet[2],
      //   theme.palette.chart.violet[0],
      //   theme.palette.success.darker,
      //   theme.palette.chart.green[0],
      // ],
      stroke: {
        colors: [theme.palette.background.paper],
      },
      fill: { opacity: 0.8 },
      legend: {
        position: 'right',
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
      responsive: [
        {
          breakpoint: theme.breakpoints.values.sm,
          options: {
            legend: {
              position: 'bottom',
              horizontalAlign: 'left',
            },
          },
        },
      ],
    });
  
    // const series = data?.map(series => ({
    //   name: series?.name,
    //   data: series?.data?.map(point => point.y)
    // }));

    return (

      <div>
      {isEmpty ? (
        <div style={{ textAlign: 'center', color: theme.palette.text.secondary, fontSize: '14px', marginTop: '20px' }}>
          No data found
        </div>
      ) : (
        <ReactApexChart
        type="polarArea"
        series={value}
        options={chartOptions}
        height={isDesktop ? 340 : 360}
      />
      )}
    </div>

    );
  };

  return (
    <Card className='p-3'>
      <CardHeader title="Sales Overview" />
      <FilterButtonGroup handlefilter={handleFilterOFStatusChange} filter={filterOfStatus} />
      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <OrdersChart data={data} />

      </Box>

    </Card>

  );
}

// ----------------------------------------------------------------------

