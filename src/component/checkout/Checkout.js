import React, { useState } from 'react';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectUser } from '../../redux/user';
import Layout from '../shared/Layout';

const Checkout = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const user = useSelector(selectUser);
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

  const handleOrder = (e) => {
    e.preventDefault();
    const orderTime = new Date().toLocaleString().split(',')[0];
    const orderDetails = {
      name: name,
      email: email,
      address: address,
      phone: phone,
      status: 'Pending',
      date: orderTime,
    };
    fetch('http://localhost:5000/api/addOrder', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(orderDetails),
    }).then((data) => {
      alert('Order Success!');
    });
  };

  return (
    <Layout>
      <div className="checkout my-5">
        <div className="container">
          {isLoading && (
            <span className="text-center display-4">
              <h2>
                Loading... <Spinner animation="border" variant="warning" />
              </h2>
            </span>
          )}
          <div className="row">
            <div className="col-md-6">
              <div className="rounded my-2 p-3">
                <img
                  src={image.image}
                  alt={image.title}
                  className="img-fluid rounded"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="card bg-light ms-auto my-2 p-3 mx-auto w-100">
                <form onSubmit={handleOrder}>
                  <div className="p-4">
                    <div className="py-2">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="py-2">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        name="email"
                        type="text"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="py-2">
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control"
                        name="phone"
                        type="text"
                        placeholder="Phone Number"
                        required
                      />
                    </div>
                    <div className="py-2">
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control"
                        name="address"
                        type="address"
                        placeholder="Your Address"
                        required
                      />
                    </div>

                    <div className="py-3 text-center">
                      <button type="submit" className="btn btn-warning w-100">
                        Checkout
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
