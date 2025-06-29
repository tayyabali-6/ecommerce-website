import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import { format } from 'date-fns';
import { Card, Select, Statistic, Row, Col, Table, Tag } from 'antd';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'orders'));
    const orderList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setOrders(orderList);
    setLoading(false);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    await updateDoc(doc(firestore, 'orders', orderId), { status: newStatus });
    setOrders(prev => prev.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalOrders = orders.length;
  const pending = orders.filter(o => o.status === 'Pending').length;
  const success = orders.filter(o => o.status === 'Success').length;

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Total', dataIndex: 'totalAmount', key: 'totalAmount', render: t => `Rs. ${t}` },
    {
      title: 'Status', dataIndex: 'status', key: 'status', render: (status, record) => (
        <Select
          defaultValue={status}
          onChange={(value) => handleStatusChange(record.id, value)}
          style={{ width: 120 }}
        >
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Success">Success</Select.Option>
          <Select.Option value="Cancelled">Cancelled</Select.Option>
        </Select>
      )
    },
    { title: 'Time', dataIndex: 'time', key: 'time', render: t => format(t.toDate(), 'dd MMM yyyy hh:mm a') },
    {
      title: 'Items', key: 'items', render: (_, record) => (
        <ul className="mb-0">
          {record.items.map((item, i) => (
            <li key={i}>{item.title} × {item.quantity}</li>
          ))}
        </ul>
      )
    }
  ];

  return (
    <div className="container mt-5">
      <Row gutter={16} className="mb-4">
        <Col span={8}><Card><Statistic title="Total Orders" value={totalOrders} /></Card></Col>
        <Col span={8}><Card><Statistic title="Pending Orders" value={pending} valueStyle={{ color: '#faad14' }} /></Card></Col>
        <Col span={8}><Card><Statistic title="Success Orders" value={success} valueStyle={{ color: '#52c41a' }} /></Card></Col>
      </Row>

      <Card title="All Orders" bordered={false}>
        <Table
          dataSource={orders.map(order => ({ ...order, key: order.id }))}
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 6 }}
        />
      </Card>
    </div>
  );
};

export default OrderDetails;
