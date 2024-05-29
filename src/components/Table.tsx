import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { DataItem } from '../redux/actions';

type SalesDataKey = 'weekEnding' | 'retailSales' | 'wholesaleSales' | 'unitsSold' | 'retailerMargin';

const Table: React.FC = () => {
  const [sortKey, setSortKey] = useState<SalesDataKey>('weekEnding');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const product = useSelector((state: { data: DataItem[] }) => state.data[0]);
  const salesData = product?.sales ?? [];

  const sortedData = [...salesData].sort((a, b) => {
    if (sortKey === 'weekEnding') {
      return sortOrder === 'asc'
        ? new Date(a[sortKey]).getTime() - new Date(b[sortKey]).getTime()
        : new Date(b[sortKey]).getTime() - new Date(a[sortKey]).getTime();
    }
    return sortOrder === 'asc' ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
  });

  const handleSort = (key: SalesDataKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  if (salesData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th className="sortable" onClick={() => handleSort('weekEnding')}>Week Ending</th>
            <th className="sortable" onClick={() => handleSort('retailSales')}>Retail Sales</th>
            <th className="sortable" onClick={() => handleSort('wholesaleSales')}>Wholesale Sales</th>
            <th className="sortable" onClick={() => handleSort('unitsSold')}>Units Sold</th>
            <th className="sortable" onClick={() => handleSort('retailerMargin')}>Retailer Margin</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((sale, index) => (
            <tr key={index}>
              <td>{sale.weekEnding}</td>
              <td>{sale.retailSales}</td>
              <td>{sale.wholesaleSales}</td>
              <td>{sale.unitsSold}</td>
              <td>{sale.retailerMargin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
