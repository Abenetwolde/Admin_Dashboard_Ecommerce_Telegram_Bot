
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
import Iconify from '../Iconify';

const FilterPayment = ({

  paymentStatus,
  sortOrder,
  orderStatus,
  handleOrderStatusChange,
  paymentType,
  handleSortOrderChange,
  handlePaymentTypeChange,
  handlePaymentStatusChange

}) => {
  return (
    <Grid container spacing={2} alignItems="center" px={3} mt={5} mb={2}>
      <Grid item xs={12} md={4}>

      </Grid>
      <Grid item container xs={12} md={8} spacing={2}>

        <Grid item xs={6} sm={4} md={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Order</InputLabel>
            <Select value={sortOrder} onChange={handleSortOrderChange} label="Order">
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Order Status</InputLabel>
            <Select value={orderStatus} onChange={handleOrderStatusChange} label="Join Method">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              {/* Add more join methods as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Payment Status</InputLabel>
            <Select value={paymentStatus} onChange={handlePaymentStatusChange} label="Join Method">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>


              {/* Add more join methods as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Payment Method</InputLabel>
            <Select value={paymentType} onChange={handlePaymentTypeChange} label="Payment Method">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="online">Online</MenuItem>

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

export default FilterPayment;
