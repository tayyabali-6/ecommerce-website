import React, { useState } from 'react';
import { Button, Col, Form, Input, message, Row, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

const { Title } = Typography;

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
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      const fullName = `${fname.trim()} ${lname.trim()}`;
      const userData = {
        name: fullName,
        email,
        role: 'user',
        uid: user.uid,
      };

      await setDoc(doc(firestore, 'users', user.uid), userData);

      messageApi.success('Registration successful');
      navigate('/');
    } catch (err) {
      console.error(err);
      messageApi.error(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      {contextHolder}
      <Row
        align="middle"
        justify="center"
        style={{
          minHeight: '100vh',
          background: '#0a0f1f',
        }}
        gutter={0}
      >
        {/* Left Side Image with dark overlay */}
        <Col
          xl={12}
          lg={12}
          md={0}
          sm={0}
          xs={0}
          style={{
            height: '100vh',
            position: 'relative',
            background: 'url(https://media.istockphoto.com/id/2065644439/photo/another-happy-customer.jpg?s=612x612&w=0&k=20&c=A-XoJrTrURiHvAumE5aesgblUitCQwvR_mnnNTokgu0=) center/cover no-repeat',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(2px)',
            }}
          />
        </Col>

        {/* Right Side Form */}
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
          <div
            className="card p-5 w-100"
            style={{
              maxWidth: '500px',
              borderRadius: '1.5rem',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(25px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.15)',
              animation: 'fadeIn 1s ease forwards',
            }}
          >
            <Form layout="vertical" onSubmitCapture={handleSubmit}>
              <Title
                level={2}
                className="text-center mb-4"
                style={{
                  color: '#ffffff',
                  textShadow: '0 0 15px #00f2ff',
                  letterSpacing: '1px',
                }}
              >
                Create Account
              </Title>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item required label={<span style={{ color: '#fff' }}>First Name</span>}>
                    <Input
                      name="fname"
                      onChange={handleChange}
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        color: '#fff',
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item required label={<span style={{ color: '#fff' }}>Last Name</span>}>
                    <Input
                      name="lname"
                      onChange={handleChange}
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        color: '#fff',
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item required label={<span style={{ color: '#fff' }}>Email</span>}>
                    <Input
                      name="email"
                      type="email"
                      onChange={handleChange}
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        color: '#fff',
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item required label={<span style={{ color: '#fff' }}>Password</span>}>
                    <Input.Password
                      name="password"
                      onChange={handleChange}
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        color: '#fff',
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item required label={<span style={{ color: '#fff' }}>Confirm Password</span>}>
                    <Input.Password
                      name="confirmPassword"
                      onChange={handleChange}
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        color: '#fff',
                      }}
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
                      background: 'linear-gradient(#00f2ff, #1d3557)',
                      border: 'none',
                      borderRadius: '50px',
                      boxShadow: '0 8px 25px rgba(0,242,255,0.6)',
                      color: '#fff',
                      transition: 'all 0.4s ease',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    {isProcessing ? 'Registering...' : 'Register'}
                  </Button>
                </Col>
              </Row>

              <p className="mt-4 text-center" style={{ color: '#ccc' }}>
                Already have an account?{' '}
                <Link to="/auth/login" style={{ color: '#00f2ff' }}>
                  Login
                </Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </main>
  );
};

export default Register;
