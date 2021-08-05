import React from 'react';
import { Link } from 'react-router-dom';

const ImageCard = ({ image }) => {
  return (
    <div className="col-md-6 col-lg-3 mt-4">
      <div className="card d-flex flex-column h-100 p-3">
        <div className="rounded">
          <img
            src={image.image}
            className="card-img-top rounded"
            width="120"
            height="130"
            alt="..."
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{image.title}</h5>

          <div className="d-flex justify-content-around text-sm h-5">
            <Link to={`/details/${image.id}`} className="btn btn-primary">
              View More
            </Link>
            <Link to={`/checkout/${image.id}`} className="btn btn-primary">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
