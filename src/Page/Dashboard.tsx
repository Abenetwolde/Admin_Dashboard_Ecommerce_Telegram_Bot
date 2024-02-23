import React, { useState, useEffect } from 'react';
import { Col, Row } from "antd";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { format } from 'date-fns';
import api from '../services/api';
import { DashboardTotalCountCard } from '../components/Dashboard/total-count-card';
import { PieChart, Pie } from 'recharts';
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
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOrderLoading, setIsOrderLoading] = useState(true);
  const [iscancelOrderLoading, setIsCancelOrderLoading] = useState(true);

  const [totalUserCount, setTotalUserCount] = useState<number | undefined>(undefined);
  const [totalOrderCount, setTotalOrderCount] = useState<number | undefined>(undefined);
  const [totalCancelOrderCount, setTotalCancelOrderCount] = useState<number | undefined>(undefined);

  const [newUsersData, setNewUsersData] = useState([]);
  const [newOrderData, setNewOrderData] = useState([]);
  const [newCancelOrderData, setNewCancelOrderData] = useState([]);

  const [topOrderFood, settopOrderFood] = useState([]);
  const [userCounts, setUserCounts] = useState([]);
  const [opacity, setOpacity] = useState({ frombotcount: 1, fromchannelcount: 1 });

  const handleMouseEnter = (o) => {
    const { dataKey } = o;
    setOpacity(prevOpacity => ({ ...prevOpacity, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;
    setOpacity(prevOpacity => ({ ...prevOpacity, [dataKey]: 1 }));
  };
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
  );
};

export default Dashboard;
