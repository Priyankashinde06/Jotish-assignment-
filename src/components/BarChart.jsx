import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchTableData } from '../services/api';
import '../styles/BarChart.css';

const SalaryChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await fetchTableData();
      let list = Array.isArray(result) ? result : result.data || [];
      
      // Take first 10 employees
      list = list.slice(0, 10);

      // Transform data for the chart. 
      // Assuming fields 'name' and 'salary' exist. 
      // If the API returns different keys, change 'name'/'salary' below.
      const formatted = list.map(item => ({
        name: item.name || item.Name || item.firstName || "Unknown",
        salary: parseFloat(item.salary || item.Salary || item.income || 0)
      }));
      
      setChartData(formatted);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div  style={{ textAlign: 'center', padding: '50px', color: 'white', fontSize: '1.5rem' }}>
        <div className="loading"></div>
        <p>Loading chart data...</p>
      </div>
    );
  }

  return (
    <div className="chart-container fade-in">
      <h2>Salary Distribution (First 10 Employees)</h2>
      <button onClick={() => navigate('/list')}>← Back to List</button>
      
      {chartData.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '10px' }}>
          <p>No salary data available</p>
        </div>
      ) : (
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="salary" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default SalaryChart;