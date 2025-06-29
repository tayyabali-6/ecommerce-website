// ✅ ResetPassword.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { message } from 'antd';

const ResetPassword = () => {
    const { oobCode } = useParams();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        if (!password || !confirm) return messageApi.error('Please fill all fields');
        if (password !== confirm) return messageApi.error('Passwords do not match');
        if (password.length < 6) return messageApi.error('Password must be at least 6 characters');

        setLoading(true);
        try {
            await confirmPasswordReset(auth, oobCode, password);
            messageApi.success('Password has been reset successfully!');
            navigate('/auth/login');
        } catch (error) {
            console.error(error);
            messageApi.error('Invalid or expired reset link');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth">
            {contextHolder}
            <div className="container p-4">
                <div className="card p-4">
                    <h1 className="text-center mb-4">Reset Your Password</h1>
                    <form onSubmit={handleReset}>
                        <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                placeholder="Confirm new password"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default ResetPassword;
