import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DataItem } from '../redux/actions';

type SalesDataKey = 'weekEnding' | 'retailSales' | 'wholesaleSales' | 'unitsSold' | 'retailerMargin';

const Chart: React.FC = () => {
  const [sortKey, setSortKey] = useState<SalesDataKey>('weekEnding');
  const [showRetailSales, setShowRetailSales] = useState(true);
  const [showWholesaleSales, setShowWholesaleSales] = useState(true);
  const product = useSelector((state: { data: DataItem[] }) => state.data[0]);
  const salesData = product?.sales ?? [];

  const sortedData = [...salesData].sort((a, b) => {
    if (sortKey === 'weekEnding') {
      return new Date(a[sortKey]).getTime() - new Date(b[sortKey]).getTime();
    }
    return b[sortKey] - a[sortKey];
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(e.target.value as SalesDataKey);
  };

  if (salesData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chart">
      <h2>Retail Sales</h2>
      <div className="controls">
        <div className="sort-controls">
          <label htmlFor="sortKey">Sort by: </label>
          <select id="sortKey" value={sortKey} onChange={handleSortChange}>
            <option value="weekEnding">Week Ending</option>
            <option value="retailSales">Retail Sales</option>
            <option value="wholesaleSales">Wholesale Sales</option>
            <option value="unitsSold">Units Sold</option>
            <option value="retailerMargin">Retailer Margin</option>
          </select>
        </div>
        <div className="toggle-controls">
          <label>
            <input
              type="checkbox"
              checked={showRetailSales}
              onChange={() => setShowRetailSales(!showRetailSales)}
            />
            Show Retail Sales
          </label>
          <label>
            <input
              type="checkbox"
              checked={showWholesaleSales}
              onChange={() => setShowWholesaleSales(!showWholesaleSales)}
            />
            Show Wholesale Sales
          </label>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="weekEnding" />
          <YAxis />
          <Tooltip />
          <Legend />
          {showRetailSales && <Line type="monotone" dataKey="retailSales" stroke="#8884d8" />}
          {showWholesaleSales && <Line type="monotone" dataKey="wholesaleSales" stroke="#82ca9d" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
