import React from 'react';

const Header = () => {
  return (
    <div className="height-100">
      <section className="first-section py-5 mb-4">
        <div className="container">
          <div className="text-center align-items-center pt-3 pb-3 text-white hero-heading">
            <h1>Search Your Image</h1>
            <p>
              Over 1 million + high quality stock images shared by our talented
              community.
            </p>
          </div>
          <div className="form-inline mt-1 d-flex justify-content-center">
            <div className="input-group col-md-6 mb-2 w-50">
              <input
                type="text"
                className="form-control w-50 py-3 mx-2"
                id="search"
                placeholder="search for images...."
                required
              />
            </div>
            <button
              type="button"
              id="search-btn"
              className="btn btn-primary mb-2 me-3"
            >
              Search
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
