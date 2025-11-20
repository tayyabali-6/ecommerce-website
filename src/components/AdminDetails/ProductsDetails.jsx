import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/Auth";
import { message, Popconfirm } from "antd";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { getAllProduct, getAllProductFunction } = useAuthContext();
  const [messageApi, contextHolder] = message.useMessage();

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        messageApi.success("Product deleted successfully");
        // Refresh products list
        getAllProductFunction();
      } else {
        messageApi.error(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      messageApi.error("Failed to delete product");
    }
  };

  const getStatusBadge = (inStock) => {
    return inStock ? (
      <span className="badge bg-success">In Stock</span>
    ) : (
      <span className="badge bg-danger">Out of Stock</span>
    );
  };

  return (
    <div className="container mt-4">
      {contextHolder}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 text-white fw-bold">All Products ({getAllProduct.length})</h1>
        <Link to="/dashboard/admin/addProducts">
          <button className="btn btn-primary">
            <i className="fas fa-plus me-2"></i>
            Add Product
          </button>
        </Link>
      </div>

      <div className="table-responsive mb-4">
        <table className="table table-dark table-hover text-center align-middle">
          <thead className="table-secondary">
            <tr>
              <th>S.No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getAllProduct.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-muted py-4">
                  No products found. <Link to="/dashboard/admin/addProducts">Add your first product</Link>
                </td>
              </tr>
            ) : (
              getAllProduct.map((item, i) => {
                const { _id, name, title, price, category, image, productImageUrl, inStock, createdAt } = item;
                const productName = name || title;
                const productImage = image || productImageUrl;
                const productDate = createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A';
                
                return (
                  <tr key={_id}>
                    <td className="fw-bold">{i + 1}</td>
                    <td>
                      <img
                        src={
                          typeof productImage === "string" && productImage !== ""
                            ? productImage
                            : "https://dummyimage.com/50x50/cccccc/000000&text=No+Img"
                        }
                        alt="product"
                        width="50"
                        height="50"
                        style={{ 
                          objectFit: 'cover', 
                          borderRadius: '8px',
                          border: '2px solid #444'
                        }}
                      />
                    </td>
                    <td className="text-capitalize fw-semibold">
                      {productName?.length > 30 
                        ? productName.substring(0, 30) + '...' 
                        : productName
                      }
                    </td>
                    <td className="fw-bold text-success">Rs {price}</td>
                    <td>
                      <span className="badge bg-info text-dark text-capitalize">
                        {category || 'Uncategorized'}
                      </span>
                    </td>
                    <td>
                      {getStatusBadge(inStock)}
                    </td>
                    <td className="text-muted small">{productDate}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => navigate(`/dashboard/admin/updateProducts/${_id}`)}
                          title="Edit Product"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <Popconfirm
                          title="Delete Product"
                          description="Are you sure you want to delete this product?"
                          onConfirm={() => handleDelete(_id)}
                          okText="Yes"
                          cancelText="No"
                          okType="danger"
                        >
                          <button 
                            className="btn btn-danger btn-sm"
                            title="Delete Product"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </Popconfirm>
                      </div>
                    </td>
                  </tr>
                );
              })
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
          .btn-primary {
            background: linear-gradient(135deg, #00f2ff, #1d3557);
            border: none;
            border-radius: 8px;
          }
        `}
      </style>
    </div>
  );
};

export default ProductDetail;