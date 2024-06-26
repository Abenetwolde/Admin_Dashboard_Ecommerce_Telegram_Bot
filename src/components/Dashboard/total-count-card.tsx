import React from "react";

import {  CloseSquareOutlined, ShoppingOutlined , UsergroupAddOutlined } from "@ant-design/icons";
import { Area, AreaConfig } from "@ant-design/plots";
import { Skeleton  } from "antd";
import { Card ,Typography} from "@mui/material";
import { useTheme } from "@mui/material";


type Type = "User" | "Order" | "Cancel";

type Props = {
  resource: Type;
  isLoading: boolean;
  totalCount?: number;
  data:any
};

export const DashboardTotalCountCard = ({
  resource,
  isLoading,
  totalCount,
  data,
}: Props) => {
  const { primaryColor, secondaryColor, icon, title } = variants[resource];
const theme =useTheme()
  const config: AreaConfig = {
    appendPadding: [1, 0, 0, 0],
    padding: 0,
    syncViewPadding: true,
    data: data,
    autoFit: true,
    tooltip: false,
    animation: false,
    xField: "index",
    yField: "value",
    xAxis: false,
    yAxis: {
      tickCount: 12,
      label: {
        style: {
          fill: "transparent",
        },
      },
      grid: {
        line: {
          style: {
            stroke: "transparent",
          },
        },
      },
    },
    smooth: true,
    areaStyle: () => {
      return {
        fill: `l(270) 0:#fff 0.2:${secondaryColor} 1:${primaryColor}`,
      };
    },
    line: {
      color: primaryColor,
    },
  };

  return (
    <Card style={{ height: "120px", padding: 5 }} variant="outlined">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
        }}
      >
        {icon}
        <Typography sx={{color: theme.palette.text.secondary,
    fontSize: theme.typography.subtitle2.fontSize,}} className="secondary size-20text-base ml-2" id={`${resource}-title`}>
          {title}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            flexShrink: 0,
            textAlign: "start",
            marginLeft: "48px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {isLoading ? (
            <Skeleton.Button
              style={{
                marginTop: "8px",
                width: "74px",
              }}
            />
          ) : (
            <Typography sx={{color: theme.palette.text.secondary,
              fontSize: theme.typography.subtitle2.fontSize,}} className="secondary size-20text-base ml-2" id={`${resource}-title`}>
                    {totalCount}
                  </Typography>
          )}
        </Typography>
        <Area
          {...config}
          style={{
            width: "50%",
          }}
        />
      </div>
    </Card>
  );
};

const IconWrapper = ({
  color,
  children,
}: React.PropsWithChildren<{ color: string }>) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        backgroundColor: color,
      }}
    >
      {children}
    </div>
  );
};

const variants: {
  [key in Type]: {
    primaryColor: string;
    secondaryColor?: string;
    icon: React.ReactNode;
    title: string;
  
  };
} = {
  User: {
    primaryColor: "#1677FF",
    secondaryColor: "#BAE0FF",
    icon: (
      <IconWrapper color={""}>
        <UsergroupAddOutlined 
          className="md"
          style={{
            color: "#1677FF",
            fontSize:25
          }}
        />
      </IconWrapper>
    ),
    title:"Number of User",

  },
  Order: {
    primaryColor: "#52C41A",
    secondaryColor: "#D9F7BE",
    icon: (
      <IconWrapper color={""} >
        <ShoppingOutlined 
          className="md"
          style={{
            color: "#52C41A",
         fontSize:25
          }}
        />
      </IconWrapper>
    ),
    title: "Number of Order",

  },
  Cancel: {
    primaryColor: "#FA541C",
    secondaryColor: "#FFD8BF",
    icon: (
      <IconWrapper color={""}>
        <CloseSquareOutlined
          className="md"
          style={{
            color: "#FA541C",
            fontSize:25
          }}
        />
      </IconWrapper>
    ),
    title: "Cancel Order",
 
  },
};