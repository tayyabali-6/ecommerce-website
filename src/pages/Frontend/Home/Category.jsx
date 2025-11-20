import React, { useRef } from "react";
import {
    LeftOutlined,
    RightOutlined,
    CameraOutlined,
    LaptopOutlined,
    MobileOutlined,
    BookOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const categories = [
    { icon: <CameraOutlined />, name: "Camera", path: "/cameraProducts" },
    { icon: <LaptopOutlined />, name: "Laptop", path: "/laptopProducts" },
    { icon: <MobileOutlined />, name: "Mobile", path: "/mobileProducts" },
    { icon: <BookOutlined />, name: "Books", path: "/booksProducts" },
    { icon: <HomeOutlined />, name: "Home", path: "/" },
    { icon: <CameraOutlined />, name: "Fashion", path: "/fashionProducts" },
    { icon: <LaptopOutlined />, name: "Tech", path: "/techProducts" },
];

const Category = () => {
    const navigate = useNavigate()
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const container = scrollRef.current;
        const scrollAmount = 160;

        if (container) {
            const scrollBy = direction === "left" ? -scrollAmount : scrollAmount;
            container.scrollBy({ left: scrollBy, behavior: "smooth" });
        }
    };

    return (
        <div className="container py-4">
            {/* Header */}
            <div className="d-flex align-items-center mb-4">
                <div className="bg-danger" style={{ width: "4px", height: "24px", marginRight: "10px" }}></div>
                <h4 className="text-danger m-0">Categories</h4>
            </div>

            {/* Scrollable Section with Arrows */}
            <div className="d-flex align-items-center">
                {/* Left Arrow */}
                <button className="btn btn-light me-2 rounded-circle" onClick={() => scroll("left")}>
                    <LeftOutlined />
                </button>

                {/* Scrollable Cards */}
                <div className="category-scroll-container" ref={scrollRef}>
                    {categories.map((item, index) => (
                        <Card
                            key={index}
                            className="category-card"
                            onClick={() => navigate(item.path)}
                            styles={{
                                body: {
                                    padding: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "100%",
                                }
                            }}
                        >
                            <div className="icon">{item.icon}</div>
                            <div className="label">{item.name}</div>
                        </Card>
                    ))}
                </div>

                {/* Right Arrow */}
                <button className="btn btn-light ms-2 rounded-circle" onClick={() => scroll("right")}>
                    <RightOutlined />
                </button>
            </div>
        </div>
    );
};

export default Category;