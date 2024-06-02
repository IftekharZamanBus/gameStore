import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {

      const data = [
        {
          id: '1',
          user_id: '1',
          shipping_address_id: '1',
          billing_address_id: '1',
          status: 'Processing',
          subtotal: 100.00,
          discount: 10.00,
          coupon_id: '1',
          tax_id: '1',
          grand_total: 97.50,
        },
        {
          id: '2',
          user_id: '2',
          shipping_address_id: '2',
          billing_address_id: '2',
          status: 'Shipped',
          subtotal: 200.00,
          discount: 20.00,
          coupon_id: '2',
          tax_id: '2',
          grand_total: 185.00,
        },
        {
            id: '3',
            user_id: '3',
            shipping_address_id: '3',
            billing_address_id: '3',
            status: 'Shipped',
            subtotal: 50.00,
            discount: 5.00,
            coupon_id: '3',
            tax_id: '3',
            grand_total: 47.50,
          },
        
      ];

      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const columns = [
    {
        title: 'Shipping Address ID',
        dataIndex: 'shipping_address_id',
        sorter: (a, b) => a.shipping_address_id.localeCompare(b.shipping_address_id),
      },
      {
        title: 'Billing Address ID',
        dataIndex: 'billing_address_id',
        sorter: (a, b) => a.billing_address_id.localeCompare(b.billing_address_id),
      },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      sorter: (a, b) => a.subtotal - b.subtotal,
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: 'Grand Total',
      dataIndex: 'grand_total',
      sorter: (a, b) => a.grand_total - b.grand_total,
    }
    
  ];

  return (
    <div>
      <h1>Orders</h1>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id"
        pagination={false}
        bordered
      />
    </div>
  );
};

export default OrderList;
