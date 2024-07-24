import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Row } from "antd";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { format } from 'date-fns';


import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css'; // Theme CSS fil
import api from '../services/api';


import { addDays } from 'date-fns'

import { ButtonGroup, CardHeader, Container, Grid, IconButton, InputAdornment, TextField, styled, useTheme } from '@mui/material';
import { Box, Card, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import LanguagePieChart from '../components/Dashboard/LanguagePieChart';
import UserSpentTime from '../components/Dashboard/SpentTime';
import UserClicks from '../components/Dashboard/userClicks';
import UsersSpentTimePerScene from '../components/Dashboard/UsersSpentTimePerScene';

import LanguageDistributionCard from '../components/Dashboard/LanguageDistributionCard';
import TotalCountCardGrid from '../components/Dashboard/TotalCountCardGrid';
import UserClicksChart from '../components/Dashboard/UserClicksChart';
import UserClicksSection from '../components/Dashboard/USerSpentPerScene';
import UserLottery from '../components/Dashboard/userLottery';
import UserSpentTimeTable from '../components/Dashboard/userSpentTimeTable';
import FilterButtonGroup from '../components/FilterButtonGroup';
import UserClickTable from '../components/Dashboard/UserClickTable';
import UserPerformance from '../components/Dashboard/USerPerformance';
import UserPerformanceIndicator from '../components/Dashboard/UserPerformanceIndicator';
import LoadingIndicator from '../components/LoadingIndicator';
import ReactApexChart from 'react-apexcharts';
import BaseOptionChart from '../components/chart/BaseOptionChart';
import { merge } from 'lodash';
import useSettings from '../hooks/useSettings';
import UserRegister from '../components/Cards/User/UserRegister';
// import UsersClick from '../components/Cards/User/UserClick';
import UsersSpentTime from '../components/Cards/User/UserSpentTime';
import UsersClickperMonth from '../components/Cards/User/UsersClick';
import UserRegistration from '../components/Dashboard/UserRegistration';
import UserJoinFromCard from '../components/Dashboard/UserJoinFromCard';
import BreadcrumbComponent from '../components/BreadcrumbComponent';
import TopUsersClick from '../components/Dashboard/TopUsersClick';
import TopUsersTime from '../components/Dashboard/TopUsersTime';

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

const Dashboard = () => {
  const theme = useTheme()
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);


  const [languageData, setLanguageData] = useState(null);
  const [filterClick, setfilterClick] = useState("perMonth"); // Initialize the state with the default value
  const [filterScene, setfilterScene] = useState("perMonth");
  const [userRegisteringWay, setuserRegisteringWay] = useState([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [datauserspentperscene, setDataTimeSpentPerScene] = useState<any[]>([]);
  const [loadingdataspenttimescene, setLoadingsetDataTimeSpentPerScene] = useState(true);
  const [filterUserTimeTable, setFilterUserTimeTable] = useState('perMonth');

  const [datauserclcik, setDataUserClick] = useState<any[]>([]);
  const [loadingdatauserClick, setLoadinguserClick] = useState(true);
  const [filterUserClickTable, setFilterUserClickTable] = useState('perMonth');



  const handlefilterTimePerScenceClickChange = (newFilter) => {
    setfilterScene(newFilter);

  };
  const handleFilterUserClickTable = (newFilter) => {
    setFilterUserClickTable(newFilter);

  };

  const refOne = useRef(null)

  useEffect(() => {

    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false)
    }
  }





  const handleFilterUserTimeTable = (string) => {
    setFilterUserTimeTable(string);
    //  setRange([]);
  };


  useEffect(() => {
    // Fetch data from the API
    api.get('/kpi/get-users-with-lottery-numbers') // Replace with your actual API endpoint
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoadingsetDataTimeSpentPerScene(true);
    // Fetch data from the API
    api.get(`/kpi/get-user-time-spent-per-scene?interval=${filterUserTimeTable}`) // Replace with your actual API endpoint
      .then(response => {
        setDataTimeSpentPerScene(response.data?.timeSpentPerScene);
        setLoadingsetDataTimeSpentPerScene(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoadingsetDataTimeSpentPerScene(false);
      });
  }, [filterUserTimeTable]);

  useEffect(() => {
    setLoadinguserClick(true);
    // Fetch data from the API
    api.get(`/kpi/get-users-total-clicks-per-name?interval=${filterUserClickTable}`) // Replace with your actual API endpoint
      .then(response => {
        setDataUserClick(response.data?.clicksPerScene);
        setLoadinguserClick(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoadinguserClick(false);
      });
  }, [filterUserClickTable]);




  const { themeStretch } = useSettings();
  const COLORSd = ['#0088FE', '#00C49F', '#FF8042'];
  const userregister = useRef(null);
  const anotherComponentRef = useRef(null);
  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
    
        <Grid container spacing={2}>
          <Grid lg={4} md={4} xl={4} xs={12} item  justifyContent="center">
            <UserRegister anotherComponentRef={userregister}  />
          </Grid>
          <Grid lg={4}md={4} xl={4} xs={12} item  justifyContent="center">
            <UsersSpentTime anotherComponentRef={anotherComponentRef} />
          </Grid>
          <Grid lg={4} md={4} xl={4} xs={12} item  justifyContent="center">
           <UsersClickperMonth anotherComponentRef={anotherComponentRef}/>
          </Grid>
        </Grid>





        <Grid container ref={userregister}spacing={3} direction={{ xs: 'column', lg: 'row' }} width="100%">
        <Grid item xs={12} md={8} lg={8}>
          <UserRegistration/>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <LanguageDistributionCard
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={5}>
        <Grid item xs={12} md={6} lg={8} width="100%" textAlign="center">
        <UserSpentTime /> 
        </Grid>

        <Grid item xs={12} md={6} lg={4} width="100%" textAlign="center">

        <UserJoinFromCard />
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={5}>
        <Grid item xs={12} md={6} lg={6} width="100%" textAlign="center">
          {/* <UserPerformance isFalse={false} /> */}
          <UserClicksSection
        />
        </Grid>

        <Grid item xs={12} md={6} lg={6} width="100%" textAlign="center">
        <UserClicksChart
            />
        </Grid>
      </Grid>
      

      
      <Grid container spacing={3} mt={5}>
        <Grid item xs={12} md={6} lg={6} width="100%" textAlign="center">
        <TopUsersClick
        />
        </Grid>

        <Grid item xs={12} md={6} lg={6} width="100%" textAlign="center">
        <TopUsersTime
            />
            
        </Grid>

    
    

   
      </Grid>

      
      <Grid container spacing={3} mt={5}>
        <Grid item xs={12} md={6} lg={6} width="100%" textAlign="center">
          <UserPerformance isFalse={false} />
        </Grid>

        <Grid item xs={12} md={6} lg={6} width="100%" textAlign="center">
        <Card className="p-4">      
          <Box sx={{ mb: 3, textAlign: 'left' }}>
               <CardHeader title="    User Lottery Numbers" />
               </Box>
            <ResponsiveContainer width="100%" height={300}>
              <UserLottery data={data} loading={loading} />
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
   
    </Container >
  );
};

export default Dashboard;
