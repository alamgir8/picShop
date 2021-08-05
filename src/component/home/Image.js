import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import ImageCard from './ImageCard';

const Image = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');
  console.log(images);

  useEffect(() => {
    let unmounted = false;
    const getImages = async () => {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      if (!unmounted) {
        setImages(data);
        setIsLoading(false);
      }
    };
    getImages();

    return () => {
      unmounted = true;
    };
  }, []);
  return (
    <div className="bg-light my-5 py-5">
      <div className="container">
        {isLoading && (
          <span className="text-center display-4">
            <h2>
              Loading... <Spinner animation="border" variant="warning" />
            </h2>
          </span>
        )}
        <div className="row">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Image;
