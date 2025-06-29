import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
    return (
        <section className="vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="text-center p-4 bg-white shadow rounded" style={{ maxWidth: '500px' }}>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                    alt="Success"
                    className="mb-4"
                    style={{ width: '100px' }}
                />
                <h2 className="text-success fw-bold mb-3">Order Placed!</h2>
                <p className="text-muted mb-4">
                    Thank you for your purchase. Your order has been successfully placed.
                    We will contact you soon for delivery updates.
                </p>
                <Link to="/" className="btn btn-primary w-100">Go to Home</Link>
            </div>
        </section>
    );
};

export default ThankYou;
