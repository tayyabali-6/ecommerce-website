import React, { useState, useContext } from 'react';
import { Button, Col, Form, Input, message, Row, Typography, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../context/Auth";
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const initialState = {
  fname: '',
  lname: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Register = () => {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleChange = (e) =>
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, email, password, confirmPassword } = state;

    if (fname.trim().length < 3) return messageApi.error('Please enter your first name');
    if (!validEmail.test(email)) return messageApi.error('Invalid email');
    if (password.length < 6) return messageApi.error('Password must be at least 6 characters');
    if (password !== confirmPassword) return messageApi.error('Passwords do not match');

    setIsProcessing(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          password,
          confirmPassword
        }),
      });

      const data = await response.json();

      if (data.success) {
        login(data.user, data.token);
        messageApi.success('Registration successful');
        navigate('/');
      } else {
        messageApi.error(data.message);
      }
    } catch (err) {
      console.error(err);
      messageApi.error('Registration failed. Please try again.');
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
      <Row
        align="middle"
        justify="center"
        style={{
          minHeight: '100vh',
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
              Welcome to
              <span style={{ color: '#e63946', display: 'block' }}>Our Store</span>
            </Title>
            <Text style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '18px',
              lineHeight: '1.6'
            }}>
              Join thousands of happy customers shopping with us.
              Create your account and start your shopping journey today!
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
                Fast & Secure Checkout
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
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', color: 'white' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#e63946',
                  borderRadius: '50%',
                  marginRight: '12px'
                }}></div>
                Exclusive Member Discounts
              </div>
            </div>
          </div>
        </Col>

        {/* Right Side - Form */}
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
            padding: '2rem',
          }}
        >
          <Card
            style={{
              width: '100%',
              maxWidth: '480px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 20px 40px rgba(29, 53, 87, 0.3)',
            }}
            bodyStyle={{ padding: '40px' }}
          >
            <Form layout="vertical" onSubmitCapture={handleSubmit}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <Title
                  level={2}
                  style={{
                    color: '#1d3557',
                    marginBottom: '8px',
                    fontWeight: 700
                  }}
                >
                  Create Account
                </Title>
                <Text style={{ color: '#666', fontSize: '16px' }}>
                  Join our community today
                </Text>
              </div>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    required
                    label={<span style={{ color: '#1d3557', fontWeight: '500' }}>First Name</span>}
                  >
                    <Input
                      name="fname"
                      onChange={handleChange}
                      prefix={<UserOutlined style={{ color: '#e63946' }} />}
                      style={{
                        background: 'white',
                        border: '2px solid #e6f7ff',
                        borderRadius: '8px',
                        color: '#1d3557',
                        height: '45px'
                      }}
                      placeholder="Enter first name"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    required
                    label={<span style={{ color: '#1d3557', fontWeight: '500' }}>Last Name</span>}
                  >
                    <Input
                      name="lname"
                      onChange={handleChange}
                      prefix={<UserOutlined style={{ color: '#e63946' }} />}
                      style={{
                        background: 'white',
                        border: '2px solid #e6f7ff',
                        borderRadius: '8px',
                        color: '#1d3557',
                        height: '45px'
                      }}
                      placeholder="Enter last name"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    required
                    label={<span style={{ color: '#1d3557', fontWeight: '500' }}>Email</span>}
                  >
                    <Input
                      name="email"
                      type="email"
                      onChange={handleChange}
                      prefix={<MailOutlined style={{ color: '#e63946' }} />}
                      style={{
                        background: 'white',
                        border: '2px solid #e6f7ff',
                        borderRadius: '8px',
                        color: '#1d3557',
                        height: '45px'
                      }}
                      placeholder="Enter your email"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    required
                    label={<span style={{ color: '#1d3557', fontWeight: '500' }}>Password</span>}
                  >
                    <Input.Password
                      name="password"
                      onChange={handleChange}
                      prefix={<LockOutlined style={{ color: '#e63946' }} />}
                      style={{
                        background: 'white',
                        border: '2px solid #e6f7ff',
                        borderRadius: '8px',
                        color: '#1d3557',
                        height: '45px'
                      }}
                      placeholder="Create a password"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    required
                    label={<span style={{ color: '#1d3557', fontWeight: '500' }}>Confirm Password</span>}
                  >
                    <Input.Password
                      name="confirmPassword"
                      onChange={handleChange}
                      prefix={<LockOutlined style={{ color: '#e63946' }} />}
                      style={{
                        background: 'white',
                        border: '2px solid #e6f7ff',
                        borderRadius: '8px',
                        color: '#1d3557',
                        height: '45px'
                      }}
                      placeholder="Confirm your password"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Button
                    type="primary"
                    block
                    size="large"
                    loading={isProcessing}
                    htmlType="submit"
                    style={{
                      background: 'linear-gradient(135deg, #e63946 0%, #1d3557 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 8px 25px rgba(230, 57, 70, 0.4)',
                      color: 'white',
                      height: '50px',
                      fontSize: '16px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      marginTop: '10px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(230, 57, 70, 0.6)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(230, 57, 70, 0.4)';
                    }}
                  >
                    {isProcessing ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </Col>
              </Row>

              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <Text style={{ color: '#666' }}>
                  Already have an account?{' '}
                  <Link
                    to="/auth/login"
                    style={{
                      color: '#e63946',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}
                  >
                    Sign In
                  </Link>
                </Text>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>

      {/* Mobile View - Single Column */}
      <style>
        {`
          @media (max-width: 768px) {
            .ant-col-md-0 {
              display: none !important;
            }
          }
          
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          .ant-card {
            animation: fadeIn 0.8s ease forwards;
          }
          
          .ant-input:focus, .ant-input-password:focus {
            border-color: #e63946 !important;
            box-shadow: 0 0 0 2px rgba(230, 57, 70, 0.2) !important;
          }
        `}
      </style>
    </main>
  );
};

export default Register;