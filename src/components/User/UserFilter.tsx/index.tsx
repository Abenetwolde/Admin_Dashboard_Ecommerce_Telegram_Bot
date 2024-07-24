
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  InputAdornment,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Iconify from '../../Iconify';

const UserFilter = ({
  search,
  sortField,
  sortOrder,
  joinMethod,
  role,
  handleSearchChange,
  handleSortChange,
  handleSortOrderChange,
  handleJoinMethodChange,
  handleRoleChange,
}) => {
  return (
    <Grid container spacing={2} alignItems="center" px={3} mt={5 }mb={2}>
      <Grid item xs={12} md={4}>
        <TextField
          size="small"
          value={search}
          placeholder="Search users"
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start"><Iconify
                  icon={'eva:search-fill'}
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
            </InputAdornment>,
          }}

        />
      </Grid>
      <Grid item container xs={12} md={8} spacing={2}>
        <Grid item xs={6} sm={4} md={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortField} onChange={handleSortChange} label="Sort By">
              <MenuItem value="createdAt">Created At</MenuItem>
              <MenuItem value="first_name">First Name</MenuItem>
              <MenuItem value="username">User Name</MenuItem>
              <MenuItem value="language">Language</MenuItem>
              {/* Add more sorting options as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4}md={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Order</InputLabel>
            <Select value={sortOrder} onChange={handleSortOrderChange} label="Order">
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4}md={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Join Method</InputLabel>
            <Select value={joinMethod} onChange={handleJoinMethodChange} label="Join Method">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Bot">Bot</MenuItem>
              <MenuItem value="Refferal">Refferal</MenuItem>
              <MenuItem value="Channel">Channel</MenuItem>
              {/* Add more join methods as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4}md={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Role</InputLabel>
            <Select value={role} onChange={handleRoleChange} label="Role">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="SuperAdmin">SuperAdmin</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Tester">Tester</MenuItem>
              {/* Add more roles as needed */}
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid item xs={6} sm={4}md={3}>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default UserFilter;
