import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../shared/Layout';

const Admin = () => {
  return (
    <div className="mx-2 overflow-hidden">
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

                <Link to="/dashboard/orders" className="nav-link text-white">
                  <span className="mx-2 h6">
                    <i className="bi bi-card-checklist"></i>
                  </span>{' '}
                  All Order
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
