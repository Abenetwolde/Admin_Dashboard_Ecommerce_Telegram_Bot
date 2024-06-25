<<<<<<< HEAD
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
import UserRegistration from '../components/Dashboard/UserRegistration';
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
=======
import React, { useState, useEffect } from 'react';
import { Col, Row } from "antd";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { format } from 'date-fns';
import api from '../services/api';
import { DashboardTotalCountCard } from '../components/Dashboard/total-count-card';
import { PieChart, Pie } from 'recharts';
>>>>>>> origin/main
const CustomTooltip = ({ label, payload }) => {
  const total = payload.reduce((acc, curr) => acc + (curr.value || 0), 0);

  return (
    <div className="bg-white border border-gray-300 p-2">
      <p className="font-semibold">Date: {label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
      <p className="font-semibold">Total: {total}</p>
    </div>
  );
};
<<<<<<< HEAD
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

const CHART_DATA = [4344, 5435, 1443, 4443];
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

=======
const Dashboard = () => {
>>>>>>> origin/main
  const [isLoading, setIsLoading] = useState(true);
  const [isOrderLoading, setIsOrderLoading] = useState(true);
  const [iscancelOrderLoading, setIsCancelOrderLoading] = useState(true);

<<<<<<< HEAD
  const [totalUserCount, setTotalUserCount] = useState<number | undefined>(0);
  const [totalOrderCount, setTotalOrderCount] = useState<number | undefined>(undefined);
  const [totalCancelOrderCount, setTotalCancelOrderCount] = useState<number | undefined>(undefined);
  const [newOrderData, setNewOrderData] = useState([]);
  const [newCancelOrderData, setNewCancelOrderData] = useState([]);
  const [userCounts, setUserCounts] = useState([]);
  const [opacity, setOpacity] = useState({ frombotcount: 1, fromchannelcount: 1, frominvitation: 1 });
  const [languageData, setLanguageData] = useState(null);
  const [filter, setFilter] = useState('perYear');
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

  const [userperformance, setDataUserperformance] = useState<any[]>([]);
  const [loadingUserPerformance, setLoadingUserPerformance] = useState(true);
  const [filterUserPerformanceTable, setFilterUserPerformance] = useState('perMonth');

  const handlefilterClickChange = (newFilter) => {
    setfilterClick(newFilter);

  };
  const handlefilterTimePerScenceClickChange = (newFilter) => {
    setfilterScene(newFilter);

  };
  const handleFilterUserClickTable = (newFilter) => {
    setFilterUserClickTable(newFilter);

  };
  const handleFilterUserPerformanceTable = (newFilter) => {
    setFilterUserPerformance(newFilter);

  };

  const refOne = useRef(null)
=======
  const [totalUserCount, setTotalUserCount] = useState<number | undefined>(undefined);
  const [totalOrderCount, setTotalOrderCount] = useState<number | undefined>(undefined);
  const [totalCancelOrderCount, setTotalCancelOrderCount] = useState<number | undefined>(undefined);

  const [newUsersData, setNewUsersData] = useState([]);
  const [newOrderData, setNewOrderData] = useState([]);
  const [newCancelOrderData, setNewCancelOrderData] = useState([]);

  const [topOrderFood, settopOrderFood] = useState([]);
  const [userCounts, setUserCounts] = useState([]);
  const [opacity, setOpacity] = useState({ frombotcount: 1, fromchannelcount: 1 });

>>>>>>> origin/main
  const handleMouseEnter = (o) => {
    const { dataKey } = o;
    setOpacity(prevOpacity => ({ ...prevOpacity, [dataKey]: 0.5 }));
  };
<<<<<<< HEAD
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
=======
>>>>>>> origin/main

  const handleMouseLeave = (o) => {
    const { dataKey } = o;
    setOpacity(prevOpacity => ({ ...prevOpacity, [dataKey]: 1 }));
  };
<<<<<<< HEAD


  useEffect(() => {
    console.log("start" + range[0].startDate, "end" + range[0].endDate)
    const fetchData = async () => {
      try {
        const response = await api.post<any, any>('user/getuserrange', {

          startDate: range[0].startDate,
          endDate: range[0].endDate

        });

        await setUserCounts(response.data.newUserCounts);
        setTotalUserCount(response.data.totalUsers)

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [range]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`user/getnewuser?interval=${filter}`);
        const data = response.data.newUserCounts;
        // setUserCounts([]);
        setUserCounts(data);
        // await setUserCounts(response.data.newUserCounts);

        setTotalUserCount(response.data.totalUsers)

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [filter])



  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    //  setRange([]);
  };

  const handlefilterScene = (string) => {
    setfilterScene(string);
    //  setRange([]);
  };
  const handleFilterUserTimeTable = (string) => {
    setFilterUserTimeTable(string);
    //  setRange([]);
  };
  useEffect(() => {
    console.log("start" + range[0].startDate, "end" + range[0].endDate)
    const fetchData = async () => {
      try {
        const response = await api.get<any, any>('user/language-stats');
        setLanguageData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await api.get<any, any>('kpi/get-user-joined-by-method');
        setuserRegisteringWay(response?.data?.formattedResult);
        console.log("user joining ways ", response.data)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(userRegisteringWay, "skdoskfopk user ")
  const userJoiningWay = Object.entries(userRegisteringWay).map(([key, value]) => {
    let name;

    // Convert keys to a more readable format if necessary
    switch (key) {
      case 'BOT':
        name = 'Bot';
        break;
      case 'CHANNEL':
        name = 'Channel';
        break;
      case 'INVITATION':
        name = 'Invitation';
        break;
      default:
        name = key;
    }

    return {
      name: name,
      value: value
    };
  });
  console.log(userJoiningWay)
  const labelforJoinUser: any = userJoiningWay.map((m) => m.name)
  const valueforJoinUser: any = userJoiningWay.map((m) => m.value)
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

  useEffect(() => {
    setLoadingUserPerformance(true);
    // Fetch data from the API
    api.get(`/kpi/get-users-performance?interval=${filterUserPerformanceTable}&limit=3`) // Replace with your actual API endpoint
      .then(response => {
        setDataUserperformance(response.data?.users);
        setLoadingUserPerformance(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoadingUserPerformance(false);
      });
  }, [filterUserPerformanceTable]);
  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.chart.blue[0],
      theme.palette.chart.violet[0],
      theme.palette.chart.yellow[0],
    ],
    labels: labelforJoinUser,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => Number(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });
  const { themeStretch } = useSettings();
  const COLORSd = ['#0088FE', '#00C49F', '#FF8042'];
  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <TotalCountCardGrid
        // renderTotalCountCard={renderTotalCountCard}
        isLoading={isLoading}
        totalUserCount={totalUserCount}
        userCounts={userCounts}
        isOrderLoading={isOrderLoading}
        totalOrderCount={totalOrderCount}
        newOrderData={newOrderData}
        isCancelOrderLoading={iscancelOrderLoading}
        totalCancelOrderCount={totalCancelOrderCount}
        newCancelOrderData={newCancelOrderData}
      />
      <Grid container spacing={3} mt={5}>
        <Grid item xs={12} md={8} lg={8} width="100%" textAlign="center">
         
            <UserPerformance data={userperformance} loading={loadingUserPerformance} filterUserPerformanceTable={filterUserPerformanceTable} handleFilterUserPerformanceTable={handleFilterUserPerformanceTable} isFalse={false}  />
          

        </Grid>

        <Grid item xs={12} md={4} lg={4} width="100%" textAlign="center">

          <Card>
            <CardHeader title="User Join From" />
            <ChartWrapperStyle dir="ltr">
              <ReactApexChart type="pie" series={valueforJoinUser} options={chartOptions} height={280} />
            </ChartWrapperStyle>
          </Card>
        </Grid>
      </Grid>


      <Grid container display="flex" spacing={4} flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" minWidth="100%" mt={5}>
        <Grid item xs={12} md={6} lg={12} width="100%" textAlign="center">

          <Card
            sx={{
              width: '100%',
              mb: { xs: 5, lg: 2 },
              mt: { xs: 5, lg: 2 },
              height: 'auto',
              borderRadius: '16px',
              boxShadow: 3,
              p: 2,
              textAlign: 'center'
            }}
          >

            <Grid container display={'flex'} spacing={2} alignItems={'center'} justifyContent={'space-between'} width={'auto'}>
              <Grid item xs={12} md={5}>
                <Typography sx={{ color: 'text.primary', fontSize: 'subtitle1.fontSize', textAlign: { xs: 'center', md: 'left' } }}>
                  User Spent Time Per Scene
                </Typography>
              </Grid>
              <Grid item xs={12} md={7}>
                <FilterButtonGroup handlefilter={handleFilterUserTimeTable} filter={filterUserTimeTable} />
              </Grid>
            </Grid>

            <ResponsiveContainer width="100%" height={300}>
              <UserSpentTimeTable data={datauserspentperscene} loading={loadingdataspenttimescene} />
            </ResponsiveContainer>
          </Card>

        </Grid>

        <Grid item xs={12} md={12} lg={12} width="100%" textAlign="center">

          <Card
            sx={{
              width: '100%',
              mb: { xs: 5, lg: 2 },
              mt: { xs: 5, lg: 2 },
              height: 'auto',
              borderRadius: '16px',
              boxShadow: 3,
              p: 2,
              textAlign: 'center'
            }}
          >
            <Grid container display={'flex'} spacing={2} alignItems={'center'} justifyContent={'space-between'} width={'auto'}>
              <Grid item xs={12} md={5}>
                <Typography sx={{ color: 'text.primary', fontSize: 'subtitle1.fontSize', textAlign: { xs: 'center', md: 'left' } }}>
                  User Click Per Scene
                </Typography>
              </Grid>
              <Grid item xs={12} md={7}>
                <FilterButtonGroup handlefilter={handleFilterUserClickTable} filter={filterUserTimeTable} />
              </Grid>
            </Grid>
            <ResponsiveContainer width="100%" height={300}>
              <UserClickTable data={datauserclcik} loading={loadingdatauserClick} />
            </ResponsiveContainer>
          </Card>

        </Grid>
      </Grid>


      <Grid container display="flex" spacing={4} flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" minWidth="100%" mt={5}>
        <Grid item xs={12} md={6} lg={6} width="100%" textAlign="center">

          <Card
            sx={{
              width: '100%',
              mb: { xs: 5, lg: 2 },
              mt: { xs: 5, lg: 2 },
              height: 'auto',
              borderRadius: '16px',
              boxShadow: 3,
              p: 2,
              textAlign: 'center'
            }}
          >
            <Typography sx={{ color: 'text.primary', fontSize: 'subtitle1.fontSize', textAlign: 'left' }}>
              User Join From
            </Typography>
            <ResponsiveContainer width="100%" height={300}>

              {userJoiningWay !== null ? <PieChart >
                <Pie
                  dataKey="value"
                  isAnimationActive={true}
                  data={userJoiningWay}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {userJoiningWay.map((entry, index) => (
                    <Cell key={`cell-${index}`} style={{ outline: 'none' }} stroke="none" strokeWidth={1} fill={COLORSd[index]} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ flexGrow: 1 }}
                  iconSize={15}
                  iconType="square"
                  layout="horizontal"
                  formatter={(value, entry) => <span style={{ color: entry.color }}>{value}</span>}
                />
                <Tooltip />
              </PieChart> : <LoadingIndicator />}
            </ResponsiveContainer>
          </Card>

        </Grid>

        <Grid item xs={12} md={6} lg={6} width="100%" textAlign="center">

          <Card
            sx={{
              width: '100%',
              mb: { xs: 5, lg: 2 },
              mt: { xs: 5, lg: 2 },
              height: 'auto',
              borderRadius: '16px',
              boxShadow: 3,
              p: 2,
              textAlign: 'center'
            }}
          >
            <Typography sx={{ color: 'text.primary', fontSize: 'subtitle1.fontSize', textAlign: 'left' }}>
              User Lottery Numbers
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <UserLottery data={data} loading={loading} />
            </ResponsiveContainer>
          </Card>

        </Grid>
      </Grid>

      <Grid container spacing={3} direction={{ xs: 'column', lg: 'row' }} width="100%">
        <Grid item xs={12} md={8} lg={8}>
          <UserRegistration
            refOne={refOne}
            range={range}
            setRange={setRange}
            open={open}
            setOpen={setOpen}
            filter={filter}
            handleFilterChange={handleFilterChange}
            totalUserCount={totalUserCount}
            userCounts={userCounts}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            opacity={opacity}
            CustomTooltip={CustomTooltip}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <LanguageDistributionCard
            languageData={languageData}
          />
        </Grid>
      </Grid>

      <Grid container display="flex" /* spacing={4} */ flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" minWidth="100%" mt={2}>
        <Grid item xs={12} md={12} lg={12} width="100%" textAlign="center">
          <ResponsiveContainer>
            <UserSpentTime />
          </ResponsiveContainer>
        </Grid>
      </Grid>

      <Grid container spacing={4} flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" mt={5}>
        <UserClicksSection
          filterScene={filterScene}
          handlefilterScene={handlefilterTimePerScenceClickChange}
        />
      </Grid>

      <Grid container display="flex" spacing={4} flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" minWidth="100%" mt={25}>
        <Grid item xs={12} md={12} lg={12} width="100%" textAlign="center">
          <ResponsiveContainer>
            <UserClicksChart
              filterClick={filterClick}
              handlefilterClickChange={handlefilterClickChange}
            />
          </ResponsiveContainer>
        </Grid>
      </Grid>



    </Container >
=======
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("order/high-order-food");
      // console.log(response.data)
      const data = response.data.map((entry, index) => ({
        index: String(index + 1),
        name: entry._id,// Assuming index starts from 1
        value: entry.count, // Assuming userCount property in each entry represents the number of new users
      }));
      settopOrderFood(data);

      // settopOrderFood(response.data)
    }
    fetchData()
  }, []);
  useEffect(() => {
    const fetchDataq = async () => {
      const response: any = await api.get("user/getnewuser");
      // console.log(response.data)
      // if (!response.ok) {
      //   throw new Error('Failed to fetch data');
      // }
      const data = await response.data.newUserCounts;
      setUserCounts(data)

    }
    fetchDataq()
  }, []);
  console.log("userCounts", userCounts)
  console.log(topOrderFood)
  useEffect(() => {
    const fetchData = async (endpoint, setData, setLoading, setTotalCount, setLoadingState) => {
      try {
        let totalCount=0
        const response = await api.get(endpoint);
        setData(response.data);
        if(endpoint==='user/getnewuser')
        {
          totalCount = response.data?.newUserCounts?.reduce((acc, curr) => acc + curr.total, 0);
        }else{
          totalCount = response.data?.reduce((acc, curr) => acc + curr.count, 0);
        }
        
        setTotalCount(totalCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData('user/getnewuser', setNewUsersData, setIsLoading, setTotalUserCount, setIsLoading);
    fetchData('order/getordersperday', setNewOrderData, setIsOrderLoading, setTotalOrderCount, setIsOrderLoading);
    fetchData('order/cancelled-orders-per-day', setNewCancelOrderData, setIsCancelOrderLoading, setTotalCancelOrderCount, setIsCancelOrderLoading);
  }, []);

  const renderTotalCountCard = (resource, isLoading, totalCount, data) => (

    <Col xs={24} sm={24} xl={7} className=' bg-white rounded-xl shadow-lg p-4 text-center '>
      <DashboardTotalCountCard
        resource={resource}
        isLoading={isLoading}
        totalCount={totalCount}
        data={data.map((entry, index) => ({
          index: String(index + 1), // Assuming index starts from 1
          value: resource=="User"?entry.total:entry.count, // Assuming userCount property in each entry represents the number of new users
        }))}
      />
    </Col>


  );

  const [activeIndex, setActiveIndex] = useState(null); // Track the active index

  const handleClick = (data, index) => {
    setActiveIndex(index === activeIndex ? null : index); // Set the active index or null if clicked again
  };
  const COLORS = ['#8884d8', 'rgba(53, 162, 235, 0.5)', '#FFBB28', '#FF8042'];
  return (
    <div className="p-6 mb-6 bg-slate-50 min-h-screen ">
      <div className="flex  flex-wrap ">
        <div className="w-full my-2 rounded-xl space-y-5  ">
          <Row gutter={[32, 32]} className="space-x-2 item-center justify-center">
            {renderTotalCountCard("User", isLoading, totalUserCount, userCounts)}
            {renderTotalCountCard("Order", isOrderLoading, totalOrderCount, newOrderData)}
            {renderTotalCountCard("Cancel", iscancelOrderLoading, totalCancelOrderCount, newCancelOrderData)}
          </Row>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full space-y-5 my-5">
        <div className="lg:w-5/6 w-full h-96 mb-5 lg:mb-0 lg:mr-5  bg-white rounded-xl shadow-lg p-10 text-center">
          <p className="text-xl font-semibold mb-4 text-left">User analysis per day</p>
          <ResponsiveContainer>
          <BarChart
              data={userCounts}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" 
                tickFormatter={date => format(new Date(date), 'dd')}
                interval="preserveStartEnd"
              />
              <YAxis />
              <Tooltip content={<CustomTooltip label={undefined} payload={undefined} />} />
              <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
              <Bar dataKey="frombotcount" strokeOpacity={opacity.frombotcount} stackId="a" fill="#8884d8" name="From Bot"  fillOpacity={opacity.frombotcount}  />
              <Bar dataKey="fromchannelcount" strokeOpacity={opacity.fromchannelcount} stackId="a" fill="#82ca9d" name="From Channel" fillOpacity={opacity.fromchannelcount} />
              {/* <Bar dataKey="total" stackId="a" fill="#00000" name="Total" /> */}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="lg:w-1/3 w-full h-96 mb-5 lg:mb-0  bg-white rounded-xl shadow-lg p-10 text-center">
          <p className="text-xl font-semibold my:5">User analysis per day</p>
          <ResponsiveContainer >
            <PieChart >
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={topOrderFood}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
                onClick={handleClick}
                stroke={activeIndex !== null ? 'blue' : 'none'}
              // strokeWidth={activeIndex !== null ? 1 : 0}
              >
                {topOrderFood.map((entry, index) => (
                  <Cell key={`cell-${index}`}
                    style={{ outline: 'none' }}
                    // strokeWidth={activeIndex !== null ? 5 : 0}
                    fill={COLORS[index % COLORS.length]}
                    stroke={activeIndex === index ? 'white' : 'none'} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: '20px' }}
                iconSize={15}
                iconType="square"
                layout="horizontal"
                formatter={(value, entry) => <span style={{ color: entry.color }}>{value}</span>}
                onClick={(e) => {
                  const { index }: any = e.payload;
                  console.log("strokeDasharray", index)
                  const indexd = topOrderFood.findIndex((entry) => entry.index === index);
                  if (indexd !== -1) {
                    setActiveIndex(indexd);
                  }
                }}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
      
        </div>

      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-8 min-w-full">
        <div className="bg-white rounded-xl h-auto w-full shadow-lg p-2">
          {/* <Line data={lineState} /> */}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <span className="font-medium uppercase text-gray-800">Order Status</span>
          {/* <ResponsiveContainer > */}
          <PieChart >
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={topOrderFood}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
              onClick={handleClick}
              stroke={activeIndex !== null ? 'blue' : 'none'}
            // strokeWidth={activeIndex !== null ? 1 : 0}
            >
              {topOrderFood.map((entry, index) => (
                <Cell key={`cell-${index}`}
                  style={{ outline: 'none' }}
                  // strokeWidth={activeIndex !== null ? 5 : 0}
                  fill={COLORS[index % COLORS.length]}
                  stroke={activeIndex === index ? 'white' : 'none'} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: '20px' }}
              iconSize={15}
              iconType="square"
              layout="horizontal"
              formatter={(value, entry) => <span style={{ color: entry.color }}>{value}</span>}
              onClick={(e) => {
                const { index }: any = e.payload;
                console.log("strokeDasharray", index)
                const indexd = topOrderFood.findIndex((entry) => entry.index === index);
                if (indexd !== -1) {
                  setActiveIndex(indexd);
                }
              }}
            />
            <Tooltip />
          </PieChart>
          {/* </ResponsiveContainer> */}
        </div>
      </div>

    </div>
>>>>>>> origin/main
  );
};

export default Dashboard;
