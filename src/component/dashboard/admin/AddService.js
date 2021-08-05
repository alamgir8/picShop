import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Layout from '../../shared/Layout';

const AddService = () => {
  const [imageURL, setImageURL] = useState();
  const [category, setCategory] = useState([]);
  const { register, handleSubmit } = useForm();
  const catRef = useRef();

  const onSubmit = (data) => {
    const createTime = new Date().toLocaleString().split(',')[0];
    const serviceData = {
      title: data.name,
      category: category,
      description: data.info,
      price: data.price,
      image: imageURL,
      date: createTime,
    };
    fetch('http://localhost:5000/api/addService', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(serviceData),
    }).then((res) => {
      alert('data inserted');
    });
  };

  const handleImageUpload = (e) => {
    const imageDate = new FormData();
    imageDate.set('key', '12b535c0bab20335db20c56b41e1120a');
    imageDate.append('image', e.target.files[0]);
    axios.post('https://api.imgbb.com/1/upload', imageDate).then((res) => {
      const url = res.data.data.display_url;
      setImageURL(url);
    });
  };

  const handleCategory = () => {
    setCategory(catRef.current.value);
  };

  return (
    <Layout>
      <div className="add-service-section">
        <div className="px-3 mx-auto">
          <div className="row">
            <div className="col-md-3">
              <div className="sidebar-section">
                <div className="container">
                  <nav className="nav flex-column pt-5">
                    <Link to="/dashboard" className="nav-link text-white">
                      <span className="mx-2 h6">
                        <i className="bi bi-grid-3x3-gap"></i>
                      </span>{' '}
                      Dashboard
                    </Link>

                    <Link
                      to="/dashboard/addService"
                      className="nav-link text-white"
                    >
                      <span className="mx-2 h6">
                        <i className="bi bi-plus-square"></i>
                      </span>{' '}
                      Add Service
                    </Link>

                    <Link
                      to="/dashboard/orders"
                      className="nav-link text-white"
                    >
                      <span className="mx-2 h6">
                        <i className="bi bi-card-checklist"></i>
                      </span>{' '}
                      All Order
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="card p-4 my-3">
                <h5 className="py-3">Add Service</h5>
                <form className="bg-form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label h6">Photo</label>
                        <input
                          type="file"
                          name="file"
                          className="form-control"
                          onChange={handleImageUpload}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mt-4">
                      <label className="form-label h6 mx-3">Category</label>
                      <select
                        onChange={handleCategory}
                        ref={catRef}
                        name="status"
                      >
                        <option value="Animal">Animal</option>
                        <option value="Nature">Nature</option>
                        <option value="Forest">Forest</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label h6">Service Title</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Title"
                      {...register('name')}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label h6">Service Cost</label>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      placeholder="Cost"
                      {...register('price')}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label h6">Description</label>
                    <textarea
                      name="info"
                      className="form-control"
                      placeholder="Service Description"
                      {...register('info')}
                      required
                    />
                  </div>

                  <div className="my-3 text-right pt-3">
                    <button type="submit" className="btn btn-success">
                      ADD SERVICE
                    </button>
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

export default AddService;
