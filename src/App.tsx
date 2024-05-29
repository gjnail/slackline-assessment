import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setData } from './redux/actions';
import Header from './components/Header';
import Product from './components/Product';
import Chart from './components/Chart';
import Table from './components/Table';
import data from './assets/data/stackline_frontend_assessment_data_2021.json';
import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setData(data));
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <div className="content">
        <div className="card product-card">
          <Product />
        </div>
        <div className="main-content">
          <div className="card chart-card">
            <Chart />
          </div>
          <div className="card table-card">
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
