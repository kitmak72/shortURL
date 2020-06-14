import React, { useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { GlobalContext } from './context/GlobalState';
import PrivateRoute from './components/common/PrivateRoute';
import Nav from './components/navbar/Nav';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import LoginForm from './components/forms/LoginForm';
import SignupForm from './components/forms/SignupForm';
import UrlStats from './components/statistics/UrlStats';
import './App.css';

function App() {
  const { loadUser } = useContext(GlobalContext);
  useEffect(() => {
    async function initialFetch() {
      await loadUser();
    }
    initialFetch();
  }, []);
  return (
    <>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={LoginForm} />
        <Route path="/signup" exact component={SignupForm} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/dashboard/stats/:urlCode" component={UrlStats} />
        <Route
          path="*"
          component={() => (
            <h2 style={{ textAlign: 'center' }}>404 PAGE NOT FOUND</h2>
          )}
        />
      </Switch>
    </>
  );
}

export default App;
