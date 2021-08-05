import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/user';
import Layout from '../shared/Layout';
import AdminDashboard from './admin/AdminDashboard';
import UserDashboard from './user/UserDashboard';

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);
  useEffect(() => {
    let unmounted = false;
    const getAdmin = async () => {
      const res = await fetch('http://localhost:5000/api/admins');
      const data = await res.json();
      console.log(data);
      if (!unmounted) {
        const result = data.find((admin) => admin.email === user?.email);
        if (result) {
          setIsAdmin(true);
          setLoading(false);
        } else {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    };
    getAdmin();
    return () => {
      unmounted = true;
    };
  }, [user.email]);

  console.log(isAdmin);

  return (
    <Layout>
      <div>{isAdmin ? <AdminDashboard /> : <UserDashboard />}</div>
    </Layout>
  );
};

export default Dashboard;
