import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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

import useSettings from '../hooks/useSettings';
import AllOrderStatus from '../components/OrderDashboard/AllOrderStatus';
import CancelANdComplatedOrder from '../components/OrderDashboard/CancelANdComplatedOrder';
import CashAndOnine from '../components/OrderDashboard/CashAndOnine';
import MostOfOrderCategory from '../components/OrderDashboard/MostOfOrderCategory';
import MostOfOrderProduct from '../components/OrderDashboard/MostOfOrderProduct';
import CategoryMostClicked from '../components/OrderDashboard/CategoryMostClicked';
import ProductMostClicked from '../components/OrderDashboard/ProductMostClicked';
import ComplateOrder from '../components/Cards/Order/CompateOrder';
import CancelOrder from '../components/Cards/Order/CancelOrder';
import CashOrder from '../components/Cards/Order/CashOrder';
import OnlineOrder from '../components/Cards/Order/OnlineOrder';
import TotalTransaction from '../components/Cards/Order/TotalTransaction';
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
const OrderDashboard = () => {
  const theme = useTheme()
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [isOrderLoading, setIsOrderLoading] = useState(true);
  const [iscancelOrderLoading, setIsCancelOrderLoading] = useState(true);

  const [totalUserCount, setTotalUserCount] = useState<number | undefined>(0);
  const [totalOrderCount, setTotalOrderCount] = useState<number | undefined>(undefined);
  const [totalCancelOrderCount, setTotalCancelOrderCount] = useState<number | undefined>(undefined);
  const [newOrderData, setNewOrderData] = useState([]);
  const [newCancelOrderData, setNewCancelOrderData] = useState([]);
  const [userCounts, setUserCounts] = useState([]);


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




  const { themeStretch } = useSettings();
  const [OrderStatus, setOrderStatus] = useState([]);
  const [cancelAndComplated, setcancelAndComplated] = useState([]);
  const [filterOfStatus, setFilterOFStatus] = useState("perMonth");
  const [cashVsOnline, setCashVsOnline] = useState([]);
  const [cashVsOnlineFilter, setCashVsOnlineFilter] = useState("perMonth");
  const [categoriesbyOrder, setCategoriesbyOrder] = useState([]);
  const [filterCategoriesbyOrder, setCategoriesbyOrderFilter] = useState("perMonth");
  const [productbyOrder, setProductbyOrder] = useState([]);
  const [filterProductsbyOrder, setProductbyOrderFilter] = useState("perMonth");
  const [categorybyClick, setCategoryByClick] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("perMonth");
  const [productbyClick, setProductByClick] = useState([]);
  const [productFilter, setProductFilter] = useState("perMonth");
  const handleFilterOFStatusChange = (filter) => {
    setFilterOFStatus(filter);
  };
  const handleCategoryFilter = (filter) => {
    setCategoryFilter(filter);
  };
  const handleProductFilter = (filter) => {
    setProductFilter(filter);
  };
  const [cancelVsComppated, setcancelVsComppated] = useState("perMonth");
  const handlesetCancelVsComppated = useCallback((filter) => {
    setcancelVsComppated(filter);
  }, []);
  const handlesetCashVsOnline = useCallback((filter) => {
    setCashVsOnlineFilter(filter);
  }, []);
  const handleCategoriesOrder = useCallback((filter) => {
    setCategoriesbyOrderFilter(filter);
  }, []);
  const handleProductOrder = useCallback((filter) => {
    setProductbyOrderFilter(filter);
  }, []); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/order/getorderby-cancel-and-complated?interval=${filterOfStatus}`); // Replace with your actual API endpoint
        const data = response.data.result;
        const aggregatedData = aggregateData(data);
        setOrderStatus(aggregatedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filterOfStatus]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/order/getorderby-cancel-and-complated?interval=${cancelVsComppated}`); // Replace with your actual API endpoint
        const data = response.data.result;
        const transformedData = transformData(data);
        setcancelAndComplated(transformedData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [cancelVsComppated]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/order/getorderby-cash-and-online?interval=${cashVsOnlineFilter}`); // Replace with your actual API endpoint
        const data = response.data.result;
        const transformedData = transformDataForCashAndOnline(data);
        setCashVsOnline(transformedData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [cashVsOnlineFilter]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/order/get-order-most-order-category?interval=${filterCategoriesbyOrder}`); // Replace with your actual API endpoint
        const data = response.data?.categorycount;
        // const transformedData = transformDataForCashAndOnline(data);
        setCategoriesbyOrder(data)
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filterCategoriesbyOrder]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/order/get-order-most-order-product?interval=${filterProductsbyOrder}`); // Replace with your actual API endpoint
        const data = response.data?.result;
        // const transformedData = transformDataForCashAndOnline(data);
        setProductbyOrder(data)
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filterProductsbyOrder]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/category/get-category-most-cliked?interval=${categoryFilter}`); // Replace with your actual API endpoint
        const data = response.data;
        // const transformedData = transformDataForCashAndOnline(data);
        setCategoryByClick(data)
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [categoryFilter]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/product/get-product-most-cliked?interval=${productFilter}`); // Replace with your actual API endpoint
        const data = response.data;

        setProductByClick(data)
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [productFilter]);
  const MemoizedCancelAndComplatedOrder = useMemo(() => {
    return React.memo(CancelANdComplatedOrder);
  }, []);
  
  const MemoizedCategoryClikced = useMemo(() => {
    return React.memo(CategoryMostClicked)
  }, []);
  const MemoizedProductClikced = useMemo(() => {
    return React.memo(ProductMostClicked)
  }, []);
  const MemoizedCashAndOnine = useMemo(() => {
    return React.memo(CashAndOnine);
  }, []);
  const MemoizedCategoryMostOrder = useMemo(() => {
    return React.memo(MostOfOrderCategory);
  }, []);
  const MemoizedProdcutMostOrder = useMemo(() => {
    return React.memo(MostOfOrderProduct);
  }, []);
  const aggregateData = (data) => {
    const statusCounts = data.reduce((acc, day) => {
      day.orders.forEach((order) => {
        acc[order.status] = (acc[order.status] || 0) + order.count;
      });
      return acc;
    }, {});

    const totalCount: any = Object.values(statusCounts).reduce((acc, count) => acc + count, 0);

    return Object.entries(statusCounts).map(([status, count]: any) => ({
      label: `Total ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      amount: count,
      value: ((count / totalCount) * 100).toFixed(2) // Calculate percentage
    }));
  };

  const transformData = (data) => {
    const transformedData = data.map((item) => {
      const cancelledOrders = item.orders.find(order => order.status === 'cancelled')?.count || 0;
      const completedOrders = item.orders.find(order => order.status === 'delivered' || order.status === 'completed')?.count || 0;

      return {
        date: item.createdAt,
        cancelled: cancelledOrders,
        completed: completedOrders,
      };
    });

    return [
      {
        name: 'Cancelled Orders',
        data: transformedData.map(item => ({
          x: item.date,
          y: item.cancelled,
        })),
      },
      {
        name: 'Completed Orders',
        data: transformedData.map(item => ({
          x: item.date,
          y: item.completed,
        })),
      },
    ];
  };
  const transformDataForCashAndOnline = (data) => {
    const transformedData = data.map((item) => {
      const cancelledOrders = item.orders.find(order => order.status === 'Cash')?.count || 0;
      const completedOrders = item.orders.find(order => order.status === 'online')?.count || 0;

      return {
        date: item.createdAt,
        cancelled: cancelledOrders,
        completed: completedOrders,
      };
    });

    return [
      {
        name: 'Cash Payment',
        data: transformedData.map(item => ({
          x: item.date,
          y: item.cancelled,
        })),
      },
      {
        name: ' Online Payment',
        data: transformedData.map(item => ({
          x: item.date,
          y: item.completed,
        })),
      },
    ];
  };
  const anotherComponentRef = useRef(null);
  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
         <Grid container spacing={2}>
          <Grid lg={4} item  justifyContent="center">
            <ComplateOrder anotherComponentRef={anotherComponentRef} />
          </Grid>
          <Grid lg={4} item  justifyContent="center">
            <CancelOrder anotherComponentRef={anotherComponentRef}/>
          </Grid>
          <Grid lg={4} item  justifyContent="center">
         <CashOrder/>
          </Grid>
          <Grid lg={4} item  justifyContent="center">
         <OnlineOrder/>
          </Grid>
          <Grid lg={4} item  justifyContent="center">
         <TotalTransaction/>
          </Grid>
        </Grid>
      <Grid container spacing={3} mt={5}>
        <Grid item xs={12} md={6} lg={6} width="100%" textAlign="center">
          <AllOrderStatus OrderStatus={OrderStatus} handleFilterOFStatusChange={handleFilterOFStatusChange} filterOfStatus={filterOfStatus} />
          {/* <UserPerformance data={userperformance} loading={loadingUserPerformance} filterUserPerformanceTable={filterUserPerformanceTable} handleFilterUserPerformanceTable={handleFilterUserPerformanceTable} isFalse={false}  /> */}


        </Grid>
        <Grid item columnSpacing={2} xs={12} md={6} lg={6} width="100%" textAlign="center">
          <MemoizedCategoryClikced
            data={categorybyClick}
            handleFilterOFStatusChange={handleCategoryFilter}
            filterOfStatus={categoryFilter} />

        </Grid>
        <Grid item columnSpacing={2} xs={12} md={6} lg={6} width="100%" textAlign="center">
          <MemoizedProductClikced
            data={productbyClick}
            handleFilterOFStatusChange={handleProductFilter}
            filterOfStatus={productFilter} />

        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <MemoizedCancelAndComplatedOrder
            OrderStatus={cancelAndComplated}
            handleFilterOFStatusChange={handlesetCancelVsComppated}
            filterOfStatus={cancelVsComppated}
          />

        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <MemoizedCashAndOnine
            OrderStatus={cashVsOnline}
            handleFilterOFStatusChange={handlesetCashVsOnline}
            filterOfStatus={cashVsOnlineFilter}
          />

        </Grid>
        <Grid item xs={12} md={6} lg={6} width="100%" textAlign="center">
          <MemoizedCategoryMostOrder
            data={categoriesbyOrder}
            handleFilterOFStatusChange={handleCategoriesOrder}
            filterOfStatus={filterCategoriesbyOrder} />

        </Grid>
        <Grid item xs={12} md={6} lg={6} width="100%" textAlign="center">
          <MemoizedProdcutMostOrder
            data={productbyOrder}
            handleFilterOFStatusChange={handleProductOrder}
            filterOfStatus={filterProductsbyOrder} />

        </Grid>
      </Grid>





    </Container >
  );
};

export default OrderDashboard;
