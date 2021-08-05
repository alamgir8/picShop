import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import auth from '../../firebase';
import Layout from '../shared/Layout';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/login' } };

  const register = (e) => {
    e.preventDefault();
    if (!name) {
      return setError('Name is Required!');
    }
    if (!email) {
      setError('Email is Required!');
    }
    if (password !== confirmPassword) {
      return setError('Password not Matched!');
    }

    if (password.length < 7) {
      return setError('Password must have at least 8 character!');
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            setError('');
            history.replace(from);
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Layout>
      <div className="sign-up-section">
        <div className="container">
          <div className="card bg-light ms-auto my-5 p-4 mx-auto w-50">
            <form>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="py-2">
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control"
                    name="password"
                    type="password"
                    placeholder="Confirm-Password"
                    required
                  />
                </div>

                <div className="py-3 text-center">
                  <button
                    onClick={register}
                    type="submit"
                    className="btn btn-warning w-100"
                  >
                    Sign Up
                  </button>
                  <p className="text-center m-auto pt-4">
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
