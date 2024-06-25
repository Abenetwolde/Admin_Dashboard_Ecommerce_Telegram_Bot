import PropTypes from 'prop-types';
// @mui
import { Card, CardHeader, Typography, Stack, LinearProgress, Box, useTheme } from '@mui/material';
import { fPercent } from '../../utils/formatNumber';
import FilterButtonGroup from '../FilterButtonGroup';

import Chart from 'react-apexcharts';

export default function CashAndOnine({ OrderStatus, handleFilterOFStatusChange, filterOfStatus }: any) {
  const theme=useTheme()
  const isEmpty = OrderStatus?.every(series => series.data.length === 0);
  const OrdersChart = ({ data }) => {
    const options = {
      chart: {
        type: 'spline',
      },
      xaxis: {
        type: 'datetime',
        categories: data[0]?.data?.map(point => point.x),
      },
      yaxis: {
        title: {
          text: 'Orders'
        },
      },
  
      dataLabels: {
        enabled: false
      },
      legend: {
        position: 'bottom'
      },
      stroke: {
        curve: 'smooth' // Make the line smooth
      },

    };

    const series = data?.map(series => ({
      name: series?.name,
      data: series?.data?.map(point => point.y)
    }));

    return (

      <div>
      {isEmpty ? (
        <div style={{ textAlign: 'center', color: theme.palette.text.secondary, fontSize: '14px', marginTop: '20px' }}>
          No data found
        </div>
      ) : (
        <Chart
          options={options}
          series={series}
          type="bar" // Use 'area' type to fill the area under the lines
          height="350"
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
        <OrdersChart data={OrderStatus} />

      </Box>

    </Card>

  );
}

// ----------------------------------------------------------------------

