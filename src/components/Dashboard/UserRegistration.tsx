// UserAnalysisCard.js

import { Card, Typography, Box, TextField, InputAdornment, IconButton, FormControl, Select, MenuItem } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { format } from 'date-fns';

const UserRegistration = ({ refOne, range, setRange, open, setOpen, filter, handleFilterChange, totalUserCount, userCounts, handleMouseEnter, handleMouseLeave, opacity, CustomTooltip }) => (
  <Card
    sx={{
      width: { xs: '100%', lg: '100%' },
      mb: { xs: 5, lg: 2 },
      mt: { xs: 5, lg: 2 },
      borderRadius: '16px',
      boxShadow: 3,
      p: 2,
      textAlign: 'center'
    }}
  >
    <Typography sx={{ color: 'text.primary', fontSize: 'subtitle1.fontSize', textAlign: 'left' }}>
      User Register
    </Typography>
    <Box display="flex" justifyContent="flex-end" mb={2}>
      <Box width="260px" mr={2} gap={5}>
        <Box ref={refOne} position="relative">
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
    <Box sx={{ mt: 3, mb: 3, flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
      <Typography>Total Register: {totalUserCount} Users</Typography>
    </Box>
    <ResponsiveContainer height={300}>
      <BarChart data={userCounts}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="_id"
          tickFormatter={(date) => (filter === "perYear" ? date : date)}
          interval="preserveStartEnd"
        />
        <YAxis />
        <Tooltip content={<CustomTooltip label={undefined} payload={undefined} />} />
        <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        <Bar dataKey="frombotcount" stackId="a" fill="#00E7FF" name="From Bot" fillOpacity={opacity.frombotcount} />
        <Bar dataKey="fromchannelcount" stackId="a" fill="#7091F5" name="From Channel" fillOpacity={opacity.fromchannelcount} />
        <Bar dataKey="frominvitation" stackId="a" fill="#FA541C" name="From Invitation" fillOpacity={opacity.frominvitation} />
      </BarChart>
    </ResponsiveContainer>
  </Card>
);

export default UserRegistration;
