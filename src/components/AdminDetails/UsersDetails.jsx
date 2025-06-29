import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import { message, Popconfirm } from 'antd';

const UsersDetails = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "users"));
      const userList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Failed to fetch users");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "users", id));
      message.success("User deleted successfully");
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h5 text-danger fw-bold">All Users ({users.length})</h1>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.id}>
                <td>{i + 1}</td>
                <td className="text-capitalize">{user.name || "N/A"}</td>
                <td>{user.email || "N/A"}</td>
                <td className="text-capitalize">{user.role || "N/A"}</td>
                <td>
                  <Popconfirm
                    title="Are you sure to delete this user?"
                    onConfirm={() => handleDelete(user.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <span className="text-danger" style={{ cursor: "pointer" }}>
                      Delete
                    </span>
                  </Popconfirm>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-secondary">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersDetails;
