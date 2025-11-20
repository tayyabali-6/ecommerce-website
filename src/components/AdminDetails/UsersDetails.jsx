import React, { useEffect, useState } from 'react';
import { message, Popconfirm, Select, Tag } from 'antd';

const UsersDetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
      } else {
        messageApi.error(data.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      messageApi.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        messageApi.success("User deleted successfully");
        fetchUsers(); // Refresh list
      } else {
        messageApi.error(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Delete error:", error);
      messageApi.error("Failed to delete user");
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      });

      const data = await response.json();

      if (data.success) {
        messageApi.success(`User role updated to ${newRole}`);
        setUsers(prev => prev.map(user => 
          user._id === userId ? { ...user, role: newRole } : user
        ));
      } else {
        messageApi.error(data.message || "Failed to update user role");
      }
    } catch (error) {
      console.error("Role update error:", error);
      messageApi.error("Failed to update user role");
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      'admin': 'red',
      'user': 'blue',
      'moderator': 'orange'
    };
    return colors[role] || 'default';
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      {contextHolder}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 text-white fw-bold">
          All Users ({users.length})
        </h1>
        <div className="text-muted">
          Total: {users.length} | Admins: {users.filter(u => u.role === 'admin').length} | Users: {users.filter(u => u.role === 'user').length}
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover text-center align-middle">
          <thead className="table-secondary">
            <tr>
              <th>S.No.</th>
              <th>User Info</th>
              <th>Email</th>
              <th>Role</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-muted py-4">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, i) => (
                <tr key={user._id}>
                  <td className="fw-bold">{i + 1}</td>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={user.profileImage || 'https://cdn-icons-png.flaticon.com/128/2202/2202112.png'}
                        alt="Profile"
                        width="40"
                        height="40"
                        style={{ 
                          borderRadius: '50%', 
                          objectFit: 'cover',
                          border: '2px solid #444'
                        }}
                      />
                      <div className="text-start">
                        <div className="fw-semibold">{user.name || 'No Name'}</div>
                        <small className="text-muted">ID: {user._id?.slice(-8)}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-start">
                      <div>{user.email}</div>
                      {user.phone && (
                        <small className="text-muted">Phone: {user.phone}</small>
                      )}
                    </div>
                  </td>
                  <td>
                    <Select
                      value={user.role}
                      onChange={(value) => handleRoleChange(user._id, value)}
                      style={{ width: 100 }}
                      size="small"
                    >
                      <Select.Option value="user">User</Select.Option>
                      <Select.Option value="admin">Admin</Select.Option>
                      <Select.Option value="moderator">Moderator</Select.Option>
                    </Select>
                  </td>
                  <td>
                    <div className="text-muted small">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                  <td>
                    <Popconfirm
                      title="Delete User"
                      description="Are you sure you want to delete this user? This action cannot be undone."
                      onConfirm={() => handleDelete(user._id)}
                      okText="Yes"
                      cancelText="No"
                      okType="danger"
                    >
                      <button 
                        className="btn btn-danger btn-sm"
                        title="Delete User"
                        disabled={user.role === 'admin'} // Prevent deleting admin users
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </Popconfirm>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>
        {`
          .table-dark {
            background: rgba(255,255,255,0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
          }
          .table-dark th {
            border-color: rgba(255,255,255,0.1);
            background: rgba(255,255,255,0.1);
          }
          .table-dark td {
            border-color: rgba(255,255,255,0.05);
          }
          .btn-danger:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `}
      </style>
    </div>
  );
};

export default UsersDetails;