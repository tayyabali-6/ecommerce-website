import React from "react";
import { Link } from "react-router-dom";

const FeaturedSection = () => {
  return (
    <div className="container py-5">
      {/* Section Heading */}
      <div className="d-flex align-items-center mb-4">
        <div className="bg-danger me-2" style={{ width: "4px", height: "24px" }}></div>
        <h5 className="text-danger fw-bold m-0">Featured</h5>
      </div>

      <div className="row g-3">
        {/* Left Big Banner */}
        <div className="col-lg-6">
          <div className="position-relative rounded overflow-hidden bg-dark">
            <img
              src="/images/ps5.jpg"
              alt="PS5"
              className="img-fluid w-100"
              style={{ height: "100%", objectFit: "cover", opacity: 0.9 }}
            />
            <div className="position-absolute bottom-0 start-0 p-3 text-white">
              <h5 className="fw-bold">PlayStation 5</h5>
              <p className="mb-2">Black and White version of the PS5 coming out on sale.</p>
              <Link to="#" className="text-white text-decoration-underline fw-semibold">Shop Now</Link>
            </div>
          </div>
        </div>

        {/* Right Banners */}
        <div className="col-lg-6">
          <div className="row g-3">
            <div className="col-12">
              <div className="position-relative rounded overflow-hidden bg-dark">
                <img
                  src="/images/women.jpg"
                  alt="Women Collection"
                  className="img-fluid w-100"
                  style={{ height: "100%", objectFit: "cover", opacity: 0.9 }}
                />
                <div className="position-absolute bottom-0 start-0 p-3 text-white">
                  <h5 className="fw-bold">Women’s Collections</h5>
                  <p className="mb-2">Featured woman collections that give you another vibe.</p>
                  <Link to="#" className="text-white text-decoration-underline fw-semibold">Shop Now</Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="position-relative rounded overflow-hidden bg-dark">
                <img
                  src="/images/speaker.jpg"
                  alt="Speakers"
                  className="img-fluid w-100"
                  style={{ height: "100%", objectFit: "cover", opacity: 0.9 }}
                />
                <div className="position-absolute bottom-0 start-0 p-3 text-white">
                  <h6 className="fw-bold">Speakers</h6>
                  <p className="mb-1">Amazon wireless speakers</p>
                  <Link to="#" className="text-white text-decoration-underline fw-semibold">Shop Now</Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="position-relative rounded overflow-hidden bg-dark">
                <img
                  src="/images/perfume.jpg"
                  alt="Perfume"
                  className="img-fluid w-100"
                  style={{ height: "100%", objectFit: "cover", opacity: 0.9 }}
                />
                <div className="position-absolute bottom-0 start-0 p-3 text-white">
                  <h6 className="fw-bold">Perfume</h6>
                  <p className="mb-1">GUCCI INTENSE OUD EDP</p>
                  <Link to="#" className="text-white text-decoration-underline fw-semibold">Shop Now</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
