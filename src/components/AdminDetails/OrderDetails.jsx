import React, { useEffect, useState } from 'react';
import { Card, Select, Statistic, Row, Col, Table, Tag, message, Image, Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  // Backend URL
  const BACKEND_URL = 'https://medialyx-backend-production.up.railway.app';

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/orders`);
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      } else {
        messageApi.error('Error fetching orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      messageApi.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        messageApi.success('Order status updated successfully');
        setOrders(prev => prev.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
      } else {
        messageApi.error(data.message || 'Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      messageApi.error('Failed to update order status');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalOrders = orders.length;
  const pending = orders.filter(o => o.status === 'Pending').length;
  const confirmed = orders.filter(o => o.status === 'Confirmed').length;
  const shipped = orders.filter(o => o.status === 'Shipped').length;
  const delivered = orders.filter(o => o.status === 'Delivered').length;
  const cancelled = orders.filter(o => o.status === 'Cancelled').length;

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'orange',
      'Confirmed': 'blue',
      'Shipped': 'purple',
      'Delivered': 'green',
      'Cancelled': 'red'
    };
    return colors[status] || 'default';
  };

  // Items column with images
  const renderOrderItems = (items) => (
    <div style={{ maxWidth: '200px' }}>
      {items.slice(0, 3).map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            padding: '4px',
            border: '1px solid #f0f0f0',
            borderRadius: '6px'
          }}
        >
          {/* Product Image */}
          <Image
            width={40}
            height={40}
            src={item.image || '/default-product.png'}
            alt={item.name}
            style={{
              objectFit: 'cover',
              borderRadius: '4px',
              marginRight: '8px'
            }}
            placeholder={
              <div style={{
                width: 40,
                height: 40,
                background: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px'
              }}>
                <EyeOutlined />
              </div>
            }
            fallback="/default-product.png"
          />

          {/* Product Details */}
          <div style={{ flex: 1 }}>
            <Tooltip title={item.name}>
              <div style={{
                fontSize: '12px',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '120px'
              }}>
                {item.name}
              </div>
            </Tooltip>
            <div style={{ fontSize: '11px', color: '#666' }}>
              Qty: {item.quantity} × Rs. {item.price}
            </div>
          </div>
        </div>
      ))}

      {/* Show more items indicator */}
      {items.length > 3 && (
        <Tag color="blue" style={{ fontSize: '10px', marginTop: '4px' }}>
          +{items.length - 3} more items
        </Tag>
      )}
    </div>
  );

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
      width: 120,
      render: (id) => <Tag color="geekblue" style={{ fontFamily: 'monospace' }}>#{id.slice(-8)}</Tag>
    },
    {
      title: 'Customer',
      key: 'customer',
      width: 150,
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: '600', fontSize: '14px' }}>{record.name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.phone}</div>
          {record.email && (
            <div style={{ fontSize: '11px', color: '#999' }}>
              {record.email}
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 180,
      render: (address) => (
        <Tooltip title={address}>
          <div style={{
            fontSize: '12px',
            maxWidth: '180px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {address}
          </div>
        </Tooltip>
      )
    },
    {
      title: 'Total',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 100,
      render: (amount) => <span style={{ fontWeight: '600', color: '#1890ff' }}>Rs. {amount}</span>,
      sorter: (a, b) => a.totalAmount - b.totalAmount
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record._id, value)}
          style={{ width: '100%', minWidth: '130px' }}
          size="small"
        >
          <Select.Option value="Pending">
            <Tag color="orange">Pending</Tag>
          </Select.Option>
          <Select.Option value="Confirmed">
            <Tag color="blue">Confirmed</Tag>
          </Select.Option>
          <Select.Option value="Shipped">
            <Tag color="purple">Shipped</Tag>
          </Select.Option>
          <Select.Option value="Delivered">
            <Tag color="green">Delivered</Tag>
          </Select.Option>
          <Select.Option value="Cancelled">
            <Tag color="red">Cancelled</Tag>
          </Select.Option>
        </Select>
      ),
      filters: [
        { text: 'Pending', value: 'Pending' },
        { text: 'Confirmed', value: 'Confirmed' },
        { text: 'Shipped', value: 'Shipped' },
        { text: 'Delivered', value: 'Delivered' },
        { text: 'Cancelled', value: 'Cancelled' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (date) => new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    },
    {
      title: 'Items',
      key: 'items',
      width: 200,
      render: (_, record) => renderOrderItems(record.items)
    }
  ];

  return (
    <div className="container mt-5">
      {contextHolder}

      {/* Statistics Row */}
      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={12} sm={8} md={4}>
          <Card size="small">
            <Statistic title="Total Orders" value={totalOrders} />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card size="small">
            <Statistic title="Pending" value={pending} valueStyle={{ color: '#faad14' }} />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card size="small">
            <Statistic title="Confirmed" value={confirmed} valueStyle={{ color: '#1890ff' }} />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card size="small">
            <Statistic title="Shipped" value={shipped} valueStyle={{ color: '#722ed1' }} />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card size="small">
            <Statistic title="Delivered" value={delivered} valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card size="small">
            <Statistic title="Cancelled" value={cancelled} valueStyle={{ color: '#ff4d4f' }} />
          </Card>
        </Col>
      </Row>

      {/* Orders Table */}
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>All Orders</span>
            <Tag color="blue">{totalOrders} orders</Tag>
          </div>
        }
        bordered={false}
        style={{
          background: 'rgba(255,255,255,0.95)',
          border: '1px solid #d9d9d9',
          borderRadius: '8px'
        }}
      >
        <Table
          dataSource={orders.map(order => ({ ...order, key: order._id }))}
          columns={columns}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} orders`
          }}
          scroll={{ x: 1200 }}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default OrderDetails;