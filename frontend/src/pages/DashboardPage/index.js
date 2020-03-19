import React                      from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';

const DashboardNav = () => {
  return (
    <ul>
      <li><NavLink to={'/dashboard/link1'}>Link number #1</NavLink></li>
      <li><NavLink to={'/dashboard/link2'}>Link number #2</NavLink></li>
      <li><NavLink to={'/dashboard/link3'}>Link number #3</NavLink></li>
    </ul>
  );
};

const DashboardPage = () => {
  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

export default DashboardPage;