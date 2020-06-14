import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

function PrivateRoute({ component: Component, ...rest }) {
  const { isLoading, isAuth } = useContext(GlobalContext);
  return (
    <Route
      {...rest}
      render={props => {
        if (isLoading) {
          return <h2 style={{ textAlign: 'center' }}>Loading</h2>;
        } else if (isAuth) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}

export default PrivateRoute;
