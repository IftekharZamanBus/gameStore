import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

const BillingAddressList = () => {
  const [billingAddresses, setBillingAddresses] = useState([]);

  useEffect(() => {
    // Fetch billing addresses from the backend API when component mounts
    fetchBillingAddresses();
  }, []);

  const fetchBillingAddresses = async () => {
    try {
      // Simulated API call, replace with actual API call
      // const response = await fetch('/api/billing_addresses');
      // const data = await response.json();
      
      // Dummy data
      const data = [
        {
          id: '1',
          user_id: '1',
          address: '789 XXX XX',
          address2: 'Suite XX',
          city: 'San Francisco',
          state: 'California',
          zip_code: '94XXX',
          phone_number: '111-222-XXXX',
        },
        {
          id: '2',
          user_id: '2',
          address: '321 XXX XX',
          address2: 'Suite XX',
          city: 'Dallas',
          state: 'Texas',
          zip_code: '75XXX',
          phone_number: '444-555-XXXX',
        },
        {
            id: '3',
            user_id: '3',
            address: '456 XXX XX',
            address2: 'Suite XX',
            city: 'Herndon',
            state: 'Virginia',
            zip_code: '20XXX',
            phone_number: '111-222-XXXX',
          },
      ];

      setBillingAddresses(data);
    } catch (error) {
      console.error('Error fetching billing addresses:', error);
    }
  };

  const columns = [
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: 'Address 2',
      dataIndex: 'address2',
      sorter: (a, b) => a.address2.localeCompare(b.address2),
    },
    {
      title: 'City',
      dataIndex: 'city',
      sorter: (a, b) => a.city.localeCompare(b.city),
    },
    {
      title: 'State',
      dataIndex: 'state',
      sorter: (a, b) => a.state.localeCompare(b.state),
    },
    {
      title: 'Zip Code',
      dataIndex: 'zip_code',
      sorter: (a, b) => a.zip_code.localeCompare(b.zip_code),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      sorter: (a, b) => a.phone_number.localeCompare(b.phone_number),
    },
  ];

  return (
    <div>
      <h1>Billing Addresses</h1>
      <p>**No one besides the user is allowed to see their personal user information, the billing address information is stored just in case the user wants to use their previous saved information.**</p>
      <Table
        dataSource={billingAddresses}
        columns={columns}
        rowKey="id"
        pagination={false}
        bordered
      />
    </div>
  );
};

export default BillingAddressList;
