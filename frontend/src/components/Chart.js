import React from 'react';
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { theme } from '../theme';
const { colors } = theme;

const Chart = ({ historicalData }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={historicalData}
        margin={{ top: 20, right: 0, left: 0, bottom: 50 }}
      >
        <defs>
          <linearGradient id="color-high" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.blue} stopOpacity={0.8} />
            <stop offset="95%" stopColor={colors.blue} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="color-low" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.orange} stopOpacity={0.8} />
            <stop offset="95%" stopColor={colors.orange} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="label" />
        <YAxis type="number" domain={['dataMin', 'dataMax']} />

        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="high"
          stroke={colors.blue}
          fillOpacity={1}
          fill="url(#color-high)"
        />
        <Area
          type="monotone"
          dataKey="low"
          stroke={colors.orange}
          fillOpacity={1}
          fill="url(#color-low)"
        />
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
