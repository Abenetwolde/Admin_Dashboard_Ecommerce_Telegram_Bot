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

export default function MostOfOrderProduct({ data, handleFilterOFStatusChange, filterOfStatus }: any) {
  const theme=useTheme()
  const isEmpty = data?.every(series => series?.data?.length === 0);
;
  const labels=data?.map((m)=>m.productName)
  const value=data?.map((m)=>m.count)
  console.log(value)
  const series= [{
    data: value
  }]

  const OrdersChart = ({ data }) => {
    const isDesktop = useResponsive('up', 'sm');
    const chartOptions = merge(BaseOptionChart(), {
 
      chart: {
        type: 'bar',
        height: 350
      },
      annotations: {
        xaxis: [{
          x: 500,
          borderColor: '#00E396',
          label: {
            borderColor: '#00E396',
            style: {
              color: '#fff',
              background: '#00E396',
            },
           
          }
        }],
        yaxis: [{
          y: 'July',
          y2: 'September',
          label: {
            text: 'Y annotation'
          }
        }]
      },
      plotOptions: {
        bar: {
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: labels
      },
      grid: {
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      yaxis: {
        reversed: false,
        axisTicks: {
          show: true
        }
      }
  
  
  
 
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
        type="bar"
        series={series}
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

