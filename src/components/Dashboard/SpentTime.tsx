import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Card, CardHeader, FormControl, IconButton, InputAdornment, MenuItem, Select, Skeleton, TextField, Typography, useTheme } from '@mui/material';
import { format, startOfMonth, subDays } from 'date-fns';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useGetUserSpentTimeRangeMutation, useGetUserSpentTimeIntervalQuery } from '../../redux/Api/userKpiSlice';
import { DateRangePicker } from 'react-date-range';
import useIntersectionObserver from '../../redux/Api/utils/useIntersectionObserver';

const UserSpentTime = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const theme = useTheme();
  const refOne = useRef(null);
  const [open, setOpen] = useState(false);
  const [userTime, setUserTime] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [loadingRange, setLoading] = useState(false); 
  const [isDateRangeActive, setIsDateRangeActive] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: startOfMonth(new Date()),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [filter, setFilter] = useState('perMonth');
  const { data: intervalData, isLoading: intervalLoading , refetch: refetchTime} = useGetUserSpentTimeIntervalQuery(filter,{refetchOnMountOrArgChange: true, 
  });
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    refetchTime()
  };

  // React Query hooks
  const [getTimeRange] = useGetUserSpentTimeRangeMutation() 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const data = await getTimeRange({
          startDate: range[0]?.startDate,
          endDate: range[0]?.endDate,
        }).unwrap();

        setUserTime(data?.userTime);
        setTotalTime(data?.totalDurationInMinutes);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
     setLoading(false); // Stop loading
    };

    fetchData();
  }, [range,getTimeRange,isVisible, refetchTime]);
  useEffect(() => {
    if (isVisible) {
      refetchTime();
    }
  }, [isVisible, refetchTime]);
  useEffect(() => {
    if (intervalData) {
      setUserTime(intervalData?.userTime);
      setTotalTime(intervalData?.totalDurationInMinutes);
    }
  }, [intervalData]);
  // const series = userTime ? [{
  //   name: 'Time Spent',
  //   data: userTime.map(item => item?.totalDurationInMinutes),
  // }] : [];
  const series = userTime ? [{
    name: 'Time Spent',
    data: userTime.map(item => ({
      x: item._id, // Format the date
      y: item.totalDurationInMinutes
    })),
  }] : [];
  const [options] = useState({
    chart: {
      type: 'area',
      zoom: {
        autoScaleYaxis: false,
      },
    },
    // annotations: {
    //   yaxis: [{
    //     y: 30,
    //     borderColor: '#999',
    //     label: {
    //       show: true,
    //       text: 'Daily Goal',
    //       style: {
    //         color: "#fff",
    //         background: '#00E396',
    //       },
    //     },
    //   }],
    // },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    xaxis: {
  type: 'categories',
      // categories: categories,
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val + ' min';
        },
      },
    },
    // tooltip: {
    //   x: {
    //     formatter: function (val) {
    //       return val; // Display the ID directly
    //     },
    //   },
    // },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    selection: 'one_year',
  });

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
    return () => {
      document.removeEventListener("keydown", hideOnEscape, true);
      document.removeEventListener("click", hideOnClickOutside, true);
    };
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };
  const loading = loadingRange || intervalLoading;
  return (
    <Card ref={ref} className='p-3 mt-5'>
      <Box sx={{ mb: 3, textAlign: 'left' }}>
        <CardHeader sx={{ mb: 3, textAlign: 'left' }} title={`Users Total Time Spent`} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Box sx={{ width: '260px', marginRight: '2px', gap: 5 }}>
          <Box ref={refOne} sx={{ position: 'relative' }}>
          {loading ? (
          <Skeleton variant="rectangular" width="100%" height={40} />
        ) : (<TextField
              fullWidth
              size='small'
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
          )}
             {!loading ? (<Box sx={{ mt: 3, mb: 3, flex: 1, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
              {totalTime
 ? (
                <Typography>Total Time: {totalTime?.toFixed(2)} Minutes</Typography>
              ) : (
                <Typography>The Users not spent any time</Typography>
              )}
            </Box>):(
                <Box sx={{ mt: 3, mb: 3, flex: 1, width: '100%', display: 'flex',justifyContent: 'center', alignItems: 'center' }}>
                  <Skeleton  variant="text" width={200} height={50} />
               
              </Box>
            )}

            {open && (
              <Box
                sx={{
                  position: 'absolute',
                  zIndex: 9999,
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  textAlign: 'center',
                }}
              >
                <DateRangePicker
                  size='small'
                  onChange={(item) => setRange([item.selection])}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  months={1}
                  direction="horizontal"
                  className="calendarElement"
                />
              </Box>
            )}
          </Box>
        </Box>
        <FormControl>
        {loading ? (
        <Skeleton variant="rectangular" width={100} height={40} />
      ) : (
          <Select
            size='small'
            labelId="filter-label"
            id="filter"
            value={filter}
            onChange={handleFilterChange}
          >
            {/* <MenuItem value="perDay">Per Day</MenuItem> */}
            <MenuItem value="perWeek">Per Week</MenuItem>
            <MenuItem value="perMonth">Per Month</MenuItem>
            <MenuItem value="perYear">Per Year</MenuItem>
          </Select>
      )}
        </FormControl>
      </Box>
      <div style={{ height: 300, flexGrow: 1 }}>
        {loading ? (
           <>
           <Skeleton variant="rectangular" width="100%" height={270} />
           <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop:1
            }}
          >
            {[...Array(2)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems:'center',
                  width: '100%',
                   maxWidth: '100px',
                   gap:1 // You can adjust the maxWidth as needed
         
                }}
              >
                <Skeleton variant="rectangular" width={20} height={20} />
                <Skeleton variant="rectangular" width={40} height={20} />
              </Box>
            ))}
          </Box>
        </>
        ) : (
          <ReactApexChart options={options} series={series} type="area" height={"100%"} />
        )}
      </div>
    </Card>
  );
};

export default UserSpentTime;
