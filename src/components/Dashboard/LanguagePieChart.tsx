import React from 'react';
import { PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORSd = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Define colors

const LanguagePieChart = ({ data }) => {
  const rearrangedData = Object.keys(data).map((language) => ({
    name: language.toUpperCase()=="AM"?"Amharic":"English",
    count: data[language].count,
    percentage: data[language].percentage,
  }));
  const renderTooltipContent = ({ payload }) => {
    if (!payload || payload.length === 0) return null;

    const { name, count, percentage } = payload[0].payload;
    return (
      <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
        <p>{name}</p>
        <p>Count: {count}</p>
        <p>Percentage: {percentage}%</p>
      </div>
    );
  };
  return (
   <ResponsiveContainer width={"100%"} height={400}>
    <PieChart>
      <Pie
        data={rearrangedData}
        cx="50%"
        cy="50%"
        label
        innerRadius={50}
        outerRadius={90}
        fill="#8884d8"
        paddingAngle={2}
        dataKey="count"
      >
        {rearrangedData.map((entry, index) => (
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
     <Tooltip content={renderTooltipContent} />
    </PieChart>
  </ResponsiveContainer>
  );
};

export default LanguagePieChart;
