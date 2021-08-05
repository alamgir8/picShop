import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import auth from '../../firebase';
import { login } from '../../redux/user';
import Layout from '../shared/Layout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/login' } };

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
          })
        );

        setError('');
        history.replace(from);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Layout>
      <div className="login-section">
        <div className="container">
          <div className="card bg-light ms-auto my-5 p-4 w-50 mx-auto">
            <form>
              <div className="p-4">
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="py-2">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    name="email"
                    type="text"
                    placeholder="admin email=alamgirh@gmail.com"
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
                    placeholder="password=alamgirh@gmail.com"
                    required
                  />
                </div>

                <div className="py-3 text-center">
                  <button
                    onClick={signIn}
                    type="submit"
                    className="btn btn-success w-100"
                  >
                    Login
                  </button>
                  <p className="text-center m-auto pt-5">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
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

export default Login;
