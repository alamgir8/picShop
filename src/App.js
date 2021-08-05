import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './component/checkout/Checkout';
import AddService from './component/dashboard/admin/AddService';
import AllOrder from './component/dashboard/admin/AllOrder';
import Dashboard from './component/dashboard/Dashboard';
import Home from './component/home/Home';
import ImageInfo from './component/home/ImageInfo';
import Login from './component/Login/Login';
import PrivateRoute from './component/Login/PrivateRoute';
import Signup from './component/Login/Signup';
import auth from './firebase';
import { login, logout } from './redux/user';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
      } else {
        dispatch(logout);
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/details/:id">
          <ImageInfo />
        </Route>
        <Route path="/dashboard/addService">
          <AddService />
        </Route>
        <PrivateRoute path="/dashboard/orders">
          <AllOrder />
        </PrivateRoute>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/checkout/:id">
          <Checkout />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default App;
