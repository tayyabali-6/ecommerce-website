import React, { useState, useContext } from 'react';
import { Button, Col, Form, Input, message, Row, Typography, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../context/Auth";
import { MailOutlined, LockOutlined, UserSwitchOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Login = () => {
  const [state, setState] = useState({ email: '', password: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleChange = (e) =>
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;

    if (!email || !password) return messageApi.error('Please fill all fields');

    setIsProcessing(true);
    try {
      // const response = await fetch('http://localhost:5000/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email,
      //     password
      //   }),
      // });

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });


      const data = await response.json();

      if (data.success) {
        login(data.user, data.token);
        messageApi.success("Login successful");

        if (data.user.role === 'admin') {
          navigate('/dashboard/admin/adminDashboard');
        } else {
          navigate('/dashboard/user/userDashboard');
        }
      } else {
        messageApi.error(data.message);
      }
    } catch (err) {
      console.error(err);
      messageApi.error('Login failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main style={{
      minHeight: '100vh',
      fontFamily: 'Poppins, sans-serif',
      background: 'linear-gradient(135deg, #1d3557 0%, #457b9d 100%)'
    }}>
      {contextHolder}

      {/* Mobile Header - Only show on mobile */}
      <div className="mobile-header">
        <Title
          level={2}
          style={{
            color: 'white',
            textAlign: 'center',
            margin: '0',
            padding: '20px 0 10px 0',
            fontSize: '24px'
          }}
        >
          Medialyx
        </Title>
        <Text style={{
          color: 'rgba(255,255,255,0.8)',
          textAlign: 'center',
          display: 'block',
          paddingBottom: '10px'
        }}>
          Welcome Back
        </Text>
      </div>

      <Row
        align="middle"
        justify="center"
        style={{
          minHeight: 'calc(100vh - 80px)',
          padding: '20px'
        }}
        gutter={0}
      >
        {/* Left Side - Branding */}
        <Col
          xl={12}
          lg={12}
          md={0}
          sm={0}
          xs={0}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div style={{ textAlign: 'center', color: 'white' }}>
            <Title
              level={1}
              style={{
                color: 'white',
                fontSize: '3.5rem',
                marginBottom: '20px',
                fontWeight: 700
              }}
            >
              Welcome Back
              <span style={{ color: '#e63946', display: 'block' }}>to Medialyx</span>
            </Title>
            <Text style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '18px',
              lineHeight: '1.6'
            }}>
              Sign in to your account and continue your shopping experience.
              Access your orders, wishlist, and exclusive member benefits.
            </Text>

            {/* Features List */}
            <div style={{ marginTop: '40px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', color: 'white' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#e63946',
                  borderRadius: '50%',
                  marginRight: '12px'
                }}></div>
                Track Your Orders
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', color: 'white' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#e63946',
                  borderRadius: '50%',
                  marginRight: '12px'
                }}></div>
                Manage Your Profile
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', color: 'white' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#e63946',
                  borderRadius: '50%',
                  marginRight: '12px'
                }}></div>
                Exclusive Member Deals
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', color: 'white' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#e63946',
                  borderRadius: '50%',
                  marginRight: '12px'
                }}></div>
                24/7 Customer Support
              </div>
            </div>
          </div>
        </Col>

        {/* Right Side - Login Form */}
        <Col
          xl={12}
          lg={12}
          md={24}
          sm={24}
          xs={24}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <Card
            className="login-card"
            style={{
              width: '100%',
              maxWidth: '450px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 20px 40px rgba(29, 53, 87, 0.3)',
            }}
            bodyStyle={{ padding: '40px' }}
          >
            {/* Desktop Title - Hidden on mobile */}
            <div className="desktop-title">
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #e63946 0%, #1d3557 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <UserSwitchOutlined style={{ fontSize: '24px', color: 'white' }} />
                </div>
                <Title
                  level={2}
                  style={{
                    color: '#1d3557',
                    marginBottom: '8px',
                    fontWeight: 700
                  }}
                >
                  Welcome Back
                </Title>
                <Text style={{ color: '#666', fontSize: '16px' }}>
                  Sign in to your account
                </Text>
              </div>
            </div>

            <Form layout="vertical" onSubmitCapture={handleSubmit}>
              <Row gutter={[0, 16]}>
                <Col span={24}>
                  <Form.Item
                    required
                    label={<span style={{ color: '#1d3557', fontWeight: '500' }}>Email</span>}
                    style={{ marginBottom: '16px' }}
                  >
                    <Input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      prefix={<MailOutlined style={{ color: '#e63946' }} />}
                      className="form-input"
                      placeholder="Enter your email"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    required
                    label={<span style={{ color: '#1d3557', fontWeight: '500' }}>Password</span>}
                    style={{ marginBottom: '16px' }}
                  >
                    <Input.Password
                      name="password"
                      onChange={handleChange}
                      prefix={<LockOutlined style={{ color: '#e63946' }} />}
                      className="form-input"
                      placeholder="Enter your password"
                    />
                  </Form.Item>
                </Col>

                <Col span={24} style={{ textAlign: 'right', marginBottom: '16px' }}>
                  <Link
                    to="/auth/forgot-password"
                    style={{
                      color: '#e63946',
                      fontWeight: '500',
                      textDecoration: 'none',
                      fontSize: '14px'
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Col>

                <Col span={24}>
                  <Button
                    type="primary"
                    block
                    size="large"
                    loading={isProcessing}
                    htmlType="submit"
                    className="submit-button"
                  >
                    {isProcessing ? 'Signing In...' : 'Sign In'}
                  </Button>
                </Col>
              </Row>

              <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #f0f0f0' }}>
                <Text style={{ color: '#666' }}>
                  Don't have an account?{' '}
                  <Link
                    to="/auth/register"
                    style={{
                      color: '#e63946',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}
                  >
                    Create Account
                  </Link>
                </Text>
              </div>

              {/* Demo Accounts Info (Optional) */}
              <div style={{
                marginTop: '24px',
                padding: '16px',
                background: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <Text style={{ color: '#666', fontSize: '12px', textAlign: 'center', display: 'block' }}>
                  <strong>Demo Accounts:</strong><br />
                  Admin: admin@example.com / password<br />
                  User: user@example.com / password
                </Text>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>

      {/* Mobile View Styling */}
      <style>
        {`
          /* Mobile Header - Only show on small screens */
          .mobile-header {
            display: none;
          }

          /* Form Input Styles */
          .form-input {
            background: white !important;
            border: 2px solid #e6f7ff !important;
            border-radius: 12px !important;
            color: #1d3557 !important;
            height: 48px !important;
            font-size: 16px !important;
          }

          .form-input:focus {
            border-color: #e63946 !important;
            box-shadow: 0 0 0 2px rgba(230, 57, 70, 0.2) !important;
          }

          /* Submit Button */
          .submit-button {
            background: linear-gradient(135deg, #e63946 0%, #1d3557 100%) !important;
            border: none !important;
            border-radius: 12px !important;
            box-shadow: 0 8px 25px rgba(230, 57, 70, 0.4) !important;
            color: white !important;
            height: 50px !important;
            font-size: 16px !important;
            font-weight: 600 !important;
            transition: all 0.3s ease !important;
            margin-top: 8px !important;
          }

          .submit-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 30px rgba(230, 57, 70, 0.6) !important;
          }

          /* Mobile Styles */
          @media (max-width: 768px) {
            /* Hide desktop elements on mobile */
            .ant-col-md-0 {
              display: none !important;
            }
            
            .desktop-title {
              display: none !important;
            }
            
            /* Show mobile header */
            .mobile-header {
              display: block !important;
            }
            
            /* Full screen card on mobile */
            .login-card {
              max-width: 100% !important;
              border-radius: 16px !important;
              margin-top: 10px !important;
            }
            
            .ant-card-body {
              padding: 24px 20px !important;
            }
            
            /* Tight spacing for mobile */
            .ant-form-item {
              margin-bottom: 16px !important;
            }
            
            .ant-row {
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
            
            /* Adjust main container */
            main {
              padding: 0 !important;
            }
            
            .ant-row[align="middle"] {
              min-height: calc(100vh - 80px) !important;
              align-items: flex-start !important;
              padding: 10px !important;
            }
            
            /* Compact inputs */
            .form-input {
              height: 46px !important;
              font-size: 16px !important;
            }
            
            .submit-button {
              height: 48px !important;
              font-size: 16px !important;
              margin-top: 10px !important;
            }
            
            /* Demo accounts smaller on mobile */
            .ant-typography {
              font-size: 11px !important;
            }
          }

          /* Small mobile devices */
          @media (max-width: 480px) {
            .ant-card-body {
              padding: 20px 16px !important;
            }
            
            .mobile-header {
              padding: 15px 0 5px 0 !important;
            }
            
            .mobile-header .ant-typography {
              font-size: 20px !important;
            }
            
            .ant-form-item {
              margin-bottom: 14px !important;
            }
            
            .form-input {
              height: 44px !important;
            }
            
            .submit-button {
              height: 46px !important;
            }
          }

          /* Tablet adjustments */
          @media (min-width: 769px) and (max-width: 1024px) {
            .login-card {
              max-width: 420px !important;
            }
          }
          
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          .login-card {
            animation: fadeIn 0.8s ease forwards;
          }
        `}
      </style>
    </main>
  );
};

export default Login;