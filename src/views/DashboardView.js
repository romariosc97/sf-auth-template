import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MyNavbar from '../components/MyNavbar';

export default function DashboardView() {
  useEffect(() => {
    axios.get(
      `http://localhost:8080/api/auth/session`, 
      {headers: {"Access-Control-Allow-Origin": "http://localhost:3000"}, "withCredentials": true}
    )
    .then(res => {
      console.log(res.data);
    })
  }, []);
  return (
    <section className="login">
      <MyNavbar></MyNavbar>
      <h5>Dashboard</h5>
    </section>
    
  )
}