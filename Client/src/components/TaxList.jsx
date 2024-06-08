import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

const TaxList = () => {
  const [taxes, setTaxes] = useState([]);

  useEffect(() => {
    // Fetch taxes from the backend API when component mounts
    fetchTaxes();
  }, []);

  const fetchTaxes = async () => {
    try {
      // Simulated API call, replace with actual API call
      // const response = await fetch('/api/taxes');
      // const data = await response.json();
      
      // Dummy data
      const data = [
        { id: 1, state_name: 'California', rate: 7.25, previous_rate: 7.00 },
        { id: 2, state_name: 'Texas', rate: 6.25, previous_rate: 6.00 },
        { id: 3, state_name: 'Florida', rate: 6.00, previous_rate: 5.75 },
        { id: 4, state_name: 'New York', rate: 4.00, previous_rate: 3.75 },
        { id: 5, state_name: 'Nevada', rate: 8.25, previous_rate: 8.00 },
      ];

      setTaxes(data);
    } catch (error) {
      console.error('Error fetching taxes:', error);
    }
  };

  const columns = [
    {
      title: 'State Name',
      dataIndex: 'state_name',
      sorter: (a, b) => a.state_name.localeCompare(b.state_name),
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      sorter: (a, b) => a.rate - b.rate,
    },
    {
      title: 'Previous Rate',
      dataIndex: 'previous_rate',
      sorter: (a, b) => a.previous_rate - b.previous_rate,
    },
  ];

  return (
    <div>
      <h1>Taxes</h1>
      <Table
        dataSource={taxes}
        columns={columns}
        rowKey="id"
        pagination={false}
        bordered
      />
    </div>
  );
};

export default TaxList;
