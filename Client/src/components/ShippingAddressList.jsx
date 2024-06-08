import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

const ShippingAddressList = () => {
  const [shippingAddresses, setShippingAddresses] = useState([]);

  useEffect(() => {
    // Fetch shipping addresses from the backend API when component mounts
    fetchShippingAddresses();
  }, []);

  const fetchShippingAddresses = async () => {
    try {
      // Simulated API call, replace with actual API call
      // const response = await fetch('/api/shipping_addresses');
      // const data = await response.json();
      
      // Dummy data
      const data = [
        {
          id: '1',
          user_id: '1',
          address: '123 XXX XX',
          address2: 'Apt XX',
          city: 'Los Angeles',
          state: 'California',
          zip_code: '90XXX',
          phone_number: '123-456-XXXX',
          shipping_type: 'Expedited',
          shipping_cost: 15.99,
        },
        {
          id: '2',
          user_id: '2',
          address: '456 XXX XX',
          address2: 'APT XX',
          city: 'Houston',
          state: 'Texas',
          zip_code: '77XXX',
          phone_number: '987-654-XXXX',
          shipping_type: 'Standard',
          shipping_cost: 5.99,
        },
        {
            id: '3',
            user_id: '3',
            address: '789 XXX XX',
            address2: 'APT XX',
            city: 'Herndon',
            state: 'Virginia',
            zip_code: '20XXX',
            phone_number: '571-525-XXXX',
            shipping_type: 'Standard',
            shipping_cost: 5.99,
          },
      ];

      setShippingAddresses(data);
    } catch (error) {
      console.error('Error fetching shipping addresses:', error);
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
    {
      title: 'Shipping Type',
      dataIndex: 'shipping_type',
      sorter: (a, b) => a.shipping_type.localeCompare(b.shipping_type),
    },
    {
      title: 'Shipping Cost',
      dataIndex: 'shipping_cost',
      sorter: (a, b) => a.shipping_cost - b.shipping_cost,
    }
  ];

  return (
    <div>
      <h1>Shipping Addresses</h1>
      <p>**No one besides the user is allowed to see their personal user information, the shipping address information is stored, just in case the user wants to use their previous saved information.**</p>
      <Table
        dataSource={shippingAddresses}
        columns={columns}
        rowKey="id"
        pagination={false}
        bordered
      />
    </div>
  );
};

export default ShippingAddressList;
