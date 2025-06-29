import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/Auth";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { message, Popconfirm } from "antd";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { getAllProduct } = useAuthContext();

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "products", id));
      message.success("Product deleted successfully");
      window.location.reload(); // or call getAllProduct() if dynamic update
    } catch (error) {
      console.error(error);
      message.error("Failed to delete product");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h5 text-primary fw-bold">All Product</h1>
        <Link to="/dashboard/admin/addProducts">
          <button className="btn btn-outline-primary">Add Product</button>
        </Link>
      </div>

      <div className="table-responsive mb-4">
        <table className="table table-bordered table-hover text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>S.No.</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {getAllProduct.map((item, i) => {
              const { id, title, price, category, date, productImageUrl } = item;
              return (
                <tr key={id}>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      src={
                        typeof productImageUrl === "string" && productImageUrl !== ""
                          ? productImageUrl
                          : "https://dummyimage.com/50x50/cccccc/000000&text=No+Img"
                      }
                      alt="product"
                      width="50"
                      height="50"
                    />
                  </td>
                  <td className="text-capitalize">{title}</td>
                  <td className="text-capitalize">₹{price}</td>
                  <td className="text-capitalize">{category}</td>
                  <td className="text-capitalize">{date}</td>
                  <td
                    className="text-success"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/dashboard/admin/updateProducts/${id}`)}
                  >
                    Edit
                  </td>
                  <td>
                    <Popconfirm
                      title="Are you sure to delete this product?"
                      onConfirm={() => handleDelete(id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <span className="text-danger" style={{ cursor: "pointer" }}>
                        Delete
                      </span>
                    </Popconfirm>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetail;
