import React, { useState } from 'react';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Layout from '../shared/Layout';

const ImageInfo = () => {
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const getImage = async () => {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      let result = data.find((element) => element.id === id);
      setImage(result);
      setIsLoading(false);
      console.log(result);
    };

    return getImage();
  }, [id]);
  return (
    <Layout>
      <div className="image-info my-5">
        <div className="container">
          {isLoading ? (
            <span className="text-center display-4">
              <h2>
                Loading... <Spinner animation="border" variant="warning" />
              </h2>
            </span>
          ) : (
            <div className="row">
              <div className="col-md-7">
                <img
                  src={image.image}
                  alt={image.title}
                  className="img-fluid rounded"
                />
              </div>

              <div className="col-md-4 mt-3 mx-2">
                <ul className="list-unstyled">
                  <li className="my-2">
                    <h1 className="text-dark">{image.title}</h1>
                  </li>
                  <li className="my-2">
                    {' '}
                    <span className="h5">Category :</span> {image.category}
                  </li>
                  <li className="my-2">
                    {' '}
                    <span className="h5">Price :</span> ${image.price}
                  </li>
                  <li className="my-2">
                    {' '}
                    <span className="h5">Description :</span>{' '}
                    {image.description}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ImageInfo;
