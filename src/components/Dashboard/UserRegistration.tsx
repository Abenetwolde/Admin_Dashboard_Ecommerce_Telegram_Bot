// UserAnalysisCard.js

import { Card, Typography, Box, TextField, InputAdornment, IconButton, FormControl, Select, MenuItem, Skeleton, CardHeader } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { addDays, format, startOfMonth } from 'date-fns';
import { useEffect, useRef, useState } from 'react';

import { useGetNewUserQuery, useGetUserRangeMutation } from '../../redux/Api/userKpiSlice';
import useIntersectionObserver from '../../redux/Api/utils/useIntersectionObserver';
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
const UserRegistration = () => {
  const [filter, setFilter] = useState('perMonth');
  const [ref, isVisible] = useIntersectionObserver();
  const [loadingRange, setLoading] = useState(false); 
  const [range, setRange] = useState([
    {
      startDate: startOfMonth(new Date()),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [open, setOpen] = useState(false);
  const refOne = useRef(null);
  const [userCounts, setUserCounts] = useState([]);
  const [totalUserCount, setTotalUserCount] = useState(0);

  const [getUserRange] = useGetUserRangeMutation();
  // const { data: newUserCounts,isLoading, refetch: refetchNewUser } = useGetNewUserQuery(filter/* ,{ skip: !filter } */);
  const { data: newUserCounts, isLoading: isLoadingNewUser, refetch: refetchNewUser } = useGetNewUserQuery(filter, {
    refetchOnMountOrArgChange: true, 
  });


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await getUserRange({
          startDate: range[0].startDate,
          endDate: range[0].endDate,
        }).unwrap();

        setUserCounts(response?.newUserCounts);
        setTotalUserCount(response?.totalUsers);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      setLoading(false); // Stop loading
    };

    fetchData();
  }, [range, getUserRange,isVisible, refetchNewUser]);
  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])
  useEffect(() => {
    if (newUserCounts) {
      setUserCounts(newUserCounts?.newUserCounts);
      setTotalUserCount(newUserCounts?.totalUsers);
    }
  }, [newUserCounts]);
  useEffect(() => {
    if (isVisible) {
      refetchNewUser();
    }
  }, [isVisible, refetchNewUser]);
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false)
    }
  }
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false)
    }
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    refetchNewUser();
  };

  const [opacity, setOpacity] = useState({
    frombotcount: 1,
    fromchannelcount: 1,
    frominvitation: 1,
  });

  const handleMouseEnter = (o) => {
    const { dataKey } = o;
    setOpacity({ ...opacity, [dataKey]: 0.5 });
  };
  

  const handleMouseLeave = (o) => {
    const { dataKey } = o;
    setOpacity({ ...opacity, [dataKey]: 1 });
  };
  const loading = loadingRange || isLoadingNewUser;
return(
  <div ref={ref}>


  <Card  className='p-3 mt-10'>
  <Box sx={{ mb: 3, textAlign: 'left' }}>
  <CardHeader sx={{ mb: 3, textAlign: 'left' }} title={`New User Registraton`}  sx={{ mb: 3 }} />
</Box>
  <Box display="flex" justifyContent="flex-end" mb={2}>
    <Box width="260px" mr={2} gap={5}>
      <Box ref={refOne} position="relative">
      {loading ? (
          <Skeleton variant="rectangular" width="100%" height={40} />
        ) : (
          <TextField
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
              onChange={(item) => setRange([item.selection])}
              editableDateInputs
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
    <FormControl size="small">
      {loading ? (
        <Skeleton variant="rectangular" width={100} height={40} />
      ) : (
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
      )}
    </FormControl>
  </Box>
  <Box sx={{ mt: 3, mb: 3, flex: 1, width: '100%', display: 'flex',justifyContent: 'center', alignItems: 'center' }}>
    {loading ? (
      <Skeleton  variant="text" width={200} height={50} />
    ) : (
      <Typography textAlign={"center"}>Total Register: {totalUserCount} Users</Typography>
    )}
  </Box>
  <ResponsiveContainer height={300}>
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
        {[...Array(3)].map((_, index) => (
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
      <BarChart data={userCounts??userCounts}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="_id"
          tickFormatter={(date) => (filter === "perYear" ? date : date)}
          interval="preserveStartEnd"
        />
        <YAxis />
        <Tooltip content={<CustomTooltip label={undefined} payload={undefined} />} />
        <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        <Bar dataKey="frombotcount" stackId="a" fill="#00E7FF" name="Bot" fillOpacity={opacity.frombotcount} />
        <Bar dataKey="fromchannelcount" stackId="a" fill="#7091F5" name="Channel" fillOpacity={opacity.fromchannelcount} />
        <Bar dataKey="frominvitation" stackId="a" fill="#FA541C" name="Referral" fillOpacity={opacity.frominvitation} />
      </BarChart>
    )}
  </ResponsiveContainer>
</Card>
</div>
)
}

export default UserRegistration;
