import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/Auth';
import { Card, Row, Col, Statistic, Table, Tag, Avatar, Typography, Spin, Empty, Image, Tooltip } from 'antd';
import { UserOutlined, ShoppingOutlined, DollarOutlined, ClockCircleOutlined, EyeOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const UserDashboard = () => {
  const { user: authUser } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalSpent: 0
  });

  useEffect(() => {
    const fetchOrders = async () => {
      if (!authUser?.id) return;

      try {
        const response = await fetch(`http://localhost:5000/api/orders/user/${authUser.id}`);
        const data = await response.json();
        
        if (data.success) {
          setOrders(data.orders);
          
          // Calculate statistics
          const totalOrders = data.orders.length;
          const pendingOrders = data.orders.filter(order => order.status === 'Pending').length;
          const totalSpent = data.orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
          
          setStats({
            totalOrders,
            pendingOrders,
            totalSpent
          });
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authUser]);

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
            width={35}
            height={35}
            src={item.image || '/default-product.png'}
            alt={item.name}
            style={{ 
              objectFit: 'cover',
              borderRadius: '4px',
              marginRight: '8px'
            }}
            placeholder={
              <div style={{ 
                width: 35, 
                height: 35, 
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
                fontSize: '11px', 
                fontWeight: '500',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100px'
              }}>
                {item.name}
              </div>
            </Tooltip>
            <div style={{ fontSize: '10px', color: '#666' }}>
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
      render: (id) => <Tag color="geekblue" style={{ fontFamily: 'monospace' }}>#{id.slice(-8)}</Tag>,
      width: 120
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      width: 120
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)} style={{ border: 'none', fontWeight: '600' }}>
          {status}
        </Tag>
      ),
      width: 120
    },
    {
      title: 'Items',
      key: 'items',
      width: 200,
      render: (_, record) => renderOrderItems(record.items || [])
    },
    {
      title: 'Total',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => <Text strong style={{ color: '#e63946' }}>Rs. {amount || 0}</Text>,
      width: 100,
      sorter: (a, b) => (a.totalAmount || 0) - (b.totalAmount || 0)
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (address) => (
        <Tooltip title={address}>
          <Text style={{ fontSize: '12px' }}>
            {address?.length > 30 ? `${address.substring(0, 30)}...` : address}
          </Text>
        </Tooltip>
      ),
      width: 150
    }
  ];

  if (!authUser) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1d3557 0%, #457b9d 100%)'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <Title level={2} style={{ color: 'white' }}>Please login to view dashboard</Title>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #1d3557 0%, #457b9d 100%)',
      minHeight: '100vh',
      padding: '40px 0'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title level={1} style={{ 
            color: 'white',
            margin: 0,
            fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 3rem)'
          }}>
            User Dashboard
          </Title>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px' }}>
            Welcome back, {authUser?.name}
          </Text>
        </div>

        {/* Profile Card */}
        <Row justify="center" style={{ marginBottom: '40px' }}>
          <Col xs={24} md={16} lg={12}>
            <Card
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
              }}
              bodyStyle={{ padding: '32px' }}
            >
              <div style={{ textAlign: 'center' }}>
                <Avatar 
                  size={80} 
                  icon={<UserOutlined />}
                  src={authUser?.profileImage}
                  style={{ 
                    backgroundColor: '#e63946',
                    marginBottom: '16px'
                  }}
                />
                <Title level={3} style={{ color: '#1d3557', marginBottom: '8px' }}>
                  {authUser?.name || "User"}
                </Title>
                <Text type="secondary" style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                  {authUser?.email}
                </Text>
                <Tag 
                  color="#1d3557" 
                  style={{ 
                    fontSize: '14px', 
                    padding: '6px 12px',
                    border: 'none',
                    color: 'white',
                    fontWeight: '600'
                  }}
                >
                  {authUser?.role?.toUpperCase() || "USER"}
                </Tag>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Statistics Cards */}
        <Row gutter={[24, 24]} style={{ marginBottom: '40px' }}>
          <Col xs={24} sm={8}>
            <Card
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                textAlign: 'center'
              }}
              bodyStyle={{ padding: '24px' }}
            >
              <Statistic
                title="Total Orders"
                value={stats.totalOrders}
                prefix={<ShoppingOutlined />}
                valueStyle={{ color: '#e63946' }}
              />
              <Text type="secondary">All your orders</Text>
            </Card>
          </Col>

          <Col xs={24} sm={8}>
            <Card
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                textAlign: 'center'
              }}
              bodyStyle={{ padding: '24px' }}
            >
              <Statistic
                title="Pending Orders"
                value={stats.pendingOrders}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: '#e63946' }}
              />
              <Text type="secondary">Awaiting delivery</Text>
            </Card>
          </Col>

          <Col xs={24} sm={8}>
            <Card
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                textAlign: 'center'
              }}
              bodyStyle={{ padding: '24px' }}
            >
              <Statistic
                title="Total Spent"
                value={stats.totalSpent}
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#e63946' }}
                formatter={value => `Rs. ${value}`}
              />
              <Text type="secondary">Lifetime value</Text>
            </Card>
          </Col>
        </Row>

        {/* Orders Section */}
        <Card
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
          }}
          bodyStyle={{ padding: '0' }}
        >
          <div style={{ padding: '24px', borderBottom: '1px solid #f0f0f0' }}>
            <Title level={3} style={{ color: '#1d3557', margin: 0 }}>
              Your Orders
            </Title>
            <Text type="secondary">Manage and track your orders</Text>
          </div>

          <div style={{ padding: '24px' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Spin size="large" />
              </div>
            ) : orders.length === 0 ? (
              <Empty 
                description="No orders placed yet"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ) : (
              <Table
                dataSource={orders.map(order => ({ ...order, key: order._id }))}
                columns={columns}
                pagination={{ 
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => 
                    `${range[0]}-${range[1]} of ${total} orders`
                }}
                scroll={{ x: 1000 }}
                size="middle"
              />
            )}
          </div>
        </Card>
      </div>

      {/* Responsive CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          .container {
            padding: 0 16px;
          }
          
          .ant-card-body {
            padding: 20px !important;
          }
        }
        
        @media (max-width: 576px) {
          .container {
            padding: 0 12px;
          }
          
          .ant-statistic-title {
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;