import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) return messageApi.error('Please enter your email');

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      messageApi.success('If your email is registered, a reset link has been sent');
      setTimeout(() => navigate('/auth/login'), 2000);
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/invalid-email') {
        messageApi.error('Please enter a valid email address');
      } else if (error.code === 'auth/user-not-found') {
        messageApi.error('This email is not registered');
      } else {
        messageApi.error('Something went wrong, please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', fontFamily: 'Poppins, sans-serif', background: '#0a0f1f' }}>
      {contextHolder}
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div
          className="card p-5 w-100"
          style={{
            maxWidth: '450px',
            borderRadius: '1.5rem',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(25px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.15)',
            animation: 'fadeIn 1s ease forwards',
          }}
        >
          <h2
            className="text-center mb-4"
            style={{
              color: '#ffffff',
              textShadow: '0 0 15px #00f2ff',
              letterSpacing: '1px',
            }}
          >
            Forgot Password
          </h2>

          <form onSubmit={handleReset}>
            <div className="mb-4">
              <label className="form-label" style={{ color: '#fff' }}>
                Enter your registered email
              </label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@example.com"
                disabled={loading}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fff',
                }}
              />
            </div>
            <button
              type="submit"
              className="btn w-100"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #00f2ff, #1d3557)',
                border: 'none',
                borderRadius: '50px',
                boxShadow: '0 8px 25px rgba(0,242,255,0.6)',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '16px',
                transition: 'all 0.4s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <div className="text-center mt-4">
              <a href="/auth/login" style={{ color: '#00f2ff' }}>
                Back to Login
              </a>
            </div>
          </form>
        </div>
      </div>

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

export default ForgotPassword;
