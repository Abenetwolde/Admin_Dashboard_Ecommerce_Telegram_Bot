import { useState, useEffect } from 'react';
import axios from 'axios';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
import api from '../../services/api';
import { Box, Typography } from '@mui/material';
import { BaseOptionChart } from '../chart';

const UsersSpentTimePerScene = ({filter}:any) => {
  const [chartData, setChartData] = useState([]);
console.log("....................", filter);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`kpi/get-user-spent-per-scene-name?interval=${filter}`);
        console.log("ajsdddd..........................." ,response.data);
        setChartData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filter]);
// console.log(chartData)
const label:any=chartData?.map((name):any=>name?.sceneName)
const value:any=chartData?.map((name)=>name?.totalDurationInMinutes)
const CHART_DATA = [{ data: value }];
console.log(value,label)
const options =merge(BaseOptionChart(), {
  tooltip: {
    marker: { show: false },
    y: {
      formatter: (value) => `${Number(value).toFixed(2)} minute`,
      title: {
        formatter: () => '',
      },
    },
  },
  dataLabels: {
    enabled: true,
    textAnchor: 'start',
    style: {
      colors: ['#fff']
    },
    formatter: function (val, opt) {
      return  opt.w.globals.labels[opt.dataPointIndex] + ":  " + `${Number(val).toFixed(2)} minute`
    },
    offsetX: 0,
    dropShadow: {
      enabled: true
    }
  },
  stroke: {
    width: 1,
    colors: ['#fff']
  },
  plotOptions: {
    bar: {
      barHeight: '100%',
      borderRadius:0,
      distributed: true,
      horizontal: true,
      dataLabels: {
        position: 'bottom'
      },
    }
  },
  xaxis: {
    categories: label,
  },
});

  return (
    <div style={{ height: "100%", flexGrow: 1 }}>
<ReactApexChart type="bar" series={CHART_DATA} options={options} height={"100%"} />
      </div>
 
   
  );
};

export default UsersSpentTimePerScene;
