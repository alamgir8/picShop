import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import icon from '../../img/camera.png';
import { logout, selectUser } from '../../redux/user';
import './Shared.css';

const Layout = ({ children }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <div className="layout">
      <div className="text-white sticky-top text-white">
        <Navbar collapseOnSelect expand="lg" bg="secondary" variant="white">
          <Container>
            <Navbar.Brand>
              <Link to="/">
                {' '}
                <img src={icon} alt="logo" width="40" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <ul className="navbar-nav ml-auto mb-lg-0 nav justify-content-end ">
                  <li className="nav-item  pt-1">
                    <Link
                      to="/home"
                      className="nav-link mx-3 h6 nav-header text-white"
                    >
                      {' '}
                      Home{' '}
                    </Link>
                  </li>
                  <li className="nav-item  pt-1">
                    <a
                      href="#about-us"
                      className="nav-link mx-3 h6 nav-header text-white"
                    >
                      About Us
                    </a>
                  </li>

                  <li className="nav-item  pt-1">
                    <Link
                      to="/dashboard"
                      className="nav-link mx-3 h6 nav-header text-white"
                    >
                      {' '}
                      Dashboard{' '}
                    </Link>
                  </li>
                  <li className="nav-item  pt-1">
                    <Link
                      to="/login"
                      className="nav-link mx-3 h6 nav-header text-white"
                    >
                      {' '}
                      {user?.displayName ? (
                        <span onClick={() => dispatch(logout())}>
                          {user?.displayName}
                        </span>
                      ) : (
                        <span>Login</span>
                      )}
                    </Link>
                  </li>
                </ul>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      {children}

      <div id="footer" className="bg-secondary sticky-bottom bottom-0 w-100">
        <footer className="text-lg-start">
          <div className="text-center p-3">
            © 2021 Copyright
            <a className="text-white" href="#picture">
              {' '}
              Picture Shop
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
