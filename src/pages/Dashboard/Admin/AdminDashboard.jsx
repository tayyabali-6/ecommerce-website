import { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/Auth";
import OrderDetails from "../../../components/AdminDetails/OrderDetails";
import ProductsDetails from "../../../components/AdminDetails/ProductsDetails";
import UsersDetails from "../../../components/AdminDetails/UsersDetails";
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Tabs, 
  Tag, 
  Statistic, 
  Spin, 
  Alert,
  Avatar,
  Divider,
  Grid
} from "antd";
import { 
  ShoppingOutlined, 
  UserOutlined, 
  AppstoreOutlined, 
  DashboardOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { useBreakpoint } = Grid;

const AdminDashboard = () => {
  const { user: authUser } = useAuthContext();
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const screens = useBreakpoint();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total products count
        const productsResponse = await fetch('http://localhost:5000/api/products');
        const productsData = await productsResponse.json();
        if (productsData.success) {
          setTotalProducts(productsData.products.length);
        }

        // Fetch total orders count
        const ordersResponse = await fetch('http://localhost:5000/api/orders');
        const ordersData = await ordersResponse.json();
        if (ordersData.success) {
          setTotalOrders(ordersData.orders.length);
        }

        // Fetch total users count
        const usersResponse = await fetch('http://localhost:5000/api/users');
        const usersData = await usersResponse.json();
        if (usersData.success) {
          setTotalUsers(usersData.users.length);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Responsive font sizes and spacing
  const getResponsiveTitleLevel = () => {
    if (screens.xxl) return 1;
    if (screens.xl) return 1;
    if (screens.lg) return 2;
    if (screens.md) return 2;
    return 3;
  };

  const getCardPadding = () => {
    if (screens.xl) return '32px';
    if (screens.lg) return '28px';
    if (screens.md) return '24px';
    return '20px';
  };

  const getContainerPadding = () => {
    if (screens.xxl) return '40px 60px';
    if (screens.xl) return '40px 50px';
    if (screens.lg) return '40px';
    if (screens.md) return '30px 20px';
    return '20px 16px';
  };

  const getAvatarSize = () => {
    if (screens.xl) return 80;
    if (screens.lg) return 70;
    if (screens.md) return 60;
    return 50;
  };

  const getTabSize = () => {
    if (screens.md) return 'large';
    return 'default';
  };

  // Agar user admin nahi hai to access deny karo
  if (authUser && authUser.role !== 'admin') {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1d3557 0%, #457b9d 100%)',
        padding: '20px'
      }}>
        <Alert
          message="Access Denied"
          description="You don't have permission to access the admin dashboard."
          type="error"
          showIcon
          style={{
            maxWidth: '500px',
            width: '100%'
          }}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1d3557 0%, #457b9d 100%)'
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #1d3557 0%, #457b9d 100%)',
      minHeight: '100vh',
      padding: getContainerPadding()
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: screens.md ? '40px' : '30px' 
      }}>
        <Title 
          level={getResponsiveTitleLevel()} 
          style={{ 
            color: 'white',
            margin: 0,
            fontWeight: 700,
            fontSize: screens.xxl ? '3rem' : screens.xl ? '2.5rem' : screens.lg ? '2rem' : '1.75rem'
          }}
        >
          <DashboardOutlined style={{ 
            marginRight: screens.md ? '16px' : '12px',
            fontSize: screens.md ? 'inherit' : '20px'
          }} />
          Admin Dashboard
        </Title>
        <Text style={{ 
          color: 'rgba(255,255,255,0.8)', 
          fontSize: screens.md ? '18px' : '16px',
          display: 'block',
          marginTop: screens.md ? '8px' : '4px'
        }}>
          Manage your e-commerce platform
        </Text>
      </div>

      {/* Admin Profile Card */}
      <Row justify="center" style={{ marginBottom: screens.md ? '40px' : '30px' }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Card
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
            }}
            bodyStyle={{ padding: getCardPadding() }}
          >
            <div style={{ textAlign: 'center' }}>
              <Avatar 
                size={getAvatarSize()} 
                icon={<UserOutlined />}
                style={{ 
                  backgroundColor: '#e63946',
                  marginBottom: screens.md ? '16px' : '12px'
                }}
              />
              <Title level={screens.md ? 3 : 4} style={{ 
                color: '#1d3557', 
                marginBottom: screens.md ? '8px' : '6px',
                fontSize: screens.md ? '24px' : '20px'
              }}>
                {authUser?.name || "Admin User"}
              </Title>
              <Text type="secondary" style={{ 
                fontSize: screens.md ? '16px' : '14px', 
                display: 'block', 
                marginBottom: screens.md ? '8px' : '6px' 
              }}>
                {authUser?.email || "admin@example.com"}
              </Text>
              <Tag 
                icon={<SafetyCertificateOutlined />}
                color="red" 
                style={{ 
                  fontSize: screens.md ? '14px' : '12px', 
                  padding: screens.md ? '6px 12px' : '4px 8px',
                  border: 'none'
                }}
              >
                {authUser?.role?.toUpperCase() || "ADMIN"}
              </Tag>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Statistics Cards */}
      <Row gutter={[screens.md ? 24 : 16, screens.md ? 24 : 16]} style={{ marginBottom: screens.md ? '40px' : '30px' }}>
        <Col xs={24} sm={8} md={8} lg={8}>
          <Card
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              textAlign: 'center',
              height: '100%'
            }}
            bodyStyle={{ 
              padding: screens.md ? '24px' : '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <Statistic
              title={
                <Text style={{ 
                  fontSize: screens.md ? '16px' : '14px',
                  fontWeight: 500
                }}>
                  Total Products
                </Text>
              }
              value={totalProducts}
              prefix={<AppstoreOutlined />}
              valueStyle={{ 
                color: '#e63946',
                fontSize: screens.md ? '32px' : '28px'
              }}
              loading={loading}
            />
            <Text type="secondary" style={{ 
              fontSize: screens.md ? '14px' : '12px',
              marginTop: '8px'
            }}>
              Manage your product catalog
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={8} md={8} lg={8}>
          <Card
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              textAlign: 'center',
              height: '100%'
            }}
            bodyStyle={{ 
              padding: screens.md ? '24px' : '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <Statistic
              title={
                <Text style={{ 
                  fontSize: screens.md ? '16px' : '14px',
                  fontWeight: 500
                }}>
                  Total Orders
                </Text>
              }
              value={totalOrders}
              prefix={<ShoppingOutlined />}
              valueStyle={{ 
                color: '#e63946',
                fontSize: screens.md ? '32px' : '28px'
              }}
              loading={loading}
            />
            <Text type="secondary" style={{ 
              fontSize: screens.md ? '14px' : '12px',
              marginTop: '8px'
            }}>
              Track and manage orders
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={8} md={8} lg={8}>
          <Card
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              textAlign: 'center',
              height: '100%'
            }}
            bodyStyle={{ 
              padding: screens.md ? '24px' : '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <Statistic
              title={
                <Text style={{ 
                  fontSize: screens.md ? '16px' : '14px',
                  fontWeight: 500
                }}>
                  Total Users
                </Text>
              }
              value={totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ 
                color: '#e63946',
                fontSize: screens.md ? '32px' : '28px'
              }}
              loading={loading}
            />
            <Text type="secondary" style={{ 
              fontSize: screens.md ? '14px' : '12px',
              marginTop: '8px'
            }}>
              Manage user accounts
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Management Tabs */}
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
        <Tabs 
          defaultActiveKey="1" 
          size={getTabSize()}
          tabPosition={screens.md ? "top" : "top"}
          style={{ 
            padding: screens.md ? '0 24px' : '0 16px'
          }}
          items={[
            {
              key: "1",
              label: (
                <span style={{ 
                  fontSize: screens.md ? '14px' : '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <AppstoreOutlined />
                  {screens.sm ? "Products Management" : "Products"}
                </span>
              ),
              children: <ProductsDetails />
            },
            {
              key: "2",
              label: (
                <span style={{ 
                  fontSize: screens.md ? '14px' : '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <ShoppingOutlined />
                  {screens.sm ? "Orders Management" : "Orders"}
                </span>
              ),
              children: <OrderDetails />
            },
            {
              key: "3",
              label: (
                <span style={{ 
                  fontSize: screens.md ? '14px' : '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <UserOutlined />
                  {screens.sm ? "Users Management" : "Users"}
                </span>
              ),
              children: <UsersDetails />
            }
          ]}
        />
      </Card>
    </div>
  );
};

export default AdminDashboard;