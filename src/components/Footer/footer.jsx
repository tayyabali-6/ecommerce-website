import React from "react";
import { Link } from "react-router-dom";
import { FacebookFilled, InstagramFilled, TwitterSquareFilled } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row">

          {/* MyShop Info */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">🛒 MyShop</h5>
            <p>Quality products at unbeatable prices. Shop with us and enjoy seamless online shopping experience.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link className="text-light text-decoration-none" to="/">Home</Link></li>
              <li><Link className="text-light text-decoration-none" to="/allProducts">All Products</Link></li>
              <li><Link className="text-light text-decoration-none" to="/cart">Cart</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Contact</h5>
            <p className="mb-1">Email: support@myshop.com</p>
            <p>Phone: +92 300 1234567</p>
          </div>
        </div>

        <hr className="border-secondary" />
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
      </div>

      <style>
        {`
          footer a:hover {
            color: #f8d90f !important;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
