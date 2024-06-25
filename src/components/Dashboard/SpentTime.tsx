import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import api from '../../services/api';
import { Box, Card, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from '@mui/material';
import { addDays, format, subDays } from 'date-fns';
import DateRangeIcon from '@mui/icons-material/DateRange';

import { DateRangePicker } from 'react-date-range';
const UserSpentTime = () => {
  const theme = useTheme()
  const refOne = useRef(null)
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: subDays(new Date(), 30),
      key: 'selection'
    }
  ])
  const [series, setSeries] = useState([]);
  useEffect(() => {
    // event listeners
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
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false)
    }
  }
  const [totalspent, setTotalSpent] = useState(0);
  const [filter, setFilter] = useState('perWeek');
  const [options, setOptions] = useState<any>({
    chart: {
      id: 'area-datetime',
      type: 'area',
      //  height: 550,
      zoom: {
        autoScaleYaxis: true
      }
    },
    annotations: {
      yaxis: [{
        y: 30,
        borderColor: '#999',
        label: {
          show: true,
          text: 'Daily Goal',
          style: {
            color: "#fff",
            background: '#00E396'
          }
        }
      }],

    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 6,
      labels: {
        formatter: function (val) {
          return new Date(val).toLocaleDateString(); // Format x-axis labels as dates
        }
      },
    },
    yaxis: {

      labels: {
        formatter: function (val) {
          return val.toFixed(2) + ' minutes'; // Format y-axis labels with two decimal points and append "minutes" suffix
        }
      }
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
    selection: 'one_year',
    // More options...
  });
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    //  setRange([]);
  };

  useEffect(() => {
    console.log("start" + range[0].startDate, "end" + range[0].endDate)
    const fetchData = async () => {
      try {
        const response = await api.post<any, any>('kpi/get-user-spent-range', {

          startDate: range[0].startDate,
          endDate: range[0].endDate

        });
        const data = await response.data;
        // Extract dates and durations from the received data
        const updatedSeries = [{
          name: 'Time Spent',
          data: data?.userTime?.map(item => [item._id, item.totalDurationInMinutes]),
          totalusertime: data?.totalDurationInMinutes
        }];
        await setSeries(updatedSeries);
        setTotalSpent(data.totalDurationInMinutes)
        // setUserCounts(response.data.newUserCounts);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [range]);
  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await api.get(`kpi/get-user-spent-time?interval=${filter}`);
        const data = await response.data;
        // Extract dates and durations from the received data
        const updatedSeries = [{
          name: 'Time Spent',
          data: data?.userTime.map(item => [item._id, item.totalDurationInMinutes]),
          totalusertime: data?.totalDurationInMinutes
        }];
        setSeries(updatedSeries);
        setTotalSpent(data.totalDurationInMinutes)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [filter]); // Dependency array ensures useEffect runs only when selection changes

  console.log(totalspent);
  return (

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
      }}>
      <Typography sx={{ color: 'text.secondary', fontSize: 'subtitle1.fontSize', textAlign: 'left' }}>
        Users Total Time Spent
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, }}>
        <Box sx={{ width: '260px', marginRight: '2px', gap: 5 }} >
          <Box ref={refOne} sx={{ position: 'relative' }}>
            <TextField fullWidth
              value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")}`}
              readOnly
              onClick={() => setOpen((prevOpen) => !prevOpen)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setOpen((prevOpen) => !prevOpen)}>
                      <DateRangeIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* <p>{totalspent}</p> */}
            <Box sx={{ mt: 3, mb: 3, flex: 1, width: "100%", justifyContent: 'flex-center', alignItems: 'center' }}>
              {totalspent ? <Typography > Total Time: {totalspent && totalspent.toFixed(2)} Minutes</Typography> : <Typography>The Users not spent any time</Typography>}
            </Box>

            {open && (
              <Box
                sx={{
                  position: 'absolute',
                  zIndex: 9999,
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  //  maxWidth: '260px', // Adjust the width here
                  textAlign: 'center',
                }}
              >
                <DateRangePicker
                  onChange={(item) => setRange([item.selection])}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  // color={"#00000"}
                  // fixedHeight=true
                  months={1}
                  direction="horizontal"
                  className="calendarElement"
                // calendarWidth={200}
                />
              </Box>
            )}
          </Box>
        </Box>
        <FormControl >
          {/* <InputLabel id="filter-label">Filter</InputLabel> */}
          <Select
            labelId="filter-label"
            id="filter"
            value={filter}
            onChange={handleFilterChange}
          >
            <MenuItem value="perDay">Per Day</MenuItem>
            <MenuItem value="perWeek">Per Week</MenuItem>
            <MenuItem value="perMonth">Per Month</MenuItem>
            <MenuItem value="perYear">Per Year</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div style={{ height: "100%", flexGrow: 1 }}>
        {series ? <ReactApexChart options={options} series={series} type="area" height={"100%"} /> : <Box><Typography>Loading...</Typography></Box>}
      </div>

    </Card>

  );
};

export default UserSpentTime;
